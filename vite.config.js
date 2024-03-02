import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/shelters": {
        target: "https://assg-2.onrender.com/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});