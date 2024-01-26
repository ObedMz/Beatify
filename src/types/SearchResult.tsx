type Artist = {
    artistId: string;
    name: string;
}

type Thumbnail = {
    url: string;
    width: number;
    height: number;
}

type Album = {
    albumId: string;
    name: string;
}

type ColorsList = {
    vibrant: string;
    dark: string;
};

type Song = {
    type: string;
    videoId: string;
    name: string;
    artists: Artist[];
    album: Album;
    duration: number;
    thumbnails: Thumbnail[];
    url: string;
    colorsList: ColorsList;
    loadData: () => void;
    track: any;

}

type Albums = {
    type: string;
    albumId: string;
    playlistId: string;
    artists: Artist[];
    year: number;
    name: string;
    thumbnails: Thumbnail[];
}
type ArtistData = {
    type: string;
    artistId: string;
    name: string;
    thumbnails: Thumbnail[];
}
type Playlist = {
    type: string;
    playlistId: string;
    name: string;
    artist: Artist;
    thumbnails: Thumbnail[];
}

  type SearchResult = Song | Albums | ArtistData | Playlist;
  