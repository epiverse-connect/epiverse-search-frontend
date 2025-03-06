import { RecoilRoot } from 'recoil';
import Grid from './Grid';
import MapCol from './MapCol';
import SearchCol from './SearchCol';
import React, { useEffect, useState } from 'react';
import GitHubCorner from './GitHubCorner';

function App() {
  return (
    <RecoilRoot>
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
        {/* <Grid first={} second={<></>} /> */}
        <LogoCloud />
      </div>
      <GitHubCorner />
    </RecoilRoot>
  );
}

export default App;

const LogoCloud = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none">
          <img
            alt="Data Dot Org"
            src="https://github.com/epiverse-trace/epiverse-trace.github.io/blob/main/public/LogoDataDotOrg.png?raw=true"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
          />
          <img
            alt="World Health Organization"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/World_Health_Organization_Logo.svg/1024px-World_Health_Organization_Logo.svg.png"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
        </div>
      </div>
      <CrossRefData />
    </div>
  );
};

const CrossRefData: React.FC = () => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://api.crossref.org/works/');
        const text = await response.text();
        setData(text);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData('Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">CrossRef Data</h2>
      <pre className="text-sm overflow-auto">{data}</pre>
    </div>
  );
};
