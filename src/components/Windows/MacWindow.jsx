import React, { useState } from 'react'
import { Rnd } from 'react-rnd'
import './MacWindow.scss'

const MacWindow = ({
  children,
  width = '60vw',
  height = '65vh',
  windowName,
  windowsState,
  setWindowsState,
  title = 'ayaanahmad — zsh',
  minimizedWindows,
  setMinimizedWindows,
}) => {
  const [isMaximized, setIsMaximized] = useState(false)
  const [hoveringDots, setHoveringDots] = useState(false)

  const isMinimized = minimizedWindows?.includes(windowName)
  if (isMinimized) return null

  const handleClose = (e) => {
    e.stopPropagation()
    setMinimizedWindows(prev => prev.filter(w => w !== windowName))
    setWindowsState(state => ({ ...state, [windowName]: false }))
  }

  const handleMinimize = (e) => {
    e.stopPropagation()
    if (!isMinimized) setMinimizedWindows(prev => [...prev, windowName])
  }

  const handleMaximize = (e) => {
    e.stopPropagation()
    setIsMaximized(p => !p)
  }

  /* Shared titlebar rendered in both modes */
  const TitleBar = (
    <div
      className='nav-content'
      onMouseEnter={() => setHoveringDots(true)}
      onMouseLeave={() => setHoveringDots(false)}
    >
      <div className='dots'>
        <div className='dot red'   onClick={handleClose}>
          {hoveringDots && <span className='dot-icon'>✕</span>}
        </div>
        <div className='dot yellow' onClick={handleMinimize}>
          {hoveringDots && <span className='dot-icon'>−</span>}
        </div>
        <div className='dot green'  onClick={handleMaximize}>
          {hoveringDots && <span className='dot-icon'>{isMaximized ? '⤡' : '⤢'}</span>}
        </div>
      </div>
      <div className='win-title'><p>{title}</p></div>
    </div>
  )

  /* ── MAXIMIZED: fixed overlay sitting below the navbar ─────── */
  if (isMaximized) {
    return (
      <div className='mac-window mac-window--max'>
        {TitleBar}
        <div className='main-content'>{children}</div>
      </div>
    )
  }

  /* ── WINDOWED ──────────────────────────────────────────────── */
  return (
    <Rnd
      default={{ width, height, x: 60, y: 45 }}
      minWidth={340}
      minHeight={220}
      bounds='parent'
      className='mac-rnd'
    >
      <div className='mac-window'>
        {TitleBar}
        <div className='main-content'>{children}</div>
      </div>
    </Rnd>
  )
}

export default MacWindow
