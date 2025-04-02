import SearchCol from './SearchCol';
import React from 'react';
import GitHubCorner from './GitHubCorner';

function App() {
  return (
    <>
      <div className="md:flex flex-col dark:bg-gray-900 dark:text-gray-50">
        <header className="grow-0 items-center text-center my-16">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Epiverse{' '}
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              Tool Search
            </span>
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 m-2 lg:m-8">
            Please describe the epidemiological task you would like the tools
            for.
          </p>
        </header>
        <SearchCol />
      </div>
      <GitHubCorner />
    </>
  );
}

export default App;
