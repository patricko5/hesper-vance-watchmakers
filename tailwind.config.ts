import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        offwhite: "var(--color-offwhite)",
        teal: "var(--color-teal)",
        softblue: "var(--color-softblue)",
        gray: "var(--color-gray)",
        graphite: "var(--color-ink)",
        surface: "var(--color-offwhite)",
        bone: "var(--color-offwhite)",
        muted: "var(--color-muted)",
        brass: "var(--color-brass)",
        steel: "var(--color-steel)",
        ruby: "var(--color-ruby)"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      transitionTimingFunction: {
        horology: "cubic-bezier(0.65, 0, 0.35, 1)"
      },
      boxShadow: {
        brass: "0 0 0 1px rgba(176, 141, 78, 0.32), 0 24px 80px rgba(0, 0, 0, 0.35)"
      },
      maxWidth: {
        atelier: "1440px"
      }
    }
  },
  plugins: []
};

export default config;
