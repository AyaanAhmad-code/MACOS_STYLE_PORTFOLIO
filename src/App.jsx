import { useState } from 'react'
import './App.scss'
import Dock from "./components/Dock"
import Navbar from './components/Navbar'
import Cli from './components/Windows/Cli'
import Github from './components/Windows/Github'
import Note from './components/Windows/Note'
import Resume from './components/Windows/Resume'
import Spotiify from './components/Windows/Spotiify'
import Finder from './components/Windows/Finder'
import DesktopIcons from './components/DesktopIcons'

function App() {
  const [windowsState, setWindowsState] = useState({
    github: false,
    note: false,
    resume: false,
    spotify: false,
    cli: false,
    finder: false,
  })

  // Track which windows are minimized to the dock
  const [minimizedWindows, setMinimizedWindows] = useState([])

  // Shared props passed to every window
  const winProps = { windowsState, setWindowsState, minimizedWindows, setMinimizedWindows }

  const handleFolderOpen = (windowKey) => {
    setWindowsState(s => ({ ...s, [windowKey]: true }))
  }

  return (
    <main>
      <Navbar {...winProps} />
      <DesktopIcons onFolderOpen={handleFolderOpen} />
      <Dock
        windowsState={windowsState}
        setWindowsState={setWindowsState}
        minimizedWindows={minimizedWindows}
        setMinimizedWindows={setMinimizedWindows}
      />

      {windowsState.github  && <Github   windowName="github"  {...winProps} />}
      {windowsState.note    && <Note     windowName="note"    {...winProps} />}
      {windowsState.resume  && <Resume   windowName="resume"  {...winProps} />}
      {windowsState.spotify && <Spotiify windowName="spotify" {...winProps} />}
      {windowsState.cli     && <Cli      windowName="cli"     {...winProps} />}
      {windowsState.finder  && <Finder   windowName="finder"  {...winProps} />}
    </main>
  )
}

export default App
