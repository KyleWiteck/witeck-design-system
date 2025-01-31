import { Button, ButtonDropdownWrapper, Input, Stack, Text } from '@peopleticker/magnit-design/components';
import { useDisclosure } from '@peopleticker/magnit-design/hooks';

export default function ButtonDropdownTest() {
  const disclosure = useDisclosure();
  return (
    <ButtonDropdownWrapper
      {...disclosure}
      dropdownProps={{}}
      dropdownContent={
        <Stack height="fitContent" backgroundColor="primary">
          {/* <Stack maxWidth="72" height="full"> */}
          <Text color="primary">This is a Header</Text>
          <Text id="describedbyId">
            This is a sample paragraph for testing purposes. It includes several sentences to form a coherent and
            complete paragraph. The primary goal of this paragraph is to serve as an example, helping to test the
            formatting, structure, and overall appearance of text within a given context. This text also provides an
            opportunity to evaluate how well the paragraph fits into a broader document or interface, ensuring that it
            meets the necessary standards and requirements. By reviewing this sample paragraph, one can gain insights
            into the layout, readability, and visual appeal of the text, ultimately making any necessary adjustments to
            improve its quality and effectiveness.
          </Text>
          <Input />
          <Button>test 1</Button>
          <Button onClick={() => console.log('click')}>Test 2</Button>
          {/* </Stack> */}
        </Stack>
      }
      button={
        <Button
          variant="text"
          type="button"
          position="relative"
          size="sm"
          minHeight="9"
          flexDirection="row-reverse"
          style={{ fontWeight: 'normal' }}
        >
          test button
        </Button>
      }
    />
  );
}
