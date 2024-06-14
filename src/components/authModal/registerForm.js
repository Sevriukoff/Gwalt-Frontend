import React from 'react';
import Input from "@/components/input";
import ActionButton from "@/components/actionButton";
import {useForm} from "react-hook-form";

const RegisterForm = ({ email, onSubmit }) => {
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, getValues } = useForm();

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
              id="email"
              type="email"
              value={email}
              readOnly
              className="mt-1 block w-full rounded-md shadow-sm border-gray-300"
          />
        </div>
        <div>
          <Input
              id="password"
              type="password"
              placeholder="Ваш пароль"
              className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long'
                }
              })}
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>
        <div>
          <Input
              id="confirmPassword"
              type="password"
              placeholder="Подтвердите пароль"
              className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('confirmPassword', {
                required: 'Password confirmation is required',
                validate: (value) => value === getValues('password') || 'Passwords do not match'
              })}
          />
          {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
        </div>
        <ActionButton className="w-full h-[36px]" isOutline={true} isLoading={isSubmitting} disabled={!isValid | isSubmitting}>Зарегистрироваться</ActionButton>
      </form>
  );
};

export default RegisterForm;