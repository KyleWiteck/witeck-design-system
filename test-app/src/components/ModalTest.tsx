import {
  Button,
  Icons,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Stack,
  Text
} from '@peopleticker/magnit-design/components';

import ButtonDropdownTest from './ButtonDropdownTest';
import SelectTest from './SelectTest';

export default function ModalTest() {
  // const disclosure = useDisclosure();

  return (
    <>
      <Button variant="primary">Open Modal</Button>
      <Button variant="outlined">Open Modal</Button>
      {/* <Button onClick={disclosure.onOpen}>Open Modal</Button> */}
      <Modal
        // disclosure={disclosure}
        ariaTitle="Contact Us"
        ariaDescription="describedbyId"
        id="destination"
        trigger={<Button variant="primary">Open Modal</Button>}
      >
        <ModalHeader>
          <Text>Contact Us</Text>
        </ModalHeader>
        <ModalBody>
          <Stack height="fullVH">
            <Text>This is a Header</Text>
            <Text id="describedbyId">
              This is a sample paragraph for testing purposes. It includes several sentences to form a coherent and
              complete paragraph. The primary goal of this paragraph is to serve as an example, helping to test the
              formatting, structure, and overall appearance of text within a given context. This text also provides an
              opportunity to evaluate how well the paragraph fits into a broader document or interface, ensuring that it
              meets the necessary standards and requirements. By reviewing this sample paragraph, one can gain insights
              into the layout, readability, and visual appeal of the text, ultimately making any necessary adjustments
              to improve its quality and effectiveness.
            </Text>
            <SelectTest />
            <ButtonDropdownTest />
          </Stack>
        </ModalBody>
        <ModalFooter
          // primaryButton={{
          //   icon: <Icons.Mail />,
          //   children: 'Click',
          //   onClick: () => console.log('click')
          // }}
          primaryButton={reqProps => (
            <Button {...reqProps} icon={<Icons.Mail />} onClick={() => console.log('click')}>
              Click
            </Button>
          )}
          secondaryButton={reqProps => (
            <Button {...reqProps} icon={<Icons.Mail />} onClick={() => console.log('click')}>
              Click
            </Button>
          )}
        />
      </Modal>
    </>
  );
}
