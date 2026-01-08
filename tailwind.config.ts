import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(214 32% 91%)",
        background: "#f8fafc",
        foreground: "#020617",
        primary: {
          DEFAULT: "#0f172a",
          foreground: "#f8fafc"
        },
        muted: {
          DEFAULT: "#e2e8f0",
          foreground: "#475569"
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#fef2f2"
        }
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem"
      }
    }
  },
  plugins: []
};

export default config;


