import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      sans: ["Articulat", "Helvetica", "Arial", "sans-serif"],
    },
    extend: {
      colors: {
        background: "#000",
        foreground: "#fff",
        crayola: "#00f2d5",
        vividViolet: "#ad00ff",
        yankeesBlue: "#12303b",
        lightSeaGreen: "#28a0b2",
      },
    },
  },
  plugins: [],
} satisfies Config;
