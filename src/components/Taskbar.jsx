import React from 'react'
import './Taskbar.scss'

const WINDOW_META = {
  github:  { label: 'Projects',  icon: '/doc-icons/github.svg',   bg: '#000' },
  note:    { label: 'Notes',     icon: '/doc-icons/note.svg',     bg: 'linear-gradient(to bottom, rgb(255,179,87), rgb(255,153,28))' },
  resume:  { label: 'Resume',    icon: '/doc-icons/pdf.svg',      bg: 'linear-gradient(to bottom, rgb(255,65,78), rgb(255,25,40))' },
  spotify: { label: 'Spotify',   icon: '/doc-icons/spotify.svg',  bg: 'linear-gradient(to bottom, rgb(78,176,33), rgb(53,142,12))' },
  cli:     { label: 'Terminal',  icon: '/doc-icons/cli.svg',      bg: '#000' },
  finder:  { label: 'Finder',    icon: '/doc-icons/finder.svg',   bg: 'linear-gradient(135deg, #1a6fc4, #61c1f5)' },
}

const Taskbar = ({ minimizedWindows, setMinimizedWindows }) => {
  if (!minimizedWindows || minimizedWindows.length === 0) return null

  const handleRestore = (windowName) => {
    setMinimizedWindows(prev => prev.filter(w => w !== windowName))
  }

  return (
    <div className="taskbar">
      {minimizedWindows.map(win => {
        const meta = WINDOW_META[win] || { label: win, icon: '', bg: '#333' }
        return (
          <div
            key={win}
            className="taskbar-item"
            onClick={() => handleRestore(win)}
            title={`Restore ${meta.label}`}
          >
            <div className="taskbar-icon" style={{ background: meta.bg }}>
              {meta.icon && <img src={meta.icon} alt={meta.label} />}
            </div>
            <span className="taskbar-label">{meta.label}</span>
            <span className="taskbar-dot" />
          </div>
        )
      })}
    </div>
  )
}

export default Taskbar
