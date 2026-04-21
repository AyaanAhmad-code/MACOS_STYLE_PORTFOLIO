import React, { useState, useEffect, useRef } from 'react'
import './Finder.scss'

const SPOTLIGHT_ITEMS = [
  { id: 'github',   appKey: 'github',  name: 'Projects',  icon: '/doc-icons/github.svg', type: 'app' },
  { id: 'note',     appKey: 'note',    name: 'Notes',     icon: '/doc-icons/note.svg',   type: 'app' },
  { id: 'resume',   appKey: 'resume',  name: 'Resume',    icon: '/doc-icons/pdf.svg',    type: 'app' },
  { id: 'spotify',  appKey: 'spotify', name: 'Spotify',   icon: '/doc-icons/spotify.svg',type: 'app' },
  { id: 'cli',      appKey: 'cli',     name: 'Terminal',  icon: '/doc-icons/cli.svg',    type: 'app' },
  { id: 'calendar', name: 'Calendar',  icon: '/doc-icons/calender.svg', type: 'link', action: () => window.open('https://calendar.google.com/', '_blank') },
  { id: 'mail',     name: 'Mail',      icon: '/doc-icons/mail.svg',     type: 'link', action: () => window.open('mailto:ayaanah287@gmail.com', '_blank') }
]

const Finder = ({ windowsState, setWindowsState }) => {
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const overlayRef = useRef(null)

  // Filter based on search query
  const suggestions = search.trim() === '' 
    ? SPOTLIGHT_ITEMS 
    : SPOTLIGHT_ITEMS.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setWindowsState(s => ({ ...s, finder: false }))
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % suggestions.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length)
      } else if (e.key === 'Enter' && suggestions.length > 0) {
        handleSelect(suggestions[selectedIndex])
      }
    }

    const handleClickOutside = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) {
        setWindowsState(s => ({ ...s, finder: false }))
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [suggestions, selectedIndex, setWindowsState])

  const handleSelect = (item) => {
    if (item.type === 'app') {
      setWindowsState(s => ({ ...s, [item.appKey]: true, finder: false }))
    } else if (item.type === 'link') {
      item.action()
      setWindowsState(s => ({ ...s, finder: false }))
    }
  }

  return (
    <div className="spotlight-overlay">
      <div className="spotlight-container" ref={overlayRef}>
        <div className="spotlight-input-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            autoFocus
            type="text" 
            placeholder="Spotlight Search" 
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setSelectedIndex(0)
            }}
          />
        </div>
        
        {suggestions.length > 0 && (
          <div className="spotlight-suggestions">
            {suggestions.map((item, idx) => (
              <div 
                key={item.id} 
                className={`suggestion-item ${idx === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <img src={item.icon} alt={item.name} className="sugg-icon" />
                <span className="sugg-name">{item.name}</span>
                <span className="sugg-type">{item.type === 'app' ? 'Application' : 'Web Link'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Finder
