import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // NIC / S3WaaS / SVNIRTAR theme — exact values from source CSS
        "nic-orange":  "#ff9f08",   // primary nav background
        "nic-orange-dark": "#e68900", // nav hover
        "nic-submenu": "#464141",   // dropdown sub-menu bg
        "nic-purple":  "#730068",   // welcome / feature section bg
        "nic-purple-dark": "#5a0050",
        "nic-accent":  "#ff6600",   // link accent colour
        "nic-red":     "#ff0000",   // alert / urgent text
        "nic-section": "#e5e5e5",   // section background (light gray)
        "nic-section2": "#ededed",  // alternate section bg
        "nic-card":    "#f5f5f5",   // card background
        "nic-body":    "#0a0a0a",   // body text

        // Card top-border accent palette (10 px top border style)
        "card-green":  "#3aa04a",
        "card-amber":  "#fea500",
        "card-cyan":   "#00d8ff",
        "card-purple": "#8224e3",
        "card-blue":   "#1a6ebb",
        "card-red":    "#e53935",

        // Gov standard colours kept for emblem / flags
        navy:          "#003366",
        "gov-blue":    "#005BAC",
        saffron:       "#FF9933",
        "gov-green":   "#138808",
      },
      fontFamily: {
        sans: ["Segoe UI", "system-ui", "-apple-system", "Helvetica Neue", "Arial", "sans-serif"],
      },
      borderRadius: { "4xl": "2rem" },
      boxShadow: {
        "nic-sm":  "0 1px 4px rgba(0,0,0,0.10)",
        "nic-md":  "0 4px 12px rgba(0,0,0,0.12)",
        "nic-lg":  "0 8px 24px rgba(0,0,0,0.16)",
      },
      backgroundImage: {
        tricolor: "linear-gradient(to right, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%)",
      },
    },
  },
  plugins: [],
};
export default config;
