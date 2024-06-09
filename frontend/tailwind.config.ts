import type { Config } from "tailwindcss";
import Daisy, { Config as DaisyUIConfig } from "daisyui";

const config: Config & { daisyui?: DaisyUIConfig } = {
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
    },
  },
  daisyui: {
    themes: ["dark", "sunset", "emerald", "cupcake"],
  },
  plugins: [Daisy],
};
export default config;
