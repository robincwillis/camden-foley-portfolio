/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'laptop': '1148px'
      },
      fontFamily: {
        sans: ['var(--font-halyard)'],
        display: ['var(--font-open-sans)']
      },
      colors: {
        gray: {
          500: "#A0A0A0",
          400: "#B4B4B4",
          300: "#DCDCDC",
          200: "#E6E6E6",
          100: "#F0F0F0",
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
