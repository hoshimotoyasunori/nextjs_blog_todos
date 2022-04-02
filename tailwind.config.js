module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'hero-img': "url('../public/ground.jpg')",
      })
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}
