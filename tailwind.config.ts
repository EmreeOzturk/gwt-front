import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        btnActive: 'forestgreen',
        purple: 'forestgreen', //'#675AFF',
        purpleDark: '#823BE9',
        vip1: '#1FCB4F',
        vip2: '#FFC01E',
        vip3: '#F46D22',
      },
      animation: {
        "spin-slow": "spin 16s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeIn3: "fadeIn3 3s ease-in-out",
        fadeUp: "fadeUp 0.5s ease-in-out",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeIn3: {
          "0%": { opacity: "0" },
          "80": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
      },
      //fontFamily: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
