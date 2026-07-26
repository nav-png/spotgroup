import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0d1b2a",
          soft: "#1b2b3d",
          muted: "#5a6b7d",
        },
        sand: "#f6f3ee",
        brass: {
          DEFAULT: "#b8863b",
          dark: "#966c2c",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
