import Head from 'next/head';
import { ReactNode } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import SideBar from './SideBar';
import useTheme from '../data/useTheme';
type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { theme } = useTheme();
  return (
    <>
      <Head>
        <title>Kanban</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`flex max-h-screen ${theme}`}>
        <SideBar />
        <main
          className="w-full max-h-screen h-screen overflow-x-auto overflow-y-auto dark:bg-very-dark-grey bg-light-grey dark:text-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]
        [scrollbar-width:none]"
        >
          {children}
        </main>
      </div>
      {/* {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )} */}
    </>
  );
};
