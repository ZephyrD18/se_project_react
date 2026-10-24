import process from "node:process";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const browserImports = {
  react: "https://esm.sh/react@18.3.1",
  "react/jsx-runtime": "https://esm.sh/react@18.3.1/jsx-runtime?external=react",
  "react-dom": "https://esm.sh/react-dom@18.3.1?external=react",
  "react-dom/client": "https://esm.sh/react-dom@18.3.1/client?external=react",
  "react-router-dom":
    "https://esm.sh/react-router-dom@6.30.3?external=react,react-dom",
};

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  if (command === "build" && !env.VITE_API_BASE_URL) {
    throw new Error(
      "Set VITE_API_BASE_URL to the deployed API URL before building.",
    );
  }

  return {
    plugins: [
      react(),
      {
        name: "browser-import-map",
        apply: "build",
        transformIndexHtml: () => [
          {
            tag: "script",
            attrs: { type: "importmap" },
            children: JSON.stringify({ imports: browserImports }),
            injectTo: "head-prepend",
          },
        ],
      },
    ],
    build: {
      modulePreload: { polyfill: false },
      rollupOptions: { external: Object.keys(browserImports) },
    },
    server: {
      port: 3000,
      strictPort: true,
    },
  };
});
