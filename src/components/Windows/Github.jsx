import MacWindow from './MacWindow'
import githubData from "../../assets/github.json"
import "./github.scss"

const GitCards = ({data = { id: 1, image: "", title: "", description: "", tags: [], repoLink: "", demoLink: "" }}) =>{
    return <div key={data.id} className="card">
        <div className="card-image-wrapper">
          <img src={data.image} alt={data.title} loading="lazy" />
        </div>
        <div className="card-content">
            <h1 className="card-title">{data.title}</h1>
            <p className="card-description">{data.description}</p>

            <div className="tags">
                {
                    data.tags.map((tag, idx) => <span key={idx} className="tag">{tag}</span>)
                }
            </div>

            <div className="urls">
                <a href={data.repoLink} target="_blank" rel="noreferrer" className="btn-repo">Repository</a>
                {data.demoLink && <a href={data.demoLink} target="_blank" rel="noreferrer" className="btn-demo">View Demo</a>}
            </div>
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
