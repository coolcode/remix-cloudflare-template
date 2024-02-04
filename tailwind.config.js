/** @type {import('tailwindcss').Config} */
// const plugin = require("tailwindcss/plugin")
const defaultTheme = require("tailwindcss/defaultTheme")
export default {
  content: ["./index.html", "./app/root.jsx", "./app/**/*.{js,jsx,ts,tsx}"],
  extend: {},
  theme: {
    extend: {
      fontFamily: {
        hand: [...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
      },
    },
  },
  plugins: []
}
