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
        ground: "#F5F4F0",
        paper: {
          DEFAULT: "#F5F4F0",
          50: "#FAF9F6",
          100: "#F5F4F0",
          200: "#ECE9E1",
          300: "#DED9CD",
        },
        ink: {
          DEFAULT: "#111111",
          light: "#2A2A2A",
          muted: "#4E4C48",
          subtle: "#6B6862",
        },
        hairline: {
          DEFAULT: "#DFDCCE",
          dark: "#111111",
          light: "#EAE7DD",
        },
        // Single accent token for live/interactive state only (timer, active mode)
        accent: {
          DEFAULT: "#C84B2C",
          dark: "#A5371C",
          light: "#F7EEEA",
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
      },
      fontSize: {
        body: ["15px", "1.55"],
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
