import {ScrollView,Pressable , View, Text} from 'react-native';
import { SearchBar } from '@rneui/themed';
import { useSearch } from '../context/SearchContext';
import { useEffect } from 'react';
import { URL_ROUTE, getColorHex, getSongURL } from '../utils/PlayerFunctions';

const SearchBarLayout : React.FC = () => {
    const { setLoading , selectedOption, search, setSelectedOption, setSearch , setSearchResults, searchResults } = useSearch();
    const urls = ['/search', '/search/albums', '/search/artist', '/search/playlist'];

    const updateSearch = (search : string) => {
        setSearch(search);
    };

    const handleOptionSelect = (option : string) => {
        setSelectedOption(option); 
    };





    const getIndexSelected = (): number => {
        switch (selectedOption) {
          case 'Album':
            return 1;
          case 'Artista':
            return 2;
            case 'PlayList':
                return 3;
          default:
            return 0;
        }
      };


      useEffect(() => {
        if(search == '')
            return;

        if(!(selectedOption == 'Todo' || selectedOption == 'Canción'))
            return;
        
        if(searchResults.length >= 5 || searchResults.length == 0)
            return;

        const item = searchResults[searchResults.length -1];
        if(item.type != 'SONG')
            return;
        (item as Song).loadData = async () => {
            await getColorHex((item as Song));
            await getSongURL((item as Song));
        }
        Promise.resolve( (item as Song).loadData()).then(() =>  (item as Song));        
      }, [searchResults])


    const handleSearch = async () => {
        //search data here.
        setSearchResults([]);
        try {
            setLoading(true)
            const index = getIndexSelected();
            const response = await fetch(URL_ROUTE + urls[index] + '?query=' + search);
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
                    setSearchResults((prevSearchResults: SearchResult[]) => prevSearchResults.concat(item));
                    itemsAdded++;
                } else {
                    setLoading(false);
                    clearInterval(addItemsInterval);
                } 
            }, 250)

        }catch(err) {
            console.log(err)
        }
    };

    return (
        <View>
            <SearchBar placeholder="Busca una canción, artista, album..."
                onChangeText={updateSearch}
                value={search}
                onSubmitEditing={handleSearch}
                containerStyle={{ backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
                inputContainerStyle={{ backgroundColor: '#2C2C41', borderRadius: 10 }}/>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 5, alignContent: 'center'}}>
                {["Todo", "Canción", "Album", "Artista", "PlayList"].map((option) => (
                    <Pressable
                        key={option}
                        onPress={() => handleOptionSelect(option)}
                        style={[{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: selectedOption === option ? '#B70232' : '#670D27',
                    transform: [{scale: selectedOption === option ? 1.03 : 1}],
                    borderRadius: 20,
                    marginHorizontal: 6,
                            }]}>
                        <Text style={{ color: '#fff', textAlign: 'center'  }}>{option}</Text>
                    </Pressable>
                ))}
            </ScrollView>
      </View>
    )

}

export default SearchBarLayout