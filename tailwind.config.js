/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E7C8C2', // Rosê suave
          light: '#EDD5D0',
          dark: '#DFB8B1',
        },
        secondary: {
          DEFAULT: '#653201', // Marrom bombom
          light: '#7A3D01',
          dark: '#4A2401',
        },
        neutral: {
          50: '#F6F1EC', // Bege areia claro
          100: '#F3ECE4',
          200: '#EDE4D9',
          300: '#E0D5C7',
          400: '#C5B5A3',
          500: '#A89583',
          600: '#8B7666',
          700: '#6E5B4D',
          800: '#4A3E33',
          900: '#2D251D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 1s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}