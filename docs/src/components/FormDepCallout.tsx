import { Button, CalloutMessage, Text } from '@KyleWiteck/witeck-design/components';

export function FormDepCallout() {
  return (
    <CalloutMessage>
      <Text>
        We recommend that you use{' '}
        <Button
          element="a"
          variant="link"
          size="sm"
          paddingX="0"
          href="https://react-hook-form.com/"
          rel="noopener noreferrer"
        >
          React Hook Form
        </Button>{' '}
        with forms. Not in the example below.
      </Text>
    </CalloutMessage>
  );
}
