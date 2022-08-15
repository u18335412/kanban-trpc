import { ReactNode, FC, Fragment } from 'react';
import { Transition } from '@headlessui/react';

const TransitionChild: FC<{
  children: ReactNode;
  isOpen?: boolean;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
}> = ({
  children,
  enter = 'ease-out duration-300',
  enterFrom = 'opacity-0 scale-95',
  enterTo = 'opacity-100 scale-100',
  leave = 'ease-in duration-200',
  leaveFrom = 'opacity-100 scale-100',
  leaveTo = 'opacity-0 scale-95',
}) => {
  return (
    <Transition.Child
      as={Fragment}
      enter={enter}
      enterFrom={enterFrom}
      enterTo={enterTo}
      leave={leave}
      leaveFrom={leaveFrom}
      leaveTo={leaveTo}
    >
      {children}
    </Transition.Child>
  );
};

export default TransitionChild;
