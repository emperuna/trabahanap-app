import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react(), tailwindcss()],
    
    // Define environment variables accessible in the app
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || 'http://localhost:8080'),
    },
    
    // Build configuration for production
    build: {
      outDir: 'dist',
      sourcemap: false,
      // Optimize for Cloudflare Pages
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion'],
          },
        },
      },
    },
    
    // Server configuration for development
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
  }
})
