/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        primary: "#F5385D",
        gold: "#fadc61",
        grey: "#D3D3D3",
        mintgreen: "#a2d4c9",
        lightsky: "#87CEFA",
        snow: "#FFFAFA",
        hotpink: "#FF69B4",
        floral: "	#F5F5F5",
        lavender:"#E6E6FA",
      },
    },
  },
  plugins: [],
};
