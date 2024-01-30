import { getColors } from 'react-native-image-colors';


export const URL_ROUTE = 'https://4357-179-6-170-150.ngrok-free.app';

export const getArtist = (artists: Artist[]): string => {
  const MAX_DISPLAY_ARTISTS = 3;

  if (artists.length === 0) {
    return "Artista Desconocido";
  } else if (artists.length <= MAX_DISPLAY_ARTISTS) {
    // Concatenar nombres de artistas con ' • ' entre ellos
    return artists.map(artist => artist.name).join(',');
  } else {
    // Mostrar 'Varios Artistas' si hay más de 3 artistas
    return "Varios Artistas";
  }
};
export const getSongURL = async(item: Song ) => {
    try {

      if(item.url != undefined)
        return;
      
      const songDetailsResponse = await fetch(URL_ROUTE + `/get/url-song?query=${item.videoId}`);
        if (songDetailsResponse.ok) {
          const songDetails = await songDetailsResponse.json();
          item.url = songDetails.url;

        }
      }catch (error) {
        console.error('Error al obtener detalles adicionales de la canción:', error);
      }
      
  }

  export const getColorHex = async(item: Song) => {
    try {
  
      if(item.colorsList != undefined){
        console.log('ya tienen colores')
        return;
      }

      const result = await getColors(item.thumbnails[0].url, {
        fallback: '#000000',
        pixelSpacing: 5,
      })
      item.colorsList = { vibrant: '#000000', dark: '#000000'};
      switch (result.platform) {
        case 'android':
        case 'web':
            item.colorsList.vibrant = result.vibrant;
            item.colorsList.dark = result.darkVibrant;
          break
        case 'ios':
            item.colorsList.vibrant = result.primary;
            item.colorsList.dark = result.background;                
          break
        default:
          throw new Error('Unexpected platform')
      }          
    } catch (error) {
      console.error('Error al obtener colores:', error);
    }
  }