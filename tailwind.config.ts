import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF7F2",
        cream: "#F2EDE3",
        ink: "#1F1B16",
        muted: "#8B8378",
        terracotta: "#A65A3D",
        sumi: "#2B2620",
        line: "#E8E2D7",
      },
      fontFamily: {
        serif: ['Fraunces', "ui-serif", "Georgia", "serif"],
        sans: ['Inter', "ui-sans-serif", "system-ui", "sans-serif"],
        jp: ['"Shippori Mincho"', '"Noto Serif JP"', "serif"],
      },
      letterSpacing: {
        wider: "0.08em",
        widest: "0.18em",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "yohaku-breathe": {
          "0%, 100%": { opacity: "0.85", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
      },
      animation: {
        "fade-in": "fade-in 350ms cubic-bezier(0.22, 0.61, 0.36, 1) both",
        "yohaku": "yohaku-breathe 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
