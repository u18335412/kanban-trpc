import Head from 'next/head';
import { ReactNode } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import SideBar from './SideBar';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Kanban</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex max-h-screen">
        <SideBar />
        <main className="w-full min-h-screen overflow-x-auto overflow-y-auto bg-black/20">
          {children}
        </main>
      </div>
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
};
