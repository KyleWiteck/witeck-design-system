import { Center, ComboBox, Icons, Select, SelectOptionLabel, Stack } from '@KyleWiteck/witeck-design/components';
import { addUniqueOptionBasedOnKey, filterOptionsBySearchTerm } from '@KyleWiteck/witeck-design/utils';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const options = [
  { id: 1, display: 'Option 1', data: ['1', '2', '3'] },
  { id: 2, display: 'Option 2', data: { 1: '1', 2: '3', 3: '3' } },
  { id: 3, display: 'Option 3', data: 3 }
];

type Options = typeof options;

const SelectTest = () => {
  const [filteredOptions, setFilteredOptions] = useState<Options>(options);
  const { handleSubmit, watch, setValue, control } = useForm<{
    mySelect?: Options[0];
    myOtherSelect: Options;
  }>({
    defaultValues: {
      // mySelect: { id: 1, display: 'Option 1', data: ['1', '2', '3'] },
      // [
      //   { id: 1, display: 'Option 1', data: ['1', '2', '3'] },
      //   { id: 2, display: 'Option 2', data: { 1: '1', 2: '3', 3: '3' } }
      // ],
      myOtherSelect: []
    }
  });

  const myOtherSelect = watch('myOtherSelect');
  console.log('myOtherSelect', myOtherSelect);
  const onSubmit = (data: unknown) => {
    console.log('Form Data:', data);
  };

  return (
    <Stack element="form" spacing="10" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="mySelect"
        control={control}
        render={({ field: { value, disabled, name, ref } }) => (
          <Select
            ref={ref}
            optionIdKey="id"
            value={value}
            // disabled
            disabled={disabled}
            name={name}
            hasError={false}
            options={options}
            onSelect={option => {
              setValue('mySelect', option);
            }}
            isLoading={false}
            renderOptionLabel={opt => {
              return (
                <SelectOptionLabel display="flex" alignItems="center">
                  {opt?.display}{' '}
                  <Center boxSize="5">
                    <Icons.Gear boxSize="4" />
                  </Center>
                </SelectOptionLabel>
              );
            }}
          />
        )}
      />
      <Controller
        name="myOtherSelect"
        control={control}
        render={({ field: { value, disabled, name, ref } }) => (
          <ComboBox
            ref={ref}
            optionIdKey="id"
            value={value}
            // disabled
            disabled={disabled}
            name={name}
            options={filteredOptions}
            onFilterChange={val => {
              const updatedOptions = filterOptionsBySearchTerm({
                options,
                searchTerm: val,
                key: 'display',
                variant: 'includes'
              });
              setFilteredOptions(val === '' ? options : updatedOptions);
            }}
            onClearInputButton={() => {
              setFilteredOptions(options);
              setValue('myOtherSelect', []);
            }}
            onSelect={option => {
              setValue('myOtherSelect', [...myOtherSelect, option]);
            }}
            onRemove={option => {
              setValue(
                'myOtherSelect',
                addUniqueOptionBasedOnKey({ current: myOtherSelect, newItem: option, key: 'id' })
              );
            }}
            isMultiSelectable
            // isLoading
            renderOptionLabel={opt => {
              if (!opt?.display) return null;
              return (
                <SelectOptionLabel display="flex" alignItems="center">
                  {opt?.display}{' '}
                  <Center boxSize="5">
                    <Icons.Gear boxSize="4" />
                  </Center>
                </SelectOptionLabel>
              );
            }}
          />
        )}
      />
    </Stack>
  );
};

export default SelectTest;
