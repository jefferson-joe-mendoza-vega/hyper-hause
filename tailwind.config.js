/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1a5789',
        'brand-green': '#49ad75',
        'background-light': '#f6f7f8',
        'background-dark': '#121a20',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(26, 87, 137, 0.08)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
