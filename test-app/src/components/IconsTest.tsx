import { Flex, Icons, Stack, Text } from '@KyleWiteck/witeck-design/components';
import { GearIcon, HomeIcon, MailIcon, MenuIcon, UserIcon } from '@KyleWiteck/witeck-design/icons';

export function IconsTest() {
  return (
    <Stack>
      <Text>Deprecarted Icons</Text>
      <Flex gap="4">
        <Icons.User />
        <Icons.Home />
        <Icons.Gear />
        <Icons.Mail />
        <Icons.Menu />
      </Flex>
      <Text>EMS Icons</Text>
      <Flex gap="4">
        <UserIcon />
        <HomeIcon />
        <GearIcon />
        <MailIcon />
        <MenuIcon />
      </Flex>
    </Stack>
  );
}
