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
      },
      colors: {
        'dark-bg': '#16171B',
        'stam-orange': '#FF6600',
        'stam-dark-orange': '#E05900',
        'kanban': '#612B2B',
        'verde-lucro': '#33DE9A',
        'stam-vermelho': '#f6465d',
        'azul-claro': '#38c0ff',
        'texos-red': '#f6465d',
        'texos-bg': '#111114',
        'texos-bg-2': '#1C1F23',
        'stam-bg-3': '#22262C',
        'stam-bg-4': '#3E4651',
        'estoque-text': '#8B95A5',
        'estoque-bg': '#1B1D22',
        'stam-border': '#5D6073',
        'dark-bg': '#16171B',
      },
    },
  },
  plugins: [],
}