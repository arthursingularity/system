/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        medium: ['SF Pro Medium'],
        light: ['SF Pro Light'],
        thin: ['SF Pro Thin'],
        semibold: ['SF Pro Semibold'],
        regular: ['SF Pro Regular'],
        bold: ['SF Pro Bold'],
      },
      colors: {
        'dark-bg': '#16171B',
        'stam-orange': '#FF6600',
        'stam-dark-orange': '#E05900',
        'verde-lucro': '#33DE9A',
        'stam-vermelho': '#f6465d',
        'azul-claro': '#38c0ff',
        'texos-red': '#f6465d',
        'texos-bg': '#111114',
        'texos-bg-2': '#1C1F23',
        'stam-bg-3': '#22262C',
        'stam-bg-4': '#3E4651',
        'stam-bg-5': '#1C2025',
        'stam-bg-6': '#7E8DA1',
        'stam-bg-7': '#343941',
        'tableHeadBg': '#3F4651',
        'tableBorder': '#5D6073',
        'estoque-text': '#8B95A5',
        'estoque-bg': '#1B1D22',
        'stam-border': '#4b5563',
        'stam-border-2': '#40424F',
        'dark-bg': '#16171B',
      },
    },
  },
  plugins: [],
}