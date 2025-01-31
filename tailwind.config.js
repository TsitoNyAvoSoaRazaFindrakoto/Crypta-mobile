/** @type {import('tailwindcss').Config} */
export const content = ["./app/**/*.{js,jsx,ts,tsx}"];
export const presets = [require("nativewind/preset")];
export const theme = {
  extend: {
    colors: {
      // Core brand colors
      brand: {
        DEFAULT: "#41337a",
        muted: "#5b47aa",
        light: "#8171c3",
        pale: "#d5d0eb",
        contrast: "#ffffff",
        50: "#f5f4fa",
        100: "#e8e5f5",
        200: "#d5d0eb",
        300: "#aba0d7",
        400: "#8171c3",
        500: "#5b47aa",
        600: "#41337a",
        700: "#342962",
        800: "#271f49",
        900: "#1a1431",
      },

      // Secondary palette
      accent: {
        DEFAULT: "#afb3f7",
        muted: "#636af0",
        intense: "#1721e7",
        pale: "#eff0fd",
        50: "#f8f8fe",
        100: "#eff0fd",
        200: "#dfe1fc",
        300: "#c0c3f9",
        400: "#afb3f7",
        500: "#636af0",
        600: "#1721e7",
        700: "#0f169a",
        800: "#080b4d",
        900: "#04052a",
      },

      // Surface colors
      surface: {
        DEFAULT: "#ffffff",
        primary: "#f8f9fe",
        secondary: "#f1f3fc",
        tertiary: "#e8ebfa",
        inverse: "#1a1431",
      },

      // Semantic text colors
      text: {
        primary: "#1a1431",
        secondary: "#41337a",
        tertiary: "#5b47aa",
        inverted: "#ffffff",
        muted: "#8171c3",
      },

      // Border ecosystem
      border: {
        DEFAULT: "#e8e5f5",
        muted: "#d5d0eb",
        intense: "#aba0d7",
        inverse: "#1a1431",
      },

      // Status colors with enhanced contrast
      success: {
        DEFAULT: "#10b981",
        surface: "#d1fae5",
        text: "#065f46",
      },
      error: {
        DEFAULT: "#ef4444",
        surface: "#fee2e2",
        text: "#7f1d1d",
      },
      warning: {
        DEFAULT: "#f5ce2f",
        surface: "#fef3c7",
        text: "#854d0e",
      },
      info: {
        DEFAULT: "#3b82f6",
        surface: "#dbeafe",
        text: "#1e40af",
      },

      // Elevation colors
      elevation: {
        1: "#f8f9fe",
        2: "#f1f3fc",
        3: "#e8ebfa",
        4: "#d5d0eb",
        5: "#aba0d7",
      }
    },
    // Extended shadows using brand colors
    boxShadow: {
      xs: "0 1px 2px rgba(65, 51, 122, 0.05)",
      sm: "0 1px 3px rgba(65, 51, 122, 0.1)",
      DEFAULT: "0 4px 6px -1px rgba(65, 51, 122, 0.1)",
      lg: "0 10px 15px -3px rgba(65, 51, 122, 0.15)",
      xl: "0 20px 25px -5px rgba(65, 51, 122, 0.2)",
    }
  },
};
export const plugins = [];