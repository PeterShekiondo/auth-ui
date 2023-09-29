/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
        'main-background': {
          50: "#f6f6f600",
        },
        'black-haze': {
          50: '#ffffff',
          100: '#fefefe',
          200: '#fdfdfd',
          300: '#fbfbfb',
          400: '#f9f9f9',
          500: '#f6f6f6',
          600: '#dddddd',
          700: '#b9b9b9',
          800: '#949494',
          900: '#797979'
        },
        bunker: {
          '50': '#f4f4f4',
          '100': '#e8e8e9',
          '200': '#c6c6c7',
          '300': '#a3a4a5',
          '400': '#5e5f62',
          '500': '#191b1f',
          '600': '#17181c',
          '700': '#131417',
          '800': '#0f1013',
          '900': '#0c0d0f'
        },
        'athens-gray': {
          '50': '#fefeff',
          '100': '#fdfdfe',
          '200': '#fbfbfd',
          '300': '#f8f8fb',
          '400': '#f2f2f8',
          '500': '#ededf5',
          '600': '#d5d5dd',
          '700': '#b2b2b8',
          '800': '#8e8e93',
          '900': '#747478'
        },
        'gigas': {
          '50': '#f6f6fa',
          '100': '#ededf5',
          '200': '#d2d1e6',
          '300': '#b7b5d7',
          '400': '#827eba',
          '500': '#4c469c',
          '600': '#443f8c',
          '700': '#393575',
          '800': '#2e2a5e',
          '900': '#25224c'
        },
        'shuttle-gray': {
          50: '#f8f8f8', 
          100: '#f0f0f2', 
          200: '#dadade', 
          300: '#c3c4c9', 
          400: '#9798a1', 
          500: '#6a6c79', 
          600: '#5f616d', 
          700: '#50515b', 
          800: '#404149', 
          900: '#34353b'
      },
      primary: {
        '50': '#f5f9ff', 
        '100': '#ebf3fe', 
        '200': '#cee0fd', 
        '300': '#b1cdfb', 
        '400': '#76a8f9', 
        '500': '#3b82f6', 
        '600': '#3575dd', 
        '700': '#2c62b9', 
        '800': '#234e94', 
        '900': '#1d4079'
    }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
    },
  },
  plugins: [],
}
