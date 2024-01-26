import React from 'react';
import { Image, View, Text, StyleSheet , Pressable } from 'react-native';

interface ArtistComponent {
    artist: ArtistData;
}


const handleSongPress = async (videoId : string) => {
    try {
      console.log('reproducing song from ', videoId)
    } catch (error) {
      console.error('Error en handleSongPress:', error);
    }
  };
const ArtistComponent: React.FC<ArtistComponent> = ({ artist }) => {
  return (

        <View style={styles.itemContainer}>
          <Pressable style={styles.container} onPress={() => handleSongPress(artist.artistId)}>
          <Image
            style={styles.thumbnail}
            source={{ uri: artist.thumbnails[0].url }}
            resizeMode='cover'/>
            <View>
            <Text style={styles.title}>
              {artist.name.length > 30 ? `${artist.name.substring(0, 30 - 3)}...` : artist.name}
            </Text>
            </View>
    
          </Pressable>
    </View>
  
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },
    thumbnail: {
      width: 70,
      height: 70,
      borderRadius: 100,
      marginRight: 20,
    },
    title: {
      maxWidth: 300,
      overflow: 'hidden',
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
    artist: {
      fontSize: 12,
      color: '#697689'
    },
    type: {
      fontSize: 12,
      color: 'gray',
    },
  });
  
export default ArtistComponent;
