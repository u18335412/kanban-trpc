const NotFoundPage = () => {
  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-black/80 text-9xl dark:text-medium-grey">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn&apos;t find this page.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            But don&apos;t worry, you can find plenty of other things on our
            homepage.
          </p>
          <a
            rel="noopener noreferrer"
            href="#"
            className="px-8 py-3 font-semibold text-white rounded dark:bg-violet-400 bg-main-purple"
          >
            Back to homepage
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;