/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        // App-core brand palettes: cobalt blue, ink grays, muted status colors.
        // Anchored so app-core's brand 500 lands on the landing page's dominant -600 step.
        blue: {
          50: '#eaf0fb',
          100: '#d5e0f6',
          200: '#b5caed',
          300: '#89a6e1',
          400: '#567fd7',
          500: '#4771d1',
          600: '#2b59c3',
          700: '#1e47a6',
          800: '#163a8a',
          900: '#102a6a'
        },
        gray: {
          50: '#f6f7f9',
          100: '#eef1f4',
          200: '#e4e8ec',
          300: '#d3d9df',
          400: '#9ba5b0',
          500: '#6b7682',
          600: '#54616d',
          700: '#3d4a57',
          800: '#27333f',
          900: '#16202a'
        },
        green: {
          50: '#e9f7f0',
          100: '#d6f0e3',
          200: '#bfe6d4',
          300: '#97d8bc',
          400: '#47c293',
          500: '#27a577',
          600: '#0f8b5f',
          700: '#0c7350',
          800: '#0a5a40',
          900: '#08402f'
        },
        red: {
          50: '#fbecea',
          100: '#f6dbd8',
          200: '#efc9c4',
          300: '#e3a7a0',
          400: '#d67971',
          500: '#c7554d',
          600: '#b83a30',
          700: '#9c2f27',
          800: '#80261e',
          900: '#641e16'
        },
        amber: {
          50: '#fbf1dd',
          100: '#f6e6c6',
          200: '#ecd6a6',
          300: '#e0be7b',
          400: '#daa43e',
          500: '#c1861f',
          600: '#9c6a12',
          700: '#82570d',
          800: '#674509',
          900: '#4e3506'
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        sans: [
          '"Hanken Grotesk"',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ],
        mono: [
          '"IBM Plex Mono"',
          'Monaco',
          'Consolas',
          'monospace'
        ],
      },
      boxShadow: {
        xs: '0 1px 2px rgba(16,32,42,.05)',
        sm: '0 1px 3px rgba(16,32,42,.07),0 1px 2px rgba(16,32,42,.04)',
        DEFAULT: '0 1px 3px rgba(16,32,42,.07),0 1px 2px rgba(16,32,42,.04)',
        md: '0 6px 16px rgba(16,32,42,.09)',
        lg: '0 18px 40px rgba(16,32,42,.16)'
      },
      maxWidth: {
        content: '1200px'
      },
    }
  },
  plugins: [require('tailwindcss-animate')]
}
