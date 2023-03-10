/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        
        moonRegular : ["moon-regular", "sans-serif"],
      },
      backgroundImage: theme => ({
        'main-pattern': "url('/images/dark-blue/card-bg.webp')",
      })
    },
  },
  plugins: [],
}
