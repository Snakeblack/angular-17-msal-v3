/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      height: {
        "full-page": "100dvh",
      },
    },
  },
  plugins: [],
};
