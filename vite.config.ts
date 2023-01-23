import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
		extensions: [".js", ".json", ".tsx", ".ts"],
		alias: {
			'~': fileURLToPath(new URL('./', import.meta.url)),
			'@': fileURLToPath(new URL('./src/', import.meta.url)),
			$assets: path.resolve('./src/Assets'),
			$services: path.resolve('./src/Services'),
			$components: path.resolve('./src/Components'),
		}
	},
	css: {
		preprocessorOptions: { 
			scss: { 
				additionalData: `@import "@/assets/Styles/Linkin.scss";` 
			} 
		}
	}
});