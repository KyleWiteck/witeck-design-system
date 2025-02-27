import fs from 'node:fs/promises';

/**
 * Converts camelCase, snake_case, and kebab-case strings into PascalCase with a suffix.
 */
function toPascalCase(str: string, suffix: 'Icon' | 'SVG') {
  return (
    str
      .replace(/\.svg/g, '') // Remove ".svg"
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Handle camelCase
      .replace(/[_-]/g, ' ') // Handle snake_case and kebab-case
      .split(' ') // Split into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join('') + suffix
  );
}

let template = `
/**
* Magnit Design System Icons
*
* AUTO-GENERATED FILE DO NOT MODIFY MANUALLY
*
* @module ESM Icon Components
*
* NOTE: When adding new SVG icons, please ensure that you remove the "width" and "height" attributes
* so that the system can set these automatically. Additionally, make sure to replace the main color
* with "currentColor" instead of using a hexadecimal value. This will enable the icon to inherit or
* pick up the color through the "color" prop.
*/

`;

async function generateIcons() {
  console.log('-- Generating ESM Icons --');
  const icons = await fs.readdir('assets/icons');

  for (const svg of icons) {
    template += `import ${toPascalCase(svg, 'SVG')} from "../../assets/icons/${svg}?react";`;
    template += '\n';
  }

  template += '\n';
  template += `import { createStyledIcon } from './createStyledIcon.tsx';`;
  template += '\n';
  template += '\n';
  template += `export * from './createStyledIcon.tsx';`;
  template += '\n';

  for (const svg of icons) {
    const Icon = toPascalCase(svg, 'Icon');
    const svgComponent = toPascalCase(svg, 'SVG');
    template += `export const ${Icon} = createStyledIcon({ name: '${Icon}', svg: ${svgComponent} });`;
    template += '\n';
  }

  await fs.writeFile('src/icons/index.tsx', template);
  console.log(`-- ${icons.length} ESM Icons Successfully Generated --`);
}

await generateIcons();
