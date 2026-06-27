import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [".next/**", "node_modules/**", "public/uploads/**", "coverage/**"]
  },
  ...nextVitals
];

export default config;
