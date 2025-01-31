import Link from '@docusaurus/Link';
import { Box, BoxProps, Flex, Text } from '@KyleWiteck/witeck-design/components';
import { __SECRET_INTERNAL_PROPERTIES_DONT_USE__ as properties } from '@KyleWiteck/witeck-design/theme';
import { SHORTHANDS, themeValues } from '@KyleWiteck/witeck-design/utils';
import { useEffect, useRef, useState } from 'react';

export function ColorsTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Prop value</th>
          <th>CSS value</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {Object.entries(themeValues.color).map(([key, value]) => (
          <tr key={key}>
            <Text element="td" color="neutral700" fontWeight="medium">
              {key}
            </Text>
            <Text color="successDark" fontWeight="medium" element="td">
              "{value}"
            </Text>
            <td>
              <Box
                boxSize="6"
                backgroundColor={key as BoxProps['backgroundColor']}
                border="1px"
                borderColor="border2"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function SpacingTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Prop value</th>
          <th>CSS value</th>
          <th>16px Reference Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(themeValues.space).map(([key, value]) => (
          <tr key={key}>
            <Text element="td" color="neutral700" fontWeight="medium">
              {key}
            </Text>
            <Text color="successDark" fontWeight="medium" element="td">
              "{value}"
            </Text>
            {value.includes('rem') ? (
              <Text color="successDark" fontWeight="medium" element="td">
                "{parseFloat(value.replace('rem', '')) * 16}px"
              </Text>
            ) : (
              // Used to keep zebra striping consistent
              <Box visibility="hidden" />
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ShortHandsTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Prop value</th>
          <th>Associated CSS Properties</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(SHORTHANDS).map(([key, value]) => (
          <tr key={key}>
            <Text element="td" color="neutral700" fontWeight="medium">
              {key}
            </Text>
            <Text color="successDark" fontWeight="medium" element="td">
              "{value.join('" , "')}"
            </Text>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const spacingProps = [
  'width',
  'height',
  'minWidth',
  'maxWidth',
  'minHeight',
  'maxHeight',
  'gap',
  'gridColumnGap',
  'gridGap',
  'gridRowGap',
  'flexBasis'
];

export function SprinklesTable() {
  const [__render, setRerender] = useState(0);
  const getCSSValue = useRef((v: string) => v);

  // Can't load css vars at build time, so this is a workaround
  useEffect(() => {
    const rootCSS = globalThis.getComputedStyle(document.getElementById('root')!);

    getCSSValue.current = (value: string) => {
      return rootCSS.getPropertyValue(value.replace('var(', '').replace(')', ''));
    };

    setRerender(1);
  }, []);

  return (
    <table className="sprinkles-table">
      <thead>
        <tr>
          <th>Prop name</th>
          <th>Prop/CSS value</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(properties).map(([key, styles]) => {
          if (Array.isArray(styles))
            return (
              <tr key={key}>
                <Text color="neutral700" fontWeight="medium" element="td">
                  {key}
                </Text>
                <table>
                  <tbody>
                    {styles.map(value => (
                      <tr key={value}>
                        <Text element="td" fontWeight="medium" color="successDark">
                          "{value}"
                        </Text>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </tr>
            );

          const items = Object.entries(styles ?? {});
          const isSpacing = spacingProps.includes(key) || key.startsWith('margin') || key.startsWith('padding');
          const isColor = key.toLowerCase().includes('color');

          return (
            <tr key={key}>
              <Text
                className={isSpacing || isColor ? 'border-right' : ''}
                color="neutral700"
                fontWeight="medium"
                element="td"
              >
                {key}
              </Text>
              {isSpacing ? (
                <td>
                  <Text
                    element={Link}
                    color="primary600"
                    textDecoration="underline"
                    fontWeight="medium"
                    to="/docs/guides/styles-and-theming/sprinkles#spacing"
                  >
                    Reference spacing
                  </Text>
                </td>
              ) : isColor ? (
                <td>
                  <Text
                    element={Link}
                    color="primary600"
                    textDecoration="underline"
                    fontWeight="medium"
                    to="/docs/guides/styles-and-theming/sprinkles#colors"
                  >
                    Reference colors
                  </Text>
                </td>
              ) : (
                <table>
                  <tbody>
                    {items.map(([name, value]) => {
                      const cssVar = getCSSValue.current(value);
                      return (
                        <tr key={name}>
                          <Flex
                            element="td"
                            gap="4"
                            justifyContent="space-between"
                            fontWeight="medium"
                            color="successDark"
                          >
                            <span>"{name}"</span>
                            {cssVar && (
                              <Text paddingX="1.5" color="neutral700" element="code">
                                {cssVar}
                              </Text>
                            )}
                          </Flex>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
