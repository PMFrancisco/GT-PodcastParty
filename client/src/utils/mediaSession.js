import { useEffect } from 'react';

const useMediaSession = ({ title, artist, album, artwork, onPlay, onPause, onNext, onPrevious }) => {
    useEffect(() => {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: title || '',
                artist: artist || '',
                artwork: artwork || []
            });

            navigator.mediaSession.setActionHandler('play', onPlay);
            navigator.mediaSession.setActionHandler('pause', onPause);
            navigator.mediaSession.setActionHandler('nexttrack', onNext);
            navigator.mediaSession.setActionHandler('previoustrack', onPrevious);
        }

        return () => {
            if ('mediaSession' in navigator) {
                navigator.mediaSession.setActionHandler('play', null);
                navigator.mediaSession.setActionHandler('pause', null);
                navigator.mediaSession.setActionHandler('nexttrack', null);
                navigator.mediaSession.setActionHandler('previoustrack', null);
            }
        };
    }, [title, artist, album, artwork, onPlay, onPause, onNext, onPrevious]);
};

export default useMediaSession;

