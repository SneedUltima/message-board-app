/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      ubuntu: ["Ubuntu", "sans-serif"],
    },
    colors: {
      "background-grey": "rgb(24,25,25)",
      "background-lightgrey": "rgb(30,31,30)",
      "nomad-red": "rgb(254,71,67)",
      "nomad-red-bright": "rgb(24,71,67)",
      "white": "rgb(255,255,255)",
      "nomad-black": "rgb(25,25,24)",
    },
  },
  plugins: [],
};
