// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'media', // Use OS preference for dark mode
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
