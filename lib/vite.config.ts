import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets';
import typescript from '@rollup/plugin-typescript';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { Plugin, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';

function ssrCompatPlugin(): Plugin {
  return {
    name: 'ssr-compat',
    enforce: 'pre' as const,
    transform(code, id) {
      if (/\.(png|jpe?g|gif|svg|webp)$/.test(id)) {
        return {
          code: `
            let url = '';
            if (typeof window !== 'undefined') {
              url = new URL('${id}', import.meta.url).pathname;
            }
            export default url;
          `,
          map: null
        };
      }
    }
  };
}

export default defineConfig({
  plugins: [
    ssrCompatPlugin(),
    react(),
    vanillaExtractPlugin({ identifiers: 'short' }),
    svgr(),
    dts({ tsconfigPath: './tsconfig.build.json', insertTypesEntry: true }),
    libAssetsPlugin({
      include: /\.(woff|woff2)$/,
      exclude: /\.(css|svg)$/
    })
  ],
  build: {
    copyPublicDir: false,
    sourcemap: true,
    lib: {
      name: '@KyleWiteck/witeck-design',
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
