import React, { useState } from 'react';
import exampleSearchData from '../src/example-search.json';

const SearchCol = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState({});
  const [first, setFirst] = useState(true);
  const [about, showAbout] = useState(false);

  const handleSearch = async () => {
    if (process.env.REACT_APP_BACKEND) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/?query=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();

      if (!data.error) {
        setResults(data);
        setFirst(false);
      }
    } else {
      alert(
        'No backend URL found. Please set REACT_APP_BACKEND in your .env file.'
      );
    }
  };

  return (
    <>
      <div className="mt-6 mb-2 mx-2 font-normal">
        {about && (
          <div className="relative max-w-xl mx-auto mb-4">
            <button
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => {
                showAbout(!about);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#0F1729"
                  fillRule="evenodd"
                  d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <h2 className="font-semibold text-lg">About this search</h2>
            <p className="">
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean. A small river named Duden flows by their
              place and supplies it with the necessary regelialia. It is a
              paradisematic country, in which roasted parts of sentences fly
              into your mouth. Even the all-powerful Pointing has no control
              about the blind texts it is an almost unorthographic life 
            </p>
          </div>
        )}
        <div className="flex">
          <span className="w-[65px]"></span>

          <span className="underline mr-2 hover:opacity-60 cursor-pointer px-4 py-2">
            Packages
          </span>
          <span className="text-gray-300 mr-2 px-4 py-2 cursor-not-allowed">
            Articles
          </span>
          <span className="text-gray-300 mr-2 px-4 py-2 cursor-not-allowed">
            Recent builds
          </span>
          <span className="flex-grow"></span>
          <button
            className="px-4 py-2 underline cursor-pointer"
            onClick={() => {
              showAbout(!about);
            }}
          >
            About this search
          </button>
        </div>
      </div>
      <form className="w-full text-lg">
        <label htmlFor="default-search" className="sr-only">
          Search bar
        </label>
        <div className="relative flex">
          <span className="w-[65px]"></span>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 text-gray-900 border border-black focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            onBlur={(e) => {
              e.preventDefault();
              setResults({});
            }}
            className="button absolute h-[62px] end-0 bottom-0 bg-[#00205C] disabled:opacity-35"
            disabled={!searchQuery}
          >
            <svg
              className="w-8 h-8 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
        <SearchResults results={results} first={first} />
      </form>
      <div className="static bottom-0 right-0 text-center">
        <button
          onClick={() => {
            if (JSON.stringify(results) == '{}') {
              setResults(exampleSearchData);
              setFirst(false);
            } else {
              setResults({});
            }
          }}
          className="button mt-16 end-2.5 bottom-2.5 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-35"
        >
          {JSON.stringify(results) == '{}'
            ? 'Set example results'
            : 'Remove example results'}
        </button>
      </div>
    </>
  );
};

export default SearchCol;

interface SearchResultsProps {
  // eslint-disable-next-line
  results: any;
  first: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, first }) => {
  if (JSON.stringify(results) != '{}') {
    return (
      <div className="py-8">
        <div className="flex">
          <span className="w-[65px]"></span>
          <h2 className="text-lg">
            Search results 1-{results.response.results.length}
          </h2>
        </div>
        <div className="z-10 divide-y divide-gray-100 my-4">
          <ul aria-labelledby="dropdown-button">
            {results.response.results.slice(0, 5).map(
              (
                result: {
                  package: string;
                  title: string;
                  description: string;
                  logo?: string;
                  website?: string;
                  source?: string;
                  vignettes?: string[];
                },
                index: React.Key | null | undefined
              ) => (
                <SearchResult
                  key={index}
                  pkg={result.package}
                  title={result.title}
                  description={result.description}
                  logo={result.logo}
                  url={result.website}
                  source={result.source}
                  vignettes={result.vignettes}
                />
              )
            )}
          </ul>
        </div>
      </div>
    );
  } else {
    if (first) {
      return <></>;
    } else {
      return (
        <div className="py-8 px-4">
          <h2 className="text-lg">
            Sorry, your search has not produced any results. Try changing your
            search terms
          </h2>
        </div>
      );
    }
  }
};

const SearchResult = ({
  pkg,
  title,
  description,
  logo,
  url,
  source,
  vignettes,
}: {
  pkg: string;
  title: string;
  description: string;
  logo?: string;
  url?: string;
  source?: string;
  vignettes?: string[];
}) => {
  const score = Math.random();

  return (
    <a
      href={url || source}
      target="_blank"
      rel="noreferrer"
      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <li className="flex hover:bg-gray-100">
        <div className="flex w-[65px] justify-center align-middle items-center">
          {logo && (
            <img
              src={logo}
              alt={`Logo of ${title} package`}
              className="h-[auto] w-[40px]"
            />
          )}
        </div>
        <div className="w-full text-sm">
          <div className="w-16 bg-gray-200 rounded-full h-1.5 mb-2 dark:bg-gray-700">
            <div
              className="bg-[#F4A81D] h-1.5 rounded-full dark:bg-blue-500"
              style={{ width: `${score * 100}%` }}
            ></div>
          </div>
          <p className="font-semibold">
            {pkg}: {title}
          </p>
          <p className="font-normal">{description}</p>
          <p className="pt-1 pb-4">
            {url ? (
              <>
                <a href={source} className="hover:opacity-60 underline">
                  Source
                </a>
                <a
                  href={`${source}/issues`}
                  className="hover:opacity-60 mx-4 underline"
                >
                  Bug Tracker
                </a>
              </>
            ) : (
              <a
                href={`${source}/issues`}
                className="hover:opacity-60 mr-4 underline"
              >
                Bug Tracker
              </a>
            )}
            {vignettes && (
              <span className="">
                Vignette{' '}
                {vignettes.map((vignette, index) => (
                  <a
                    href={vignette}
                    key={vignette}
                    className=" hover:opacity-60 underline mr-1"
                  >
                    {index + 1}
                  </a>
                ))}
              </span>
            )}
          </p>
        </div>
      </li>
    </a>
  );
};
