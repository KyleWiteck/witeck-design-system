import fs from 'node:fs/promises';
import { optimize } from 'svgo';

async function optimizeSvg(svg, path) {
  const result = optimize(svg, {
    js2svg: {
      indent: 2,
      pretty: true
    },
    path,
    plugins: [
      'removeMetadata',
      'removeEmptyText',
      'removeComments',
      'removeEditorsNSData',
      'removeHiddenElems',
      'removeTitle',
      'removeDesc',
      {
        name: 'custom-remove-width-and-height-from-root-svg',
        fn() {
          return {
            element: {
              enter: node => {
                if (node.name === 'svg' && node.attributes.height) {
                  delete node.attributes.height;
                }
                if (node.name === 'svg' && node.attributes.width) {
                  delete node.attributes.width;
                }
              }
            }
          };
        }
      },
      {
        name: 'custom-fill-to-currentColor',
        fn() {
          return {
            element: {
              enter: node => {
                if (node.name === 'svg') node.attributes.fill = 'currentColor';
                if (node.attributes.fill && node.attributes.fill !== 'white') node.attributes.fill = 'currentColor';
              }
            }
          };
        }
      }
    ]
  });

  return result.data;
}

async function optimizeIcons() {
  console.log('-- Optimizing SVG Icons --');
  const icons = await fs.readdir('assets/icons');

  for (const icon of icons) {
    // Ignore magnit icons
    if (icon.startsWith('magnit')) continue;

    const svgPath = `assets/icons/${icon}`;
    const svgString = await fs.readFile(svgPath, { encoding: 'utf8' });
    const optimizedSvg = await optimizeSvg(svgString, svgPath);
    await fs.writeFile(svgPath, optimizedSvg, { encoding: 'utf8' });
  }

  console.log(`-- ${icons.length} SVG Icons Successfully Optimized --`);
}

await optimizeIcons();
