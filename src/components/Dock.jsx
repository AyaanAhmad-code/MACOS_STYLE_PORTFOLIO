import './Dock.scss'

const Dock = ({ windowsState, setWindowsState, minimizedWindows = [], setMinimizedWindows }) => {

  const handleIcon = (name) => {
    if (minimizedWindows.includes(name)) {
      // Restore from minimized
      setMinimizedWindows(prev => prev.filter(w => w !== name))
    } else {
      // Open or bring to front
      setWindowsState(state => ({ ...state, [name]: true }))
    }
  }

  // dot state: 'none' | 'open' | 'minimized'
  const dotState = (name) => {
    if (minimizedWindows.includes(name)) return 'minimized'
    if (windowsState[name]) return 'open'
    return 'none'
  }

  const Icon = ({ name, className, src, title }) => {
    const state = dotState(name)
    return (
      <div
        className={`icon ${className}`}
        title={title}
        onClick={() => handleIcon(name)}
        data-minimized={state === 'minimized' ? 'true' : undefined}
      >
        <img src={src} alt={title} />
        {state === 'open'      && <span className='dot dot--open' />}
        {state === 'minimized' && <span className='dot dot--min' />}
      </div>
    )
  }

  return (
    <div className='dock'>
      {/* Finder — always first, permanent */}
      <Icon name='finder'  className='finder'  src='/doc-icons/finder.svg'  title='Finder' />

      <div className='dock-sep' />

      <Icon name='github'  className='github'  src='/doc-icons/github.svg'  title='Projects' />
      <Icon name='note'    className='note'    src='/doc-icons/note.svg'    title='Notes' />
      <Icon name='resume'  className='pdf'     src='/doc-icons/pdf.svg'     title='Resume' />

      <div
        className='icon calender'
        title='Calendar'
        onClick={() => window.open('https://calendar.google.com/', '_blank')}
      >
        <img src='/doc-icons/calender.svg' alt='Calendar' />
      </div>

      <div
        className='icon mail'
        title='Mail'
        onClick={() => window.open('mailto:ayaanah287@gmail.com', '_blank')}
      >
        <img src='/doc-icons/mail.svg' alt='Mail' />
      </div>

      <Icon name='spotify' className='spotify' src='/doc-icons/spotify.svg' title='Spotify' />

      <div
        className='icon link'
        title='LinkedIn'
        onClick={() => window.open('https://linkedin.com/in/ayaanah287/', '_blank')}
      >
        <img src='/doc-icons/link.svg' alt='LinkedIn' />
      </div>

      <Icon name='cli'     className='cli'     src='/doc-icons/cli.svg'     title='Terminal' />
    </div>
  )
}

export default Dock
