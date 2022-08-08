import { ReactNode, FC, Fragment } from 'react';
import { Transition as HeadlessUiTransition } from '@headlessui/react';

const Transition: FC<{
  children: ReactNode;
  isOpen: boolean;
}> = ({ children }) => {
  return (
    <HeadlessUiTransition
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      {children}
    </HeadlessUiTransition>
  );
};

export default Transition;
