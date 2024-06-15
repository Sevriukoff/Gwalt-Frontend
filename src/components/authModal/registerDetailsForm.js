import ActionButton from '@/components/actionButton';
import { useForm } from 'react-hook-form';
import Input from '@/components/input';

const RegisterDetailsForm = ({ onSubmit, next }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm();

  const handleFormSubmit = async (data) => {
    await onSubmit(data, next);
  };

  return (
    <form onSubmit={ handleSubmit(handleFormSubmit) } className='space-y-4'>
      <div>
        <Input
          id='displayName'
          type='text'
          placeholder='Ваше отображаемое имя'
          className={ `mt-1 block w-full rounded-md shadow-sm ${ errors.displayName ? 'border-red-500' : 'border-gray-300' }` }
          { ...register('displayName', {
            required: 'Display name is required',
          }) }
        />
        { errors.displayName && <span className='text-red-500 text-sm'>{ errors.displayName.message }</span> }
      </div>
      <div>
        <Input
          id='age'
          type='number'
          placeholder='Ваш возраст'
          className={ `mt-1 block w-full rounded-md shadow-sm ${ errors.age ? 'border-red-500' : 'border-gray-300' }` }
          { ...register('age', {
            required: 'Age is required',
            min: {
              value: 1,
              message: 'Age must be at least 1',
            },
          }) }
        />
        { errors.age && <span className='text-red-500 text-sm'>{ errors.age.message }</span> }
      </div>
      <div>
        <select
          id='gender'
          className={ `mt-1 block w-full rounded-md shadow-sm ${ errors.gender ? 'border-red-500' : 'border-gray-300' }` }
          { ...register('gender', {
            required: 'Gender is required',
          }) }
        >
          <option value=''>Выберите ваш пол</option>
          <option value='male'>Мужской</option>
          <option value='female'>Женский</option>
          <option value='other'>Другой</option>
        </select>
        { errors.gender && <span className='text-red-500 text-sm'>{ errors.gender.message }</span> }
      </div>
      <ActionButton className='w-full h-[36px]' isOutline={ true } isLoading={ isSubmitting }
                    disabled={ !isValid || isSubmitting }>
        Зарегистрироваться
      </ActionButton>
    </form>
  );
};

export default RegisterDetailsForm;