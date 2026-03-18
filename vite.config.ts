import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      entry: "script/index.js",
      name: "ParcelPicker",
      fileName: "parcel-picker",
      formats: ["es","cjs"],
    },
    rolldownOptions: {
      treeshake: false,
      output: {
        preserveModules: true,
        exports: 'named',
      },
    }
  },
  plugins: [
    react()
  ]
})