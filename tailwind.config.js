/** @type {import('tailwindcss').Config} */
export const content = ["./app/**/*.{js,jsx,ts,tsx}"];
export const presets = [require("nativewind/preset")];
export const theme = {
  extend: {
    colors: {
      // Brand Colors
      "brand-primary": {
        DEFAULT: "#480355", // Deep purple
        100: "#0e0111",
        200: "#1c0121",
        300: "#2a0232",
        400: "#380243",
        500: "#480355",
        600: "#8b06a5",
        700: "#cf0af6",
        800: "#df5cf9",
        900: "#efadfc",
      },
      "brand-accent": {
        DEFAULT: "#c59fc9", // Muted lavender
        100: "#2c1a2e",
        200: "#59345d",
        300: "#854e8b",
        400: "#aa72b0",
        500: "#c59fc9",
        600: "#d1b3d4",
        700: "#ddc6df",
        800: "#e8d9ea",
        900: "#f4ecf4",
      },

      // Background Colors
      "background": {
        DEFAULT: "#e8ebe4", // Light base
        100: "#fbfbfa",     // Lightest
        200: "#f6f7f4",
        300: "#f2f3ef",
        400: "#edefea",
        500: "#e8ebe4",     // Base
        600: "#bbc4af",
        700: "#8e9d7a",
        800: "#5f6b4f",
        900: "#2f3527",     // Darkest
      },

      // Neutral Colors (Text & Borders)
      "neutral": {
        DEFAULT: "#7c6354", // Brown base
        100: "#191411",     // Darkest
        200: "#322822",
        300: "#4b3c33",
        400: "#645044",
        500: "#7c6354",     // Base
        600: "#9e8170",
        700: "#b6a194",
        800: "#cec0b7",
        900: "#e7e0db",     // Lightest
      },

      // Status Colors
      "success": {
        DEFAULT: "#10b981", // Emerald
        light: "#d1fae5",
      },
      "error": {
        DEFAULT: "#ef4444", // Red
        light: "#fee2e2",
      },
      "warning": {
        DEFAULT: "#f5ce2f", // Amber
        light: "#fbffcf",
      },
      "info": {
        DEFAULT: "#3b82f6", // Blue
        light: "#dbeafe",
      },
    },
  },
};
export const plugins = [];