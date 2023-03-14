import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FC } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import useAppStore from '~/data/useStore';
import Button from './Button';
import DropDown from './DropDown';
import Logo from './Logo';
import { ModalType } from './ModalManager';

interface HeaderProps {
  title: string;
  columnLength: number;
}

const Header: FC<HeaderProps> = ({ title, columnLength }) => {
  const [parent] = useAutoAnimate<HTMLDivElement>();
  const { setSelectedModal, showSideBar, setDelete } = useAppStore();

  const DropDownItems = [
    {
      text: 'Edit Board',
      action: () => {
        setSelectedModal(ModalType.EditBoard);
      },
    },
    {
      text: 'Delete Board',
      action: () => {
        setSelectedModal(ModalType.DeleteModal);
        setDelete('board');
      },
      text_color: 'text-red',
    },
  ];

  return (
    <div className="flex items-center justify-between h-24 px-6 bg-white dark:bg-dark-grey border-b border-lines(light) dark:border-lines(dark) ">
      <div ref={parent} className="flex items-center h-full">
        {!showSideBar && (
          <div className="flex relative h-full items-center border-r dark:border-lines(dark) border-lines(light)">
            <span className="mr-8 ">
              <Logo />
            </span>
          </div>
        )}
        <h2 className={`text-xl min-w-max font-bold ${!showSideBar && 'ml-8'}`}>
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-x-6">
        <Button
          disabled={columnLength === 0 ? true : false}
          icon={<AiOutlinePlus />}
          onClick={() => setSelectedModal(ModalType.NewTask)}
          className=" bg-main-purple hover:bg-main-purple(hover)"
        >
          <span className="hidden md:flex"> Add New Task</span>
        </Button>
        <div>
          <DropDown icon={<BsThreeDotsVertical />} items={DropDownItems} />
        </div>
      </div>
    </div>
  );
};

export default Header;
