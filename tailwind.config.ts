import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'bg-move': 'bgMove 10s infinite linear',
      },
      keyframes: {
        bgMove: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
      },
    },
  },
   plugins: [require('daisyui')],
  daisyui: {
    themes: ["light"], // Force light theme only
    darkTheme: "light", // Set default theme to light
  }
};

export default config;