// Plugins
import Components from 'unplugin-vue-components/vite';
import Vue from '@vitejs/plugin-vue';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

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
        id: 'app.goopper.top',
        name: 'Goopper 计算机实训平台',
        launch_handler: {
          client_mode: 'auto',
        },
        orientation: 'portrait-primary',
        short_name: 'Goopper',
        description: 'Goopper 计算机实训平台',
        theme_color: '#1f1f1f',
        lang: 'zh-CN',
        edge_side_panel: '512',
        categories: ['education'],
        dir: 'ltr',
        icons: [
          {
            src: 'logo.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'logo.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          },
        ],
        screenshots: [],
      },
      devOptions: {
        enabled: true
      }
    }),
    // 打包体积分析
    visualizer({
      open: true,
      filename: 'visualizer.html' //分析图生成的文件名
    }),
    nodePolyfills()
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
          'code-mirror': ['codemirror','vue-codemirror'],
          'p5': ['p5'],
          'vendor': ['mitt', 'vue', 'vue-router', 'axios', 'vuetify', 'nprogress', 'pinia', 'unplugin-fonts']
        }
      }
    }
  }
});