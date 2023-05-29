/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    letterSpacing: {
      wild: "0.1em",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "primary-gradient": `linear-gradient(135deg, var(--primary-color-dark) 50%, var(--primary-color-light) 70%, var(--primary-color-light))`,
        "secondary-gradient": `linear-gradient(to right, var(--secondary-color), var(--secondary-color-light))`,
        "secondary-gradients": `linear-gradient(60deg, var(--secondary-color-dark2) 20%, var(--text-color) 20%, var(--light-grey) 80%,var(--secondary-color-dark2) 80%)`,
        "accent-gradient": `linear-gradient(to right, var(--accent-color), var(--accent-color-light))`,
      },
      colors: {
        primary: {
          DEFAULT: "var(--primary-color)",
          light: "var(--primary-color-light)",
          dark: "var(--primary-color-dark)",
        },
        secondary: {
          DEFAULT: "var(--secondary-color)",
          light: "var(--secondary-color-light)",
          dark: "var(--secondary-color-dark)",
          dark2: "var(--secondary-color-dark2)",
        },
        accent: {
          DEFAULT: "var(--accent-color)",
          light: "var(--accent-color-light)",
          dark: "var(--accent-color-dark)",
        },
        background: {
          DEFAULT: "var(--background-color)",
          primary: "var(--background-color-primary)",
        },
        text: "var(--text-color)",
      },
    },
  },
  plugins: [],
};
