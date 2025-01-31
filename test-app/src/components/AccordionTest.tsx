import { Accordion, Stack, Text } from '@peopleticker/magnit-design/components';

export function AccordionTest() {
  return (
    <Stack gap="8">
      <Accordion size="small" title="Accordion small" defaultOpen>
        <Stack>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur itaque aut inventore recusandae
            perspiciatis unde ab modi minus hic quam ducimus, aliquam nam doloremque eius explicabo consectetur odit
            porro aperiam.
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur itaque aut inventore recusandae
            perspiciatis unde ab modi minus hic quam ducimus, aliquam nam doloremque eius explicabo consectetur odit
            porro aperiam.
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur itaque aut inventore recusandae
            perspiciatis unde ab modi minus hic quam ducimus, aliquam nam doloremque eius explicabo consectetur odit
            porro aperiam.
          </Text>
        </Stack>
      </Accordion>
    </Stack>
  );
}
