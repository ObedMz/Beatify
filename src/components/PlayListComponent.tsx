import React from 'react';
import { Image, View, Text, StyleSheet , Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';

interface PlayListComponent {
    playlist: Playlist;
}

const handleSongPress = async (videoId : string) => {
    try {
      console.log('reproducing song from ', videoId)
    } catch (error) {
      console.error('Error en handleSongPress:', error);
    }
  };
const PlayListComponent: React.FC<PlayListComponent> = ({ playlist }) => {
  return (

        <View style={styles.itemContainer}>
          <Pressable style={styles.container} onPress={() => handleSongPress(playlist.playlistId)}>
          <Image
            style={styles.thumbnail}
            source={{ uri: playlist.thumbnails[0].url }}
            resizeMode='cover'/>
            <View>
            <Text style={styles.title}>
              {playlist.name.length > 30 ? `${playlist.name.substring(0, 30 - 3)}...` : playlist.name}
            </Text>
            <Text style={styles.artist}>PlayList • {playlist.artist.name}</Text>
            </View>
           
          </Pressable>
          <Entypo name="dots-three-vertical" size={20} color="gray" onPress={() => handleSongPress(playlist.playlistId)}/>
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
      color: '#697689'
    },
    type: {
      fontSize: 12,
      color: 'gray',
    },
  });
  
export default PlayListComponent;
