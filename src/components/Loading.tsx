import { FC } from 'react';
import { ImSpinner8 } from 'react-icons/im';

const Loading: FC = () => {
  return <ImSpinner8 className="w-5 h-5 white animate-spin" />;
};

export default Loading;
