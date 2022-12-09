const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-(red|green|blue|purple|orange|pink|gray|brand)-(20|30|40|50|60|70|80|90|100)/,
    },
    {
      pattern: /(border)-(x|y|l|b|t|r)-(0|2|4|8)/,
    },
  ],
  theme: {
    fontSize: {
      sm: ['12px', '18px'],
      base: ['14px', '21px'],
      lg: ['16px', '24px'],
      xl: ['18px', '27px'],
    },
    backgroundColor: {
      'white': '#FFFFFF',
      'gray-100': '#EDF2F7',
      'brand-50': '#413EEF',
      'purple-20': '#EFE2FE',
      'purple-80': '#574195',
      'pink-20': '#FEDDEB',
      'pink-80': '#710C36',
      'blue-20': '#CEF1FD',
      'blue-80': '#04546F',
      'orange-20': '#FEEBC8',
      'orange-80': '#91472C',
      'gray-90': '#171A22',
      'gray-80': '#2D3748',
      'gray-70': '#4A5568',
      'gray-60': '#718096',
      'gray-50': '#A0AEC0',
      'gray-40': '#CBD5E0',
      'gray-30': '#E2E8F0',
      'gray-20': '#EDF2F7',
    },
    colors: {
      'white': '#FFFFFF',
      'brand-50': '#413EEF',
      'purple-20': '#EFE2FE',
      'purple-80': '#574195',
      'pink-20': '#FEDDEB',
      'pink-80': '#710C36',
      'blue-20': '#CEF1FD',
      'blue-80': '#04546F',
      'orange-20': '#FEEBC8',
      'orange-80': '#91472C',
      'gray-90': '#171A22',
      'gray-80': '#2D3748',
      'gray-70': '#4A5568',
      'gray-60': '#718096',
      'gray-50': '#A0AEC0',
      'gray-40': '#CBD5E0',
      'gray-30': '#E2E8F0',
      'gray-20': '#EDF2F7',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
    }
  },
  plugins: [],
}