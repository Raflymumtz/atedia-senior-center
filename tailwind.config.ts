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
        atedia: {
          warm: "#C4A77D",
          cream: "#F5F0E8",
          sage: "#8B9A7D",
          brown: "#6B5344",
          gold: "#B8860B",
        },
        "tagline-mint": "#d4e58f",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "sans-serif"],
        caveat: ["var(--font-caveat)", "Caveat", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
