import MacWindow from './MacWindow'
import githubData from "../../assets/github.json"
import "./github.scss"

const GitCards = ({data = { id: 1, image: "", title: "", description: "", tags: [], repoLink: "", demoLink: "" }}) =>{
    return <div key={data.id} className="card">
        <img src={data.image} alt="" />
        <h1>{data.title}</h1>
        <p className='description'>{data.description}</p>

        <div className="tags">
            {
                data.tags.map(tag => <p className='tag' >{tag}</p>)
            }
        </div>

        <div className="urls">
            <a href={data.repoLink}>Repository</a>
            {data.demoLink && <a href={data.demoLink}>Demo link</a>}
        </div>
    </div>
}

const Github = ({windowName, windowsState, setWindowsState, minimizedWindows, setMinimizedWindows}) => {
  return (
    <MacWindow
      windowName={windowName}
      windowsState={windowsState}
      setWindowsState={setWindowsState}
      minimizedWindows={minimizedWindows}
      setMinimizedWindows={setMinimizedWindows}
      title="Projects — GitHub"
    >
        <div className="cards">
            {githubData.map((project)=>{
                return <GitCards data={project} />
            })}
        </div>
    </MacWindow>
  )
}

export default Github
