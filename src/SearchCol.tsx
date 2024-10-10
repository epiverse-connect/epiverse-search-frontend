import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SearchContext } from './SearchContext';
import React, { useContext } from 'react';
import { exampleSearch } from './atoms';

const SearchCol = () => {
  return (
    <div>
      <SearchBar />
    </div>
  );
};

export default SearchCol;

const SearchBar = () => {
  const [showSearchResults, setShowSearchResults] = React.useState(false);
  const setSearchResults = useSetRecoilState(exampleSearch);

  return (
    <div>
      <form className="max-w-md mx-auto">
        <h2 className="text-xl font-bold text-center my-4">
          By asking a question
        </h2>
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
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setSearchResults({
                query:
                  'how to estimate outbreak probability of dengue in colombia in next three months',
                filter: 'epiverse',
                response: {
                  results: [
                    {
                      package: 'epidemics',
                      logo: 'https://epiverse-trace.github.io/epidemics/logo.svg',
                      website: 'https://epiverse-trace.github.io/epidemics',
                      source: 'https://github.com/epiverse-trace/epidemics',
                      vignettes: [
                        'https://epiverse-trace.github.io/epidemics/articles/modelling_interventions.html',
                        'https://epiverse-trace.github.io/epidemics/articles/modelling_multiple_interventions.html',
                      ],
                      relevance: 0.987,
                    },
                    {
                      package: 'finalsize',
                      logo: 'https://epiverse-trace.github.io/finalsize/logo.svg',
                      website: 'https://epiverse-trace.github.io/finalsize',
                      source: 'https://github.com/epiverse-trace/finalsize',
                      vignettes: [],
                      relevance: 0.643,
                    },
                    {
                      package: 'cfr',
                      logo: 'https://epiverse-trace.github.io/cfr/logo.svg',
                      website: 'https://epiverse-trace.github.io/cfr',
                      source: 'https://github.com/epiverse-trace/cfr',
                      vignettes: [],
                      relevance: 0.987,
                    },
                    {
                      package: 'epiparameter',
                      logo: 'https://epiverse-trace.github.io/epiparameter/logo.svg',
                      website: 'https://epiverse-trace.github.io/epiparameter',
                      source: 'https://github.com/epiverse-trace/epiparameter',
                      vignettes: [],
                      relevance: 0.643,
                    },
                  ],
                },
              });
              setShowSearchResults(true);
            }}
            onBlur={(e) => {
              e.preventDefault();
              setShowSearchResults(false);
              setSearchResults({
                query: '',
                filter: '',
                response: {
                  results: [
                    {
                      package: 'example',
                      logo: '',
                      website: '',
                      source: '',
                      vignettes: ['example'],
                      relevance: 0,
                    },
                  ],
                },
              });
            }}
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
        <SearchResults show={showSearchResults} />
      </form>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
interface showSearchResultsProps {
  show: boolean;
}

const SearchResults: React.FC<showSearchResultsProps> = ({ show }) => {
  const exampleSearchResults = useRecoilValue(exampleSearch);

  if (show) {
    return (
      <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdown-button"
        >
          {exampleSearchResults.response.results.map((result) => (
            <SearchResult key={result.package} title={result.package} />
          ))}
        </ul>
      </div>
    );
  } else {
    return <></>;
  }
};

const SearchResult = ({ title }: { title: string }) => {
  return (
    <li>
      <button
        type="button"
        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        {title}
      </button>
    </li>
  );
};
