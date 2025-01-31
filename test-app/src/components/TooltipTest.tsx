import { Flex, Tooltip } from '@peopleticker/magnit-design/components';

export function TooltipTest() {
  return (
    <Flex gap="2" alignItems="center">
      <span>Tooltip Test</span> <Tooltip content="Tooltip Content" />
    </Flex>
  );
}
