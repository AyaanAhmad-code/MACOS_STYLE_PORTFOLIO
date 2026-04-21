import React,{useEffect, useState} from 'react'
import Markdown from "react-markdown";
import MacWindow from './MacWindow'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierDuneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import "./Note.scss"

const Note = ({windowName, windowsState, setWindowsState, minimizedWindows, setMinimizedWindows}) => {

    const [markdown, setmMarkdown] = useState(null)

    useEffect(()=>{
        fetch("/note.txt")
        .then(res => res.text())
        .then(text => setmMarkdown(text))
    },[])
  return (
    <MacWindow
      windowName={windowName}
      windowsState={windowsState}
      setWindowsState={setWindowsState}
      minimizedWindows={minimizedWindows}
      setMinimizedWindows={setMinimizedWindows}
      title="Notes"
    >
        <div className="note-window">
            { markdown ? <SyntaxHighlighter language='typescript' style={atelierDuneDark}>{markdown}</SyntaxHighlighter> : <p>Loading...</p>}
        </div>
    </MacWindow>
  )
}

export default Note
