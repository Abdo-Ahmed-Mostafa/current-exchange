/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('./src/assets/home.jpg')",
      },
      backgroundColor: {
        "color-main": "rgb(255 255 255 / 8%)",
      },
    },
  },
  plugins: [require("daisyui")],
};
