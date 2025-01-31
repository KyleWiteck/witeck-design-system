import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets';
import typescript from '@rollup/plugin-typescript';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin({ identifiers: 'short' }),
    svgr(),
    dts({ tsconfigPath: './tsconfig.build.json', insertTypesEntry: true }),
    libAssetsPlugin({
      include: /\.(woff|woff2|png)$/,
      exclude: /\.(css|svg)$/
    })
  ],
  build: {
    copyPublicDir: false,
    sourcemap: true,
    lib: {
      name: '@peopleticker/magnit-design',
      formats: ['es'],
      entry: {
        components: resolve(__dirname, 'src/components/index.ts'),
        hooks: resolve(__dirname, 'src/hooks/index.ts'),
        theme: resolve(__dirname, 'src/theme/index.ts'),
        types: resolve(__dirname, 'src/types/index.ts'),
        utils: resolve(__dirname, 'src/utils/index.ts'),
        icons: resolve(__dirname, 'src/icons/index.tsx')
      }
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom', '@vanilla-extract/css'],
      plugins: [typescript({ tsconfig: './tsconfig.build.json' })]
    }
  }
});
