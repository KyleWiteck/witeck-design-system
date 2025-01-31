import { Flex, Tooltip } from '@KyleWiteck/witeck-design/components';

export function TooltipTest() {
  return (
    <Flex gap="2" alignItems="center">
      <span>Tooltip Test</span> <Tooltip content="Tooltip Content" />
    </Flex>
  );
}
