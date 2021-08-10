import './ProjectCard.css'


function ProjecrCard( props ) {
    return(
        <div className="project-card">
            <div className="project-card-title">
                <h1>{ props.name }</h1>
            </div>
            <div className="divisor-card"></div>
            <img
                key={props.id}
                src={`${props.img}`}
                className="project-img" 
                alt={`${props.img}`}
            />
            <div className="divisor-card"></div>
            <a href={ props.repositoryLink } className="card-link" target="blank"> Link do repositório</a>
            <div className="divisor-card"></div>
            <h2>{props.programingLanguage}</h2>
            <div className="divisor-card"></div>
            <h2 onClick={props.detailsLink}>+Detalhes</h2>
        </div>
    )
}

export default ProjecrCard