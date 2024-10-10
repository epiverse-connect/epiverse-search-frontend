import { atom } from 'recoil';

interface SearchQuery {
  query: string;
  filter: string;
  response: {
    results: SearchResult[];
  };
}

interface SearchResult {
  package: string;
  logo: string;
  website: string;
  source: string;
  vignettes: string[];
  relevance: number;
}

export const exampleSearch = atom({
  key: 'search-results',
  default: {
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
  } as SearchQuery,
});
