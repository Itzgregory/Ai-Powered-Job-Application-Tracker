/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#bd3133",
        secondary: "#F2E007", 
        background: "#d15252", 
        button: "#01345b", 
        textColor: "#ffffff", 
        shadowColor: "rgba(0, 0, 0, 0.4)", 
        hover: "#F2E007",
        borderColor: "rgba(255, 255, 255, 0.2)", 
        buttonHoverBg: "#bd3133", 
        buttonHoverText: "#ffffff", 
      },
      fontFamily: {
        hollow: ["hollow", "sans-serif"],
        oswald: ["oswald", "sans-serif"],
        cabin: ["cabin", "sans-serif"], 
      },
      animation: {
        enlarge: "enlarge 1s ease-in-out", 
        reduce: "reduce 1s ease-in-out", 
        fadeIn: "fadeIn 0.5s ease-in forwards", 
      },
      keyframes: {
        enlarge: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
        reduce: {
          "0%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        fadeIn: {
          "0%": { opacity: 0, transform: "translateX(20px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
