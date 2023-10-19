import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        white:"#ffffff",
        dark:"#000119",
        neutral:"#28138e",
        silver:"#ecebff",
       }
    },
  
  },
  plugins: [],
}
export default config
