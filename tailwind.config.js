/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#EFECE6",
        card: "#FAF9F5",
        brand: {
          DEFAULT: "#0B281E",
          dark: "#081C15",
        },
        lime: {
          DEFAULT: "#C4E725",
          dark: "#A9CC15",
        },
        ink: "#1C1C1C",
        border: {
          DEFAULT: "#D7D5CD",
          dark: "#1C1C1C",
        },
        muted: "#6B6B63",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      fontWeight: {
        400: "400",
        500: "500",
        600: "600",
        700: "700",
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
      },
      boxShadow: {
        none: "none",
      },
      letterSpacing: {
        widest2: "0.18em",
      },
    },
  },
  plugins: [],
};
