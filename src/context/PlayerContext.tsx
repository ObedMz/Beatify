import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import React from 'react';

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

interface PlayerContextProps {
    music?: Song;
    loading: boolean;
    isPlaying: boolean;
    setMusic: (song: Song) => void;
    setPlaying: (playing: boolean) => void;
    setLoading: (loading: boolean) => void;
}

interface PlayerProps {
    children: ReactNode;
}


export const usePlayerContext = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayerContext debe ser utilizado dentro de un proveedor de PlayerContext');
    }
    return context;
};

export const PlayerProvider: React.FC<PlayerProps> = ({ children }) => {
    const [music, setMusic] = useState<Song>();
    const [loading, setLoading] = useState(false);
    const [isPlaying, setPlaying] = useState(true);

   

    
    const value: PlayerContextProps = {
        music,
        loading,
        isPlaying,
        setMusic,
        setLoading,
        setPlaying,
    };

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
};
