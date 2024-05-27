// Plugins
import Components from 'unplugin-vue-components/vite';
import Vue from '@vitejs/plugin-vue';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import { VitePWA } from 'vite-plugin-pwa';

// Utilities
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify(),
    Components(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Goopper 计算机实训平台',
        short_name: 'Goopper',
        description: 'Goopper 计算机实训平台',
        theme_color: '#1f1f1f',
        icons: [
          {
            src: 'logo.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any'
          }
        ]
      },
      devOptions: {
        enabled: true
      },
      workbox: {
        // 4MB Max
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
      }
    })
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'echarts': ['echarts'],
          'monaco-editor': ['monaco-editor'],
          'p5': ['p5'],
          'vendor': ['mitt', 'vue', 'vue-router', 'axios', 'vuetify', 'nprogress', 'pinia', 'unplugin-fonts']
        }
      }
    }
  }
});