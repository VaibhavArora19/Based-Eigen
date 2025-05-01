"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 2;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Globe geometry
    const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);

    // Globe material
    const sphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;
          
          vec3 baseColor = vec3(0.8, 0.9, 1.0);
          vec3 gridColor = vec3(0.4, 0.6, 1.0);
          
          // Create grid pattern
          float gridX = mod(vUv.x * 20.0, 1.0);
          float gridY = mod(vUv.y * 20.0, 1.0);
          
          float grid = step(0.95, gridX) + step(0.95, gridY);
          vec3 color = mix(baseColor, gridColor, grid * 0.3);
          
          // Add glow at the edges
          color = mix(color, atmosphere, intensity);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: true,
    });

    // Create the globe
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(1.1, 64, 64);
    const glowMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }
      `,
      transparent: true,
      side: THREE.BackSide,
    });

    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    // Add points on the globe
    const pointsGroup = new THREE.Group();
    scene.add(pointsGroup);

    // Create 20 random points on the globe
    for (let i = 0; i < 20; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;

      const x = Math.sin(theta) * Math.cos(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(theta);

      const pointGeometry = new THREE.SphereGeometry(0.02, 16, 16);
      const pointMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.5 + Math.random() * 0.5, 0.5 + Math.random() * 0.5, 0.5 + Math.random() * 0.5),
      });

      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      point.position.set(x, y, z);
      pointsGroup.add(point);
    }

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      sphere.rotation.y += 0.002;
      glowMesh.rotation.y += 0.002;
      pointsGroup.rotation.y += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
