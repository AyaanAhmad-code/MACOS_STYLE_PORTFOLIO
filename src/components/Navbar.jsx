import { useState, useRef, useEffect } from 'react'
import DateTime from './DateTime'
import './Nav.scss'

/* ── Menu definitions ────────────────────────────────────────────── */
const getMenus = ({ setWindowsState, setMinimizedWindows, windowsState }) => [
  {
    label: '⌘',
    id: 'apple',
    items: [
      { label: 'About This Portfolio', action: () => setWindowsState && setWindowsState(s => ({ ...s, note: true })) },
      { type: 'sep' },
      { label: 'Spotlight Search', shortcut: '⌘Space', action: () => setWindowsState && setWindowsState(s => ({ ...s, finder: true })) },
      { label: 'Open Terminal', shortcut: '⌘J', action: () => setWindowsState && setWindowsState(s => ({ ...s, cli: true })) },
      { type: 'sep' },
      { label: 'Sleep', disabled: true },
      { label: 'Restart…', disabled: true },
      { label: 'Shut Down…', disabled: true },
    ]
  },
  {
    label: 'Ayaan Ahmad',
    id: 'brand',
    bold: true,
    items: [
      { label: 'About Ayaan', action: () => setWindowsState(s => ({ ...s, note: true })) },
      { type: 'sep' },
      { label: 'GitHub ↗', action: () => window.open('https://github.com/ayaanah287', '_blank') },
      { label: 'LinkedIn ↗', action: () => window.open('https://linkedin.com/in/ayaanah287', '_blank') },
      { label: 'Email ↗', action: () => window.open('mailto:ayaanah287@gmail.com', '_blank') },
    ]
  },
  {
    label: 'File',
    id: 'file',
    items: [
      { label: 'Spotlight Search', shortcut: '⌘Space', action: () => setWindowsState && setWindowsState(s => ({ ...s, finder: true })) },
      { label: 'New Terminal Window', shortcut: '⌘J', action: () => setWindowsState && setWindowsState(s => ({ ...s, cli: true })) },
      { type: 'sep' },
      { label: 'Open Resume', action: () => setWindowsState(s => ({ ...s, resume: true })) },
      { label: 'Open Projects', action: () => setWindowsState(s => ({ ...s, github: true })) },
      { label: 'Open Spotify', action: () => setWindowsState(s => ({ ...s, spotify: true })) },
      { type: 'sep' },
      {
        label: 'Close All Windows',
        shortcut: '⌘W',
        action: () => {
          if (setWindowsState) setWindowsState(s => Object.fromEntries(Object.keys(s).map(k => [k, false])))
          if (setMinimizedWindows) setMinimizedWindows([])
        }
      },
    ]
  },
  {
    label: 'Window',
    id: 'window',
    items: [
      {
        label: 'Minimize All',
        shortcut: '⌘M',
        action: () => {
          if (windowsState && setMinimizedWindows) {
            const open = Object.entries(windowsState).filter(([, v]) => v).map(([k]) => k)
            setMinimizedWindows(open)
          }
        }
      },
      { type: 'sep' },
      { label: 'Projects', action: () => setWindowsState(s => ({ ...s, github: true })) },
      { label: 'Notes', action: () => setWindowsState(s => ({ ...s, note: true })) },
      { label: 'Resume', action: () => setWindowsState(s => ({ ...s, resume: true })) },
      { label: 'Spotify', action: () => setWindowsState(s => ({ ...s, spotify: true })) },
      { label: 'Terminal', action: () => setWindowsState(s => ({ ...s, cli: true })) },
      { label: 'Finder', action: () => setWindowsState(s => ({ ...s, finder: true })) },
    ]
  },
  {
    label: 'Terminal',
    id: 'terminal',
    items: [
      { label: 'New Terminal Window', action: () => setWindowsState(s => ({ ...s, cli: true })) },
      { type: 'sep' },
      { label: 'Clear', disabled: true },
      { label: 'Help', disabled: true },
    ]
  },
]

/* ── Dropdown component ──────────────────────────────────────────── */
const Dropdown = ({ items, onClose }) => (
  <div className="nav-dropdown">
    {items.map((item, i) => {
      if (item.type === 'sep') return <div key={i} className="nav-dropdown-sep" />
      return (
        <div
          key={i}
          className={`nav-dropdown-item ${item.disabled ? 'disabled' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            if (!item.disabled && item.action) {
              item.action()
              onClose()
            }
          }}
        >
          <span>{item.label}</span>
          {item.shortcut && <span className="shortcut">{item.shortcut}</span>}
        </div>
      )
    })}
  </div>
)

/* ── Navbar ──────────────────────────────────────────────────────── */
const Navbar = ({ windowsState, setWindowsState, minimizedWindows, setMinimizedWindows }) => {
  const [openMenu, setOpenMenu] = useState(null)
  const navRef = useRef(null)

  const menus = getMenus({ setWindowsState, setMinimizedWindows, windowsState })

  // Close when clicking outside and handle Global Shortcuts
  useEffect(() => {
    const handleEvents = (e) => {
      // ── Click outside ──
      if (e.type === 'mousedown' && navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null)
      }

      // ── Keyboard Shortcuts ──
      if (e.type === 'keydown') {
        const isCmd = e.metaKey || e.ctrlKey
        const key = e.key.toLowerCase()

        if (isCmd && e.code === 'Space') {
          e.preventDefault()
          if(setWindowsState) setWindowsState(s => ({ ...s, finder: true }))
        }
        if (isCmd && key === 'j') {
          e.preventDefault()
          if(setWindowsState) setWindowsState(s => ({ ...s, cli: true }))
        }
        if (isCmd && key === 'w') {
          // Warning: Cmd+W often intercepted by browser, preventDefault helps in some browsers
          e.preventDefault()
          if(setWindowsState) setWindowsState(s => Object.fromEntries(Object.keys(s).map(k => [k, false])))
          if(setMinimizedWindows) setMinimizedWindows([])
        }
        if (isCmd && key === 'm') {
          e.preventDefault()
          if(windowsState && setMinimizedWindows) {
            const open = Object.entries(windowsState).filter(([k, v]) => v).map(([k]) => k)
            setMinimizedWindows(open)
          }
        }
      }
    }

    document.addEventListener('mousedown', handleEvents)
    document.addEventListener('keydown', handleEvents)
    return () => {
      document.removeEventListener('mousedown', handleEvents)
      document.removeEventListener('keydown', handleEvents)
    }
  }, [windowsState, setWindowsState, setMinimizedWindows])

  const handleItemClick = (id) => setOpenMenu(prev => prev === id ? null : id)
  const handleItemEnter = (id) => { if (openMenu) setOpenMenu(id) }

  return (
    <nav ref={navRef}>
      <div className="nav-left">
        {menus.map(menu => (
          <div
            key={menu.id}
            className={`nav-item ${menu.id === 'apple' ? 'apple' : ''} ${menu.bold ? 'bold' : ''} ${openMenu === menu.id ? 'active' : ''}`}
            onClick={() => handleItemClick(menu.id)}
            onMouseEnter={() => handleItemEnter(menu.id)}
          >
            {menu.label}
            {openMenu === menu.id && (
              <Dropdown items={menu.items} onClose={() => setOpenMenu(null)} />
            )}
          </div>
        ))}
      </div>

      <div className="nav-right">
        <div className="nav-icon">
          <img src="/navbar-icons/wifi.svg" alt="wifi" />
        </div>
        <div className="nav-item datetime">
          <DateTime />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
