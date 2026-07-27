import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        /** SPOT yellow — the only accent colour in the system. */
        spot: {
          DEFAULT: "#FFBF00",
          soft: "#FFD65C",
          deep: "#E0A800",
        },
        ink: {
          DEFAULT: "#000000",
          800: "#141414",
          700: "#1F1F1F",
          500: "#5C5C5C",
          400: "#8A8A8A",
          200: "#D9D9D9",
          100: "#EFEFEF",
          50: "#F7F6F4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        panel: "40px",
        card: "24px",
      },
      maxWidth: {
        content: "1440px",
        prose: "68ch",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.4s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
