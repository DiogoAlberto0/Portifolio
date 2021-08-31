import './ProjectCard.css'


function ProjecrCard( props ) {
    return(
        <div onClick={props.detailsLink} className="project-card">
            <h1 className="project-card-titles">{ props.name }</h1>
            <div className="divisor-card"></div>
            <img
                key={props.id}
                src={`${props.img}`}
                className="project-img" 
                alt={`${props.img}`}
            />
            <div className="divisor-card"></div>
            <a href={ props.repositoryLink } className="card-link project-card-titles" target="blank"> Link do repositório</a>
            <div className="divisor-card"></div>
            <h2 className="project-card-titles card-link">+Detalhes</h2>
        </div>
    )
}

export default ProjecrCard