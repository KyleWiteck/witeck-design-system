import { Box, Flex, Stack, Text } from '@KyleWiteck/witeck-design/components';
import * as ESMIcons from '@KyleWiteck/witeck-design/icons';
import { IconProps } from '@KyleWiteck/witeck-design/icons';

export function IconsDemo() {
  return (
    <Stack gap="6">
      <Box display="grid" gridTemplateColumns="3x" gap="4">
        {Object.entries(ESMIcons).map(([key, icon]) => {
          const IconComponent = icon as React.FC<IconProps>;
          if (key.startsWith('createStyled')) return null;
          return (
            <Flex gap="2" alignItems="center">
              <IconComponent key={key} boxSize="6" />
              <Text fontSize="sm" element="span">
                {key}
              </Text>
            </Flex>
          );
        })}
      </Box>
    </Stack>
  );
}
