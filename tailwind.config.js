/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#16a34a",
        "primary-dark": "#15803d",
        accent: "#f97316",
        bg: "#f3f4f6",
        surface: "#ffffff",
        "text-primary": "#111827",
        "text-muted": "#6b7280",
        border: "#e5e7eb",
      },
    },
  },
  plugins: [],
};
