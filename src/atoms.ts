import { atom } from 'recoil';
import exampleMapJson from './example-map.json';

export interface SearchQuery {
  query: string;
  filter: string;
  response: {
    results: SearchResult[];
  };
}

export interface SearchResult {
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

interface MapStructure {
  results: number;
  data: MapItem[];
}

interface MapItem {
  package: string;
  logo: string;
  website: string;
  source: string;
  vignettes: string[];
  coord1: number;
  coord2: number;
}

export const exampleMapAtom = atom({
  key: 'map-results',
  default: exampleMapJson as MapStructure,
});
