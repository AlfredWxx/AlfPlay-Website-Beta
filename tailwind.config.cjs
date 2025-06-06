/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'alf-primary': {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#2563eb',  // 主色调
          600: '#1d4ed8',  // 深一点
          700: '#1e40af',  // 更深
          800: '#1e3a8a',
          900: '#172554',
          1000:'#e8e4e4'
        },
        'alf-secondary': {
          500: '#fbbf24',  // 次要色调
        },
        'alfblue': '#7cc4c4',
        'alfgrey': '#ececec',
        // 您可以继续添加更多自定义颜色
      },
      fontFamily: {
        sans: ['Roboto Condensed', 'sans-serif'],  // 设置为默认字体
        roboto: ['Roboto Condensed', 'sans-serif'], // 保留这个作为备选
        bingar: ['Bingar', 'sans-serif'], // 添加 Bingar 字体
      },
    },
  },
  plugins: [],
};
