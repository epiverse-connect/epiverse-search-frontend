import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import Grid from './Grid';
import MapCol from './MapCol';
import SearchCol from './SearchCol';
import React from 'react';
import LogoDataDotOrg from '../public/LogoDataDotOrg.png';
import GitHubCorner from './GitHubCorner';

function App() {
  return (
    <RecoilRoot>
      <div className="md:flex flex-col">
        <header className="grow-0 items-center text-center my-16">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Find the right tool for{' '}
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              your epidemiology task.
            </span>
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            There are a lot of tools out there. We created a custom, efficient,
            and small AI to help you find the right one.
          </p>
        </header>
        <Grid first={<SearchCol />} second={<MapCol />} />
        <LogoCloud />
      </div>
      <GitHubCorner />
    </RecoilRoot>
  );
}

export default App;

const LogoCloud = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none">
          <img
            alt="Transistor"
            // src="https://tailwindui.com/plus/img/logos/158x48/transistor-logo-gray-900.svg"
            src="https://github.com/epiverse-trace/epiverse-trace.github.io/blob/main/public/LogoDataDotOrg.png?raw=true"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <img
            alt="Reform"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/World_Health_Organization_Logo.svg/1024px-World_Health_Organization_Logo.svg.png"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
        </div>
      </div>
    </div>
  );
};
