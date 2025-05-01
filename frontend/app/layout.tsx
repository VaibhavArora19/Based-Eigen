import { Inter } from "next/font/google";
import "./globals.css";
import { metadata } from "./metadata"; // Import the metadata

const inter = Inter({ subsets: ["latin"] });

export { metadata }; // Export it here for Next.js to use

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}