// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
  "./src/**/*.{js,ts,jsx,tsx}", // <== this line is key
],

  theme: {
     colors: {
      charcoal: '#434343',
      blackish: '#000000',
    },
     backgroundImage: {
      'charcoal-black': 'linear-gradient(to right, #434343, #000000)',
    },
    extend: {
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'fade-in-delay': 'fadeIn 1.5s ease-out',
        'fade-in-delay-2': 'fadeIn 2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
