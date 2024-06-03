import type { Config } from "tailwindcss";
import Daisy, { Config as DaisyUIConfig } from "daisyui";

const config: Config & { daisyui?: DaisyUIConfig } = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
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
        purple: require("tailwindcss/colors").purple,
        blue: require("tailwindcss/colors").blue,
        cyan: require("tailwindcss/colors").cyan,
        yellow: require("tailwindcss/colors").yellow,
        indigo: require("tailwindcss/colors").indigo,
        pink: require("tailwindcss/colors").pink,
        green: require("tailwindcss/colors").green,
      },
    },
  },
  daisyui: {
    themes: ["dark", "sunset", "emerald", "cupcake"],
  },
  plugins: [require("daisyui")],
};
export default config;
