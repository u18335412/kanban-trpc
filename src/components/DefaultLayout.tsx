import Head from 'next/head';
import { ReactNode, useEffect, useState } from 'react';
// import { ReactQueryDevtools } from 'react-query/devtools';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import SideBar from './SideBar';
import useTheme from '../data/useTheme';
import useAppStore from '~/data/useStore';
import { ToastContainer } from 'react-toastify';
import ModalManager from './ModalManager';
import 'react-toastify/dist/ReactToastify.min.css';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { theme } = useTheme();
  const { showSideBar, toggleSideBar } = useAppStore();
  const [stateTheme, setStateTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);
  const [parentRef] = useAutoAnimate<HTMLDivElement>();
  return (
    <>
      <Head>
        <title>Kanban</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={stateTheme}>
        <ToastContainer
          hideProgressBar
          toastClassName="text-sm dark:bg-very-dark-grey dark:text-white text-black font-medium [&>button]:m-2 dark:[&>button>*]:fill-white dark:[&>button>*]:stroke-white"
        />
      </div>
      <ModalManager />
      <div
        className={`flex max-h-screen antialiased  ${stateTheme} selection:text-main-purple selection:bg-white relative w-screen`}
        ref={parentRef}
      >
        {!showSideBar && (
          <button
            onClick={toggleSideBar}
            className="absolute flex items-center justify-center h-12 rounded-r-full bottom-8 fill-white  bg-main-purple hover:bg-main-purple(hover) w-14"
          >
            <img src="/assets/icon-show-sidebar.svg" alt="show sidebar" />
          </button>
        )}
        {showSideBar && <SideBar />}

        <main
          className=" w-full max-h-screen h-screen overflow-x-auto overflow-y-auto dark:bg-very-dark-grey bg-light-grey dark:text-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]
            [scrollbar-width:none] "
        >
          {children}
        </main>
      </div>
      {/* 
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )} */}
    </>
  );
};
