import { useState } from 'react'
import './DesktopIcons.scss'

const FOLDERS = [
  { id: 'projects', label: 'Projects',  emoji: '📁', windowKey: 'github' },
  { id: 'skills',   label: 'Skills',    emoji: '🗂️', windowKey: 'resume' },
  { id: 'about',    label: 'About Me',  emoji: '👤', windowKey: 'note' },
  { id: 'contact',  label: 'Contact',   emoji: '📬', windowKey: 'cli' },
]

const DesktopIcons = ({ onFolderOpen }) => {
  const [selected, setSelected] = useState(null)

  const handleClick = (id) => setSelected(id)

  const handleDoubleClick = (id, windowKey) => {
    setSelected(id)
    onFolderOpen(windowKey)
  }

  return (
    <div className='desktop-icons'>
      {FOLDERS.map(f => (
        <div
          key={f.id}
          className={`desktop-icon ${selected === f.id ? 'selected' : ''}`}
          onClick={() => {
            handleClick(f.id)
            onFolderOpen(f.windowKey)
          }}
        >
          <div className='icon-graphic'>{f.emoji}</div>
          <span className='icon-label'>{f.label}</span>
        </div>
      ))}
    </div>
  )
}

export default DesktopIcons
