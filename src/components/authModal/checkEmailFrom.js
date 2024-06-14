import React from 'react';
import {useForm} from "react-hook-form";
import ActionButton from "@/components/actionButton";
import Input from "@/components/input";

const CheckEmailFrom = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm();

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
              id="email"
              type="email"
              placeholder="Ваша почта"
              className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>
        <ActionButton className="w-full h-[36px]" isOutline={true} isLoading={isSubmitting} disabled={!isValid || isSubmitting}>Продолжить</ActionButton>
        <p className="text-xs text-[#999]">
          Регистрируясь, вы соглашаетесь с тем, что мы можем использовать предоставленные
          вами данные для регистрации и отправки вам уведомлений о наших продуктах и услугах.
          Вы можете отказаться от подписки на уведомления в любое время в своих настройках.
        </p>
      </form>
  );
};

export default CheckEmailFrom;