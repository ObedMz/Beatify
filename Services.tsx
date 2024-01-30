import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    Event
  } from 'react-native-track-player';


export async function initSetupPlayer() {
    let isSetup = false;
    try {
      await TrackPlayer.getActiveTrack();
      isSetup = true;
    }
    catch {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        progressUpdateEventInterval: 1,
      });
  
      isSetup = true;
    }
    finally {
      return isSetup;
    }
  }
export const PlaybackService = async function() {

    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
    TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, () => TrackPlayer.getProgress());
};