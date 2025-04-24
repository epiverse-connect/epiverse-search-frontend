import SearchCol from './SearchCol';
import React from 'react';
import Header from './Header';

function App() {
  return (
    <>
      <div className="md:flex flex-col dark:bg-gray-900 dark:text-gray-50 p-4 max-w-6xl mx-auto">
        <Header />
        <body className="w-full">
          <SearchCol />
        </body>
      </div>
      {/* <GitHubCorner /> */}
    </>
  );
}

export default App;
