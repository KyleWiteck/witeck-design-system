import { Box, Flex, Stack, Text } from '@peopleticker/magnit-design/components';
import * as ESMIcons from '@peopleticker/magnit-design/icons';
import { IconProps, MagnitFullLogo2Icon, MagnitFullLogoIcon, MagnitLogoIcon } from '@peopleticker/magnit-design/icons';

export function IconsDemo() {
  return (
    <Stack gap="6">
      <Box display="grid" gridTemplateColumns="3x" gap="6">
        <Stack gap="0">
          <Text fontSize="sm" element="span">
            MagnitFullLogoIcon
          </Text>
          <MagnitFullLogoIcon height="20" width="44" />
        </Stack>
        <Stack gap="2">
          <Text fontSize="sm" element="span">
            MagnitFullLogo2Icon
          </Text>
          <MagnitFullLogo2Icon height="18" width="40" />
        </Stack>
        <Stack gap="4">
          <Text fontSize="sm" element="span">
            MagnitLogoIcon
          </Text>
          <MagnitLogoIcon boxSize="12" />
        </Stack>
      </Box>
      <Box display="grid" gridTemplateColumns="3x" gap="4">
        {Object.entries(ESMIcons).map(([key, icon]) => {
          const IconComponent = icon as React.FC<IconProps>;
          if (key.startsWith('createStyled') || key.startsWith('Magnit')) return null;
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
