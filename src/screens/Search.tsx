import React from 'react';
import ScreenLayout  from '../components/ScreenLayout';
import SearchBarLayout from '../components/SearchBarLayout';
import { SearchProvider } from '../context/SearchContext';
import SearchResultLayout from '../components/SearchResultLayout'

const Search = () => {

    return (
        <ScreenLayout> 
            <SearchProvider>
                <SearchBarLayout/>
                <SearchResultLayout/>
            </SearchProvider>
        </ScreenLayout>
    );
}


export default Search;