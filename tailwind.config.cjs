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
        },
        'alf-secondary': {
          500: '#fbbf24',  // 次要色调
        },
        'alfyellow': '#fad496',
        'alfblue': '#9bc3ff',
        'alfgreen': '#a5ddd0',
        // 您可以继续添加更多自定义颜色
      },
    },
  },
  plugins: [],
};
