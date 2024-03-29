import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "transparent-gray": "#1f29375d",
        "transparent-theme": "rgba(0, 255, 146, 0.2)",
        "light-contrast": "#5285A4",
        "light-dark-contrast": "#2B5574",
        "dark-contrast": "#234862",
        success: "#ADDDA9",
      },
      borderRadius: {
        pill: "15px",
      },
    },
    screens: {
      xs: "320px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
export default config;
