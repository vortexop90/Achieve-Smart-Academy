/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Light blue
        secondary: '#60A5FA', // Pastel blue tone
        accent: '#F3F4F6', // Light gray/white
      }
    },
  },
  plugins: [],
}
