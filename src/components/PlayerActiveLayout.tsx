import React, { useEffect, useRef, useState } from 'react';
import { Animated,Dimensions ,Image, ScrollView, View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSharedValue } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Slider } from 'react-native-awesome-slider';

import TrackPlayer, { useProgress } from 'react-native-track-player';
import { Entypo, Feather, MaterialCommunityIcons , Ionicons } from '@expo/vector-icons'; 
import { getArtist } from '../utils/PlayerFunctions';

const ScreenHeight = Dimensions.get("screen").height;
interface MusicPlayerProps {
  loading: boolean;
  isPlaying: boolean;
  active: boolean;
  music: Song;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const MusicPlayer: React.FC<MusicPlayerProps> = ({
  loading,
  isPlaying,
  music,
  active,
  setPlaying,
  setActive,
  setLoading,
}) => {
  /* 
    TODO:
     - leer el end event del player para pausar el icono al terminar la canción.
     - agregar sistema de cola, y botones al player outside.
     - arreglar el flat-list: undefined search and other values.
     - revisar eventos fuera del contexto como:
     - interrupciones de llamadas, botones outside, track-change, track-end
     - PlaybackActiveTrackChanged, PlaybackQueueEnded,
     PlaybackProgressUpdated, PlaybackError,
  **/
    const {position} = useProgress();
    const animMusicPlayerBottom = useRef(new Animated.Value(0)).current;
    const progress = useSharedValue(0);
    const follow_track = useSharedValue(true);
    const bubble_value = useSharedValue(0);
    const min = useSharedValue(0);
    const max = useSharedValue(0);
    
    useEffect(() => {

      if(follow_track) progress.value = position;
      //Check if there are more tracks here.
      if(music?.duration != undefined && position >= music?.duration ){
          console.log('reach end music, change state of playing');
          setPlaying(false)
      }
    }, [position])

    useEffect(()=>{
      if(!music)
        return;

      max.value = music.duration;
      //this can be use as a music change event.
    }, [music])


    const formatDuration = (durationInSeconds: string) => {
      const integerDuration = Math.floor(parseFloat(durationInSeconds));

      const hours = Math.floor(integerDuration / 3600);
      const minutes = Math.floor((integerDuration % 3600) / 60);
      const seconds = integerDuration % 60;
    
      // Formateo de los valores obtenidos para mostrarlos con dos dígitos (agregando ceros a la izquierda si es necesario)
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = seconds.toString().padStart(2, '0');
    
      if (hours >= 1) {
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      } else {
        return `${formattedMinutes}:${formattedSeconds}`;
      }
    };

  const styles = getPlayerStyles();
  
  if(!music)
    return;

    const handlerPress = () => {
      setPlaying(!isPlaying);
      if(isPlaying){
        TrackPlayer.pause();
      } else {
        //Check if there are more tracks here maybe.
        if(music?.duration != undefined && position >= music?.duration ){
         //repeat.
        } else {
          TrackPlayer.play();
        }
      }
    }
    
    useEffect(()=>{
      Animated.timing(animMusicPlayerBottom, {
        toValue: ( (active) ? 0 : ScreenHeight),
        duration: 250, 
        useNativeDriver: false, 
      }).start();
    }, [active]);
    const handlerTest = () => {
      setActive(false);
     }

return (
  <Animated.View style={[styles.container_root, { top: animMusicPlayerBottom}]}>
  <GestureHandlerRootView style={{width: '100%', height: '100%'}}>
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
    <LinearGradient colors={[
    music.colorsList?.vibrant || '#3333',
    music.colorsList?.vibrant || '#3333',
  ]} style={styles.player}>

    <View style={styles.top_header}>
    <Feather name="chevron-down" size={24} color="white" onPress={handlerTest}/>
    <Text style={styles.title_container}>Reproductor de Música</Text>
    <Entypo name="dots-three-vertical" size={24} color="white"/>
    </View>
<View style={styles.shadow}>
  <Image
    style={styles.thumbnail}
    source={{uri: music?.thumbnails[0].url.split('=')[0]}}
    resizeMode='cover'
  />
</View>
<View style={styles.header_content}>

<View style={{width: '90%'}}><Text style={styles.title_song}>{ ((music?.name).length > 40) ? 
    (((music?.name).substring(0,40-3)) + '...') : 
    music?.name}</Text>
<Text style={styles.artist_song}>{getArtist(music.artists)}</Text></View>
<Feather name="heart" size={24} color={"white"}/>
</View>
    <View style={styles.content_slider}>
    <Slider
      style={styles.slider}
      theme={{
        disableMinTrackTintColor: 'gray',
        maximumTrackTintColor: 'gray',
        minimumTrackTintColor: '#fff',
        bubbleBackgroundColor: 'rgba(255,255,255,0.4)',
      }}
      
      onSlidingStart={()=> {
        follow_track.value = false;
      }}
      progress={(follow_track.value ? progress : bubble_value)}
      minimumValue={min}
      maximumValue={max}
      renderThumb={()=> ((follow_track.value ? null : 
      <Animated.View style={{flex: 1, width: 14, height: 14, backgroundColor: 'white', borderRadius: 100}}><Text> </Text></Animated.View>))}
      onSlidingComplete={(e: number) => {
        follow_track.value = true;
        TrackPlayer.seekTo(e);
        progress.value = e;
        
      }}
    />
    </View>
<View style={styles.timer_container}>
  <Text style={{color: 'white'}}>{formatDuration(position.toString())}</Text>
  <Text style={{color: 'white'}}>{formatDuration(music.duration.toString())}</Text>
</View>
<View style={styles.controls}>
  <Feather name="shuffle" size={18} color="silver" />
  <View style={styles.main_control}>
    <Feather name="skip-back" size={24} color="white" />
    {loading ? (
      <ActivityIndicator size='large' color='#ffff'/>
    ) : (
      <Ionicons style={styles.play_button} name={!isPlaying ? "play" : "pause"} size={50} color="white" onPress={handlerPress}/>
    )}
    <Feather name="skip-forward" size={24} color="white"/>
  </View>
    <Feather name="repeat" size={18} color="silver" />
</View>
<View style={styles.bottom_controls}>
<Feather name="share-2" size={20} color="white" />
<MaterialCommunityIcons name="music-box-outline" size={20} color="white" />
</View>

</LinearGradient>
    
    </ScrollView>
</GestureHandlerRootView>
  </Animated.View>
  );
};
const getPlayerStyles = () => {
  return StyleSheet.create({
    container_root: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '100%',
      zIndex: 11,

    },
    content_slider: {
      width: '100%',
    },
    slider: {
      width: '100%',
      flexDirection: 'column-reverse',
  
    },
    timer_container:{
  
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    play_button: {
      marginHorizontal: 20,
    },
    top_header: {
  
      width: "100%",
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    main_control: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    header_content: {
      flexWrap: 'nowrap',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
      title_container: {
          color: 'white',
      },
      title_song: {
          color: 'white',
          textAlign: 'left',
          fontSize: 23,
          fontWeight: '500',
      },scrollView: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999, // Coloca el reproductor por encima de otros elementos
          flex: 1,
        },
      artist_song: {
          textAlign: 'left',
          color: 'silver',
      },
      shadow: {
  
      alignItems: 'center',
      elevation: 10, // Solo para Android
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      width: 360,
      height: 360,
      borderRadius: 10,
    },
  
    thumbnail: {
      width: "95%",
      height: "99%",
  
    },
    player: {
      justifyContent: 'space-evenly',
      flexDirection: 'column',
      alignItems: 'center',
      paddingHorizontal: 30,
      paddingVertical: 30,
      height: ScreenHeight
  
    },
    controls: {
      width: '100%',
      flexWrap: 'nowrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
    }, bottom_controls: {
      width: '100%',
      flexWrap: 'nowrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }
  });
}

export default MusicPlayer;
