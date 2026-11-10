/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    transformer: "postcss",
    minify: false,
  },
  build: {
    cssMinify: false,
    rolldownOptions: {
      output: {
        // Split heavy vendor libraries into their own cacheable chunks
        // so no single chunk exceeds the 500 kB warning threshold.
        codeSplitting: {
          groups: [
            {
              name: "vendor-react",
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|@remix-run|react-router|react-router-dom)[\\/]/,
              minSize: 0,
              priority: 100,
            },
            {
              name: "vendor-query",
              test: /[\\/]node_modules[\\/](@tanstack)[\\/]/,
              minSize: 0,
              priority: 100,
            },
            {
              name: "vendor-motion",
              test: /[\\/]node_modules[\\/](framer-motion|motion|@motionone)[\\/]/,
              minSize: 0,
              priority: 100,
            },
            {
              name: "vendor-supabase",
              test: /[\\/]node_modules[\\/](@supabase)[\\/]/,
              minSize: 0,
              priority: 100,
            },
            {
              name: "vendor-icons",
              test: /[\\/]node_modules[\\/](react-icons)[\\/]/,
              minSize: 0,
              priority: 100,
            },
          ],
        },
      },
    },
  },
});
