import SearchCol from './SearchCol';
import React from 'react';
import Header from './Header';

// Fix for: Property '_env_' does not exist on type 'Window & typeof globalThis'.
// Add declaration for window._env_
declare global {
  interface Window {
    _env_?: {
      API_URL?: string;
    };
  }
}
function App() {
  return (
    <>
      <div className="md:flex flex-col dark:bg-gray-900 dark:text-gray-50 p-4 max-w-6xl mx-auto">
        <Header />
        <div className="w-full">
          <SearchCol />
        </div>
      </div>
      {/* <GitHubCorner /> */}
    </>
  );
}

export default App;
