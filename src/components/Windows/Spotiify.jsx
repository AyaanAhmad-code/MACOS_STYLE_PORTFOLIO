import React from 'react'
import MacWindow from './MacWindow'
import "./Spotify.scss"

const Spotiify = ({windowName, windowsState, setWindowsState, minimizedWindows, setMinimizedWindows}) => {
  return (
    <MacWindow
      windowName={windowName}
      windowsState={windowsState}
      setWindowsState={setWindowsState}
      minimizedWindows={minimizedWindows}
      setMinimizedWindows={setMinimizedWindows}
      title="Spotify"
      width='25vw'
    >
        <div className="spotify-window">
            <iframe data-testid="embed-iframe" style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/playlist/4nqbYFYZOCospBb4miwHWy?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
    </MacWindow>
  )
}

export default Spotiify
