import React, { useState } from 'react';
import exampleSearchData from '../src/example-search.json';

const SearchCol = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState({});
  const [first, setFirst] = useState(true);

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
      <form className="w-[90%] mx-auto mt-16 text-lg">
        <label htmlFor="default-search" className="sr-only">
          Search bar
        </label>
        <div className="relative">
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
      <div className="py-8 sm:px-4">
        <h2 className="text-lg">
          Search results 1-{results.response.results.length}
        </h2>
        <div className="z-10 divide-y divide-gray-100 sm:-mx-16 my-4">
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
    <li className="mx-auto">
      <a
        href={url || source}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <span className="text-sm">
          <div className="w-32 bg-gray-200 rounded-full h-1.5 mb-2 dark:bg-gray-700">
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
            <a href={url} className="mx-4 underline">
              Website
            </a>

            <a href={source} className="mx-4 underline">
              Source
            </a>

            <a href={`${source}/issues`} className="mx-4 underline">
              Bug Tracker
            </a>

            {vignettes && (
              <span className="mx-4">
                Vignette{' '}
                {vignettes.map((vignette, index) => (
                  <a href={vignette} key={vignette} className="underline mx-1">
                    {index + 1}
                  </a>
                ))}
              </span>
            )}
          </p>
        </span>
        {logo && (
          <img
            src={logo}
            alt={`Logo of ${title} package`}
            className="h-max-4 w-[80px] mx-2"
          />
        )}
      </a>
    </li>
  );
};
