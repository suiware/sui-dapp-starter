import react from "@vitejs/plugin-react-swc";
import path from 'path'
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const ARWEAVE_DEPLOYMENT = process.env.ARWEAVE_DEPLOYMENT === 'true' || false

// https://vitejs.dev/config/
export default defineConfig({
  base: !ARWEAVE_DEPLOYMENT ? '/' : './',
  resolve: {
    alias: {
      '~~': path.resolve(__dirname, './src'),
    },
  },
  plugins: [tsconfigPaths(), react()],
})
