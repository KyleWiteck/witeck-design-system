import { Button, ChipRadioButton, ChipRadioGroup, Flex } from '@peopleticker/magnit-design/components';
import { useState } from 'react';

export function ChipRadioTest() {
  const [value, setValue] = useState('1');
  return (
    <Flex
      gap="4"
      alignItems="center"
      padding="2"
      border="1px"
      borderColor="border"
      borderRadius="base"
      element="form"
      onSubmit={e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log('chip radio values', Object.fromEntries(formData));
      }}
    >
      <ChipRadioGroup name="chip-radio-test" onChange={e => setValue(e.target.value)}>
        <ChipRadioButton value="1" checked={value === '1'}>
          First
        </ChipRadioButton>
        <ChipRadioButton value="2" checked={value === '2'}>
          Second
        </ChipRadioButton>
        <ChipRadioButton value="3" checked={value === '3'}>
          Third
        </ChipRadioButton>
      </ChipRadioGroup>
      <Button type="submit">Submit</Button>
    </Flex>
  );
}
