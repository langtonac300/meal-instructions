import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#f5f4f0",
          50: "#faf9f6",
          100: "#f5f4f0",
          200: "#ece9e1",
          300: "#ded9cd",
        },
        ink: {
          DEFAULT: "#111111",
          light: "#2a2a2a",
          muted: "#5a5854",
          subtle: "#8e8a82",
        },
        hairline: {
          DEFAULT: "#dfdcce",
          dark: "#111111",
          light: "#eae7dd",
        },
        accent: {
          DEFAULT: "#c84b2c", // burnt terracotta flame
          dark: "#a5371c",
          light: "#f7eeea",
        },
        forest: {
          DEFAULT: "#384d3b",
          light: "#ebf0eb",
        },
        mustard: {
          DEFAULT: "#b08832",
          light: "#f8f4ea",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: [
          '"SF Mono"',
          "ui-monospace",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
        serif: ['"Editorial New"', '"Georgia"', "serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.04em",
        wider: "0.08em",
        widest: "0.14em",
        architectural: "0.18em",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.04)",
        card: "0 4px 12px rgba(0,0,0,0.04)",
        float: "0 12px 32px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
