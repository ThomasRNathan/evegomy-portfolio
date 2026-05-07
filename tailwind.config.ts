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
        serif: ['"Cormorant Garamond"', "ui-serif", "Georgia", "serif"],
        sans: ['Inter', "ui-sans-serif", "system-ui", "sans-serif"],
        jp: ['"Shippori Mincho"', '"Noto Serif JP"', "serif"],
      },
      letterSpacing: {
        wider: "0.08em",
        widest: "0.18em",
      },
    },
  },
  plugins: [],
} satisfies Config;
