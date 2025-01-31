import { Button, Stack, Text } from '@KyleWiteck/witeck-design/components';

function FooterWrapper(): JSX.Element {
  return (
    <Stack
      width="full"
      borderTop="1px"
      borderColor="border"
      padding="6"
      element="footer"
      gap="0"
      backgroundColor="white"
      alignSelf="flex-end"
      alignItems="center"
      textAlign="center"
    >
      <Text variant="label" element="p" margin="0">
        &copy; COPYRIGHT {new Date().getFullYear()}, ALL RIGHTS RESERVED.
      </Text>
      <Text variant="body2" margin="0">
        Built with&nbsp;
        <Button variant="link" fontWeight="medium" element="a" href="https://docusaurus.io/">
          Docusaurus.
        </Button>
      </Text>
    </Stack>
  );
}

export default FooterWrapper;
