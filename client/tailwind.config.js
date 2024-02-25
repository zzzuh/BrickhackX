/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'dropbox-green': '#9DBC98',
        'hover-green': '#89A684'
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}