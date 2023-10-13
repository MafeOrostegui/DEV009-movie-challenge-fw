/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        'custom-purple': '#9747FF', 
        'custom-input-color':'#212226',
      },
      borderRadius: {
        'custom': '15px',
      },
      textColor: {
        'custom-purple': '#9747FF',
      },
      borderColor: {
        'custom-purple': '#9747FF',
        'custom-purple-hover': '#9747FF', 
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};

