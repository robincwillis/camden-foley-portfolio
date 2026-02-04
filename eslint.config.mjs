import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import eslintPluginPrettier from "eslint-plugin-prettier";

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "warn",
    },
  },
];

export default eslintConfig;
