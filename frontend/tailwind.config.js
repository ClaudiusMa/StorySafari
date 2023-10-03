/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Manrope', 'sans-serif'],
      },
      colors: {
        'dark': '#161723', // default color '#161723'
        "darkgrey": "#707479",
        "lightgrey": "#EAE9E3",
        "lightyellow": "#FFE485",
        "yellow": "#FDCF31",
      },
    },
  },
  plugins: [],
}
