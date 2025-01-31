import { Checkbox } from '@peopleticker/magnit-design/components';
import { useForm } from 'react-hook-form';

type FormValues = {
  agree: boolean;
};

export default function CheckBoxTest() {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      agree: false
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Checkbox size="lg" disabled label="Disabled" />
      <Checkbox
        size="lg"
        {...register('agree', { onChange: e => console.log(e.target.checked) })}
        label="I agree to the terms and conditions"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
