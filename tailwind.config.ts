import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#badcfe",
          300: "#7cc0fd",
          400: "#37a1f9",
          500: "#0d84eb",
          600: "#0168c4",
          700: "#02529f",
          800: "#064682",
          900: "#0b3c6d",
          950: "#072648",
        },
        metallic: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#262626",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "industrial-gradient": "linear-gradient(to right, #0b3c6d, #0d84eb)",
        "metallic-gradient": "linear-gradient(to right, #d1d1d1, #f6f6f6, #d1d1d1)",
      },
    },
  },
  plugins: [],
};
export default config;
