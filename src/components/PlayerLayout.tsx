import { useState, useEffect  } from "react";
import { View , Text, Image, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TrackPlayer, { Track } from "react-native-track-player";
import { usePlayerContext } from "../context/PlayerContext";
import { getColorHex, getSongURL, getArtist } from "../utils/PlayerFunctions";
import { Ionicons } from "@expo/vector-icons";
import MusicPlayer from "./PlayerActiveLayout";

const PlayerLayout = () => {
  const { music } = usePlayerContext();
  const [ isPlaying , setPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  const handlerPress = () => {
    setPlaying(!isPlaying);
    if(isPlaying){
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }

  useEffect(() => {
    if(music == undefined)
        return;
    
    const fetchData = async () => {
      if (music.url === undefined) {
        setLoading(true)
        music.loadData = async () => {
          await getColorHex(music);
          await getSongURL(music);
        };
  
        await music.loadData();
      }
    };
  
    const startPlaying = async () => {
      const actualTrack = await TrackPlayer.getActiveTrack();
  
      if (actualTrack === undefined || actualTrack.title !== music.name) {
        TrackPlayer.reset()
        const track: Track = {
          url: music.url,
          album: music.album.name,
          title: music.name,
          duration: music.duration,
          artwork: music.thumbnails[0].url,
          artist: getArtist(music.artists),
        };
  
        music.track = track;
  
        await TrackPlayer.reset();
        await TrackPlayer.add([track]);
        await TrackPlayer.play();
        setLoading(false);
      }
    };
  
    const fetchDataAndStartPlaying = async () => {
      await fetchData();
      startPlaying();
    };
  
    fetchDataAndStartPlaying();
  }, [music]);


  if(music == undefined)
      return;

  const styles = getPlayerStyles(music);

  return (
    <><GestureHandlerRootView style={styles.container}>
      <View style={styles.player}>
        <Pressable>
          <Image source={{ uri: music.thumbnails[0].url }} style={styles.image} />
        </Pressable>
        <Pressable style={styles.container_touch}>
          <Text style={styles.title}>{((music.name).length > 35) ? (((music.name).substring(0, 35 - 3)) + '...') : music.name}</Text>
          <Text style={styles.subtitle}>{getArtist(music.artists)}</Text>
        </Pressable>
        <Ionicons
          name={'heart-outline'}
          size={20}
          color={'white'}
          style={{ marginHorizontal: 10 }} />
        {loading ? (
          <View>
            <ActivityIndicator size="small" color="#ffff" />
          </View>
        ) :
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={22}
            color={'white'}
            onPress={handlerPress} />}

      </View>

    </GestureHandlerRootView>
    </>
  );
};


const getPlayerStyles = (song: Song) => {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 110,
      width: '100%',
      height: 75,
      zIndex: 10,
      padding: 10,
    },
    container_touch: {
      flex: 1,
      flexDirection: 'column',
    },
    content_text: {
      flex: 1,
    },
    player: {
      backgroundColor: ((song.colorsList == undefined) ? '#351c75' : song.colorsList.vibrant),
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 5,
      padding: 3,
      paddingRight: 15,
    },
    title: {
      color: 'white',
    },
    subtitle: {
      color: 'lightgray',
      fontSize: 12,
    },
    image: {
      height: '100%',
      aspectRatio: 1,
      marginRight: 10,
      borderRadius: 5,
    },
  });
}

export default PlayerLayout;

