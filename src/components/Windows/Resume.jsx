import React from 'react'
import MacWindow from './MacWindow'
import "./Resume.scss"

const Resume = ({windowName, windowsState, setWindowsState, minimizedWindows, setMinimizedWindows}) => {
  return (
    <MacWindow
      windowName={windowName}
      windowsState={windowsState}
      setWindowsState={setWindowsState}
      minimizedWindows={minimizedWindows}
      setMinimizedWindows={setMinimizedWindows}
      title="Resume.pdf"
    >
        <div className="resume">
            <iframe src="/resume.pdf" frameBorder="0"></iframe>
        </div>
    </MacWindow>
  )
}

export default Resume
