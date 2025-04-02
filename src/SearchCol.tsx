import React, { useState } from 'react';

const SearchCol = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState({});

  const handleSearch = async () => {
    if (process.env.REACT_APP_BACKEND) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/?query=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();

      if (!data.error) {
        setResults(data);
      }
    } else {
      alert(
        'No backend URL found. Please set REACT_APP_BACKEND in your .env file.'
      );
    }
  };

  return (
    <div>
      <form className="max-w-md mx-auto">
        {/* <h2 className="text-xl font-bold text-center my-4">
          Type your task here
        </h2> */}
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Epidemiological task here..."
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
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-35"
            disabled={!searchQuery}
          >
            Search
          </button>
        </div>
        <SearchResults results={results} />
      </form>
    </div>
  );
};

export default SearchCol;

interface SearchResultsProps {
  // eslint-disable-next-line
  results: any;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  if (JSON.stringify(results) != '{}') {
    return (
      <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdown-button"
        >
          {results.response.results.slice(0, 5).map(
            (
              result: {
                package: string;
                website: string;
                source: string;
                relevance: number;
                logo: (string | undefined)[];
              },
              index: React.Key | null | undefined
            ) => (
              <SearchResult
                key={index}
                title={result.package}
                url={result.website[0] || result.source}
                score={result.relevance}
                logo={result.logo[0]}
              />
            )
          )}
        </ul>
      </div>
    );
  } else {
    return <></>;
  }
};

const SearchResult = ({
  title,
  url,
  logo,
  score,
}: {
  title: string;
  url: string;
  logo?: string;
  score: number;
}) => {
  return (
    <li>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        {logo && (
          <img
            src={logo}
            alt={`Logo of ${title}`}
            className="w-auto h-max-4 h-4 mx-2"
          />
        )}
        {title}
        <span className="grow"></span>
        {/* <code className="ml-2 text-xs text-gray-400">{filename}</code> */}
        <span className="inline-flex items-center rounded-full bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600">
          {score.toString().slice(0, 5)}
        </span>
      </a>
    </li>
  );
};
