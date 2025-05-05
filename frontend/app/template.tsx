// app/template.tsx (Client Component)
"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { PrivyProvider } from "@privy-io/react-auth";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Define your Privy app ID
const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "cma5aa6wc00htl50le5oxs19f";

console.log(PRIVY_APP_ID);

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ["email", "wallet"],
        appearance: {
          theme: "light",
          accentColor: "#4F46E5",
        },
      }}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </PrivyProvider>
  );
}