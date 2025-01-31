import { Button, NotFoundUI, Stack } from '@KyleWiteck/witeck-design/components';

import './App.css';
import { AccordionTest } from './components/AccordionTest';
import ButtonDropdownTest from './components/ButtonDropdownTest';
import { CalloutMesasgeTest } from './components/CalloutMessageTest';
import CheckBoxTest from './components/CheckBoxTest';
import { ChipRadioTest } from './components/ChipRadioTest';
import { IconsTest } from './components/IconsTest';
import ModalTest from './components/ModalTest';
import PaginationTest from './components/PaginationTest';
import SelectTest from './components/SelectTest';
import { TooltipTest } from './components/TooltipTest';

function App() {
  return (
    <Stack spacing="8" height="fullVH">
      <ChipRadioTest />
      <AccordionTest />
      <TooltipTest />
      <IconsTest />
      <NotFoundUI />
      <CalloutMesasgeTest />
      <ButtonDropdownTest />
      <SelectTest />
      <PaginationTest />
      <ModalTest />
      <CheckBoxTest />
      <Button variant="text">test</Button>
    </Stack>
  );
}

export default App;
