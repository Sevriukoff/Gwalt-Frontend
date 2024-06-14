'use client'

import * as Dialog from '@radix-ui/react-dialog'
import React from 'react';
import MaskedIcon from "@/components/maskedIcon";
import useModal from "@/hooks/useModal";

const Modal = ({
                modalName = '',
                title = '',
                description = '',
                children,
                height = 450,
                isOpen = false,
                onChange = (isOpen) => console.log()
              }) => {
  const { isOpen:isOpenInternal, close } = useModal(modalName);
  const handleChange = (isOpen) => {
    if (!isOpen)
      close();

    onChange(isOpen);
  }

  return (
      <Dialog.Root open={isOpenInternal} defaultOpen={isOpenInternal} onOpenChange={handleChange}>
        <Dialog.Portal>
          <Dialog.Overlay className='z-20 bg-gray-200/90 backdrop-blur-[1px] fixed inset-0' />
          <Dialog.Content style={{height}}
                          className='flex flex-col justify-center z-20 fixed w-[90vw] h-auto max-h-[85vh] max-w-[450px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
                                      drop-shadow-md border border-gray-300 rounded-md bg-gray-100 p-5 focus:outline-none'>
            <div className='border-b pb-4 mb-4 flex flex-col items-center justify-center gap-1'>
              <Dialog.Title className='text-2xl text-center font-medium'>
                {title}
              </Dialog.Title>
              <Dialog.Description className='text-sm text-gray-600 leading-normal text-center'>
                {description}
              </Dialog.Description>
            </div>
            <div>
              {children}
            </div>
            <Dialog.Close asChild={true}>
              <button className='absolute top-2 right-2 inline-flex bg-transparent hover:bg-white rounded-full p-2 group appearance-none items-center justify-center'>
                <MaskedIcon src='/close.svg' className='w-3 h-3 text-textDefault group-hover:text-accentPurple'/>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
  );
};

export default Modal;