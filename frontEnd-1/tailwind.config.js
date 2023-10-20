/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    safelist: ['animate-[fade-in_1s_ease-in-out]', 'animate-[fade-in-down_1s_ease-in-out]'],
    extend: {
      animation:{
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.5, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      }
    },
    safelist: ['animate-[fade-in_1s_ease-in-out]']
  },
  plugins: [],
  purge: {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ]

  },
}
