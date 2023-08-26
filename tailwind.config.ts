import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/button.js",
    './node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
      themes: {
        dark: {
          colors: {
            background: "#191919",
            foreground: "#ffffff",
            primary: {
              50: "#000000",
              100: "#191919",
              200: "#333333",
              300: "#4C4C4C",
              400: "#666666",
              500: "#7F7F7F",
              600: "#999999",
              700: "#B2B2B2",
              800: "#CCCCCC",
              900: "#E5E5E5",
              DEFAULT: "#7F7F7F",
              foreground: "#FFFFFF",
            },
            focus: {
              50: 'rgba(41, 98, 255, 1)',
              100: 'rgba(244, 81, 30, 1)'
            },
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
        light: {
          colors: {
            background: "#F2F2F2",
            foreground: "#000000",
            primary: {
              50: "#FFFFFF",
              100: "#F2F2F2",
              200: "#E5E5E5",
              300: "#CCCCCC",
              400: "#B2B2B2",
              500: "#999999",
              600: "#7F7F7F",
              700: "#666666",
              800: "#4C4C4C",
              900: "#333333",
              DEFAULT: "#999999",
              foreground: "#000000",
            },
            focus: {
              50: 'rgba(41, 98, 255, 1)',
              100: 'rgba(244, 81, 30, 1)'
            },
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }
  )],
}
export default config
