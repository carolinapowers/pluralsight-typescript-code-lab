import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  // Server configuration for Pluralsight sandbox environment
  // Uncomment when running in Pluralsight's cloud development environment
  // server: {
  //   port: 3000,
  //   host: true,
  //   allowedHosts: ['.pluralsight.run'],
  // },
});