import path from 'path'
import vue from '@vitejs/plugin-vue'

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  alias: [{
    find: '@',
    replacement: path.resolve(__dirname, './src'),
  }],
  plugins: [vue()]
}
