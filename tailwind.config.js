/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Utiliser la classe .dark pour le mode sombre
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // indigo-600
        "primary-dark": "#4338CA", // indigo-700
        secondary: "#10B981", // emerald-500
        accent: "#F59E0B", // amber-500
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      backgroundColor: {
        "lesson-dark": "#121212",
        "lesson-light": "#ffffff",
        "primary-light": "#ffffff",
        "secondary-light": "#f5f5f5",
        "primary-dark": "#121212",
        "secondary-dark": "#1e1e1e",
      },
      textColor: {
        "lesson-dark": "#ffffff",
        "lesson-light": "#000000",
        "primary-light": "#121212",
        "secondary-light": "#333333",
        "primary-dark": "#ffffff",
        "secondary-dark": "#e0e0e0",
      },
      boxShadow: {
        "text-enhance": "0 0 2px rgba(0,0,0,0.3)",
        "text-enhance-dark": "0 0 2px rgba(255,255,255,0.3)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    // Ajouter un plugin pour générer automatiquement des classes de contraste
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-light": {
          textShadow: "0 0 1px rgba(0,0,0,0.2)",
        },
        ".text-shadow-dark": {
          textShadow: "0 0 1px rgba(255,255,255,0.2)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
  safelist: [
    // Uniquement les classes essentielles qui sont générées dynamiquement
    "bg-indigo-600",
    "bg-indigo-700",
    "bg-green-500",
    "bg-red-500",
    "text-green-500",
    "text-red-500",
    "border-green-500",
    "border-red-500",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
