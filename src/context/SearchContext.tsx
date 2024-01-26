import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextProps {
  selectedOption: string;
  search: string;
  loading: boolean;
  setLoading: (option: boolean) => void;
  searchResults: SearchResult[];
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  setSelectedOption: (option: string) => void;
  setSearch: (text: string) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch debe ser utilizado dentro de un proveedor de SearchContext');
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState('Todo');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const value = {
    loading,
    setLoading,
    selectedOption,
    search,
    setSelectedOption,
    setSearch,
    searchResults,
    setSearchResults
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};