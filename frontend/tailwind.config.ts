import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#032147",
          700: "#1e4976",
          800: "#1e3a5f",
          900: "#162d4a",
        },
        accent: "#ecad0a",
        primary: "#209dd7",
        secondary: "#753991",
        muted: "#888888",
      },
    },
  },
  plugins: [],
};

export default config;
