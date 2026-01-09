import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#135bec",
        "background-light": "#f6f6f8",
        "background-dark": "#101622",
        border: "hsl(214 32% 91%)",
        background: "#f6f6f8",
        foreground: "#020617",
        muted: {
          DEFAULT: "#e2e8f0",
          foreground: "#475569"
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#fef2f2"
        }
      },
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px"
      }
    }
  },
  plugins: []
};

export default config;


