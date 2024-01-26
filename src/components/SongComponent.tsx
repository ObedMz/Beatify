import React from 'react';
import { Image, View, Text, StyleSheet , Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { getArtist } from '../utils/PlayerFunctions';
import { usePlayerContext } from '../context/PlayerContext';

interface SongComponentProps {
  song: Song;
}


const SongComponent: React.FC<SongComponentProps> = ({ song }) => {
  const { setMusic } = usePlayerContext();

  const handleSongPress = async () => {

    try {
      //verificar si es la misma canción u otra.
      setMusic(song);
    } catch (error) {
      console.error('Error en handleSongPress:', error);
    }
  };
  return (

        <View style={styles.itemContainer}>
          <Pressable style={styles.container} onPress={() => handleSongPress()}>
          <Image
            style={styles.thumbnail}
            source={{ uri: song.thumbnails[0].url }}
            resizeMode='cover'/>
            <View>
            <Text style={styles.title}>
              {song.name.length > 30 ? `${song.name.substring(0, 30 - 3)}...` : song.name}
            </Text>
            <Text style={styles.artist}>Canción • {getArtist(song.artists)}</Text>
            </View>
           
          </Pressable>
          <Entypo name="dots-three-vertical" size={20} color="gray" onPress={() => handleSongPress()}/>
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
      borderRadius: 8,
      marginRight: 10,
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
      marginBottom: 5,
      color: '#697689'
    },
    type: {
      fontSize: 12,
      color: 'gray',
    },
  });
  
export default SongComponent;
