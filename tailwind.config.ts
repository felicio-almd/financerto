import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'shape': '#f0f2f5', // substitua pelo valor real da variável --shape
        'text-title': '#363f5f', // substitua pelo valor real da variável --text-title
        'green': '#33cc95', // substitua pelo valor real da variável --green
      },
    },
  },
  plugins: [],
};
export default config;
