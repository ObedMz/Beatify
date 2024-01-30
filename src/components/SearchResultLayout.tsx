import React, {  useEffect, useState } from 'react';
import { useSearch } from '../context/SearchContext';
import {FlatList , StyleSheet, SafeAreaView, StatusBar, View, ActivityIndicator} from 'react-native';
import SongComponent from './SongComponent';
import AlbumComponent from './AlbumComponent';
import ArtistComponent from './ArtistComponent';
import PlayListComponent from './PlayListComponent';
import { URL_ROUTE } from '../utils/PlayerFunctions';



const SearchResultLayout: React.FC = () => {
  const { loading, setLoading, search, setSearchResults, selectedOption, searchResults } = useSearch();
  const urls = ['/search', '/search/albums', '/search/artist', '/search/playlist'];
  const [page, setPage] = useState(1);

  const renderSearchResult = ({ item }: { item: SearchResult }) => {
    let content = null;
  
    if ((selectedOption == 'Todo' || selectedOption === 'Canción') && item.type === 'SONG') {
        content = <SongComponent song={item as Song}/>;
    } else if ((selectedOption == 'Todo' || selectedOption === 'Artista') && item.type === 'ARTIST') {
        content = <ArtistComponent artist={item as ArtistData}/>;
    }else if ((selectedOption == 'Todo' || selectedOption === 'Album') && item.type === 'ALBUM') {
        content = <AlbumComponent album={item as Albums}/>;
    }else if ((selectedOption == 'Todo' || selectedOption === 'PlayList') && item.type === 'PLAYLIST') {
        content = <PlayListComponent playlist={item as Playlist}/>;
    }
    return (
      <View>
        {content}
      </View>
    );
  };
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="#ffff" />
      </View>
    );
  };
  useEffect(()=> {
    setPage(1)
  }, [search])
  const fetchData = async () => {
    try {
      if(page >= urls.length)
          return;
      
      setLoading(true)
      const response = await fetch(URL_ROUTE + urls[page] + '?query=' + search);
      if(!response.ok){
          console.log('error al realizar el fetch de datos.')
          setLoading(false)
          return
      }
      const formatted = await response.json();
      const data: SearchResult[] = formatted.data;
      const totalItems = 10;
      let itemsAdded = 0;
      const addItemsInterval = setInterval(() => {
          if (itemsAdded < totalItems) {
              const item = data[itemsAdded];
              if(item) {
                setSearchResults((prevSearchResults: SearchResult[]) => prevSearchResults.concat(item));   
                itemsAdded++;
              }
          } else {
              setLoading(false)
              clearInterval(addItemsInterval);
          } 
      }, 250)

  }catch(err) {
      console.log(err)
      return [];
  }
  };
  const loadMoreData = async () => {
    if (selectedOption === 'Todo') {
      if(!loading){
          await fetchData();
          if (page < urls.length)
              setPage((prevPage) => prevPage + 1);
      }
  }
  };


  return (
    <SafeAreaView style={styles.slider}>
        <FlatList
            data={searchResults}
            keyExtractor={(item, index) => `${item.type}-${index}`}
            renderItem={renderSearchResult}
            ListFooterComponent={renderFooter}
            onEndReached={search === '' ? undefined : loadMoreData}
            onEndReachedThreshold={search === '' ? undefined : 0.6 }
            />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  slider: {
    paddingBottom: ((StatusBar.currentHeight == undefined ? 0 : StatusBar.currentHeight) + 100),
  },
container: {
    backgroundColor: '#1C1C2A',
    flex: 1,
    paddingTop: StatusBar.currentHeight,
},
contentBox: {
  backgroundColor: '#5d3954',
  padding: 15,
  margin: 10,
},
text: {
    marginTop:10,
    color: 'white',
    fontSize: 16,
    fontWeight: '100',
},
});


export default SearchResultLayout;
