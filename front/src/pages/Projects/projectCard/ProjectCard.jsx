import './ProjectCard.css'


function ProjecrCard( props ) {


    return(
        <div className="project-card">
            <h1>{ props.title }</h1>
            <div className="divisor-card"></div>
            <img
                src={ props.img ? props.img : 'https://sindafsp.org.br/wp-content/uploads/2017/10/wallpaper.wiki-Full-hd-pc-photos-free-download-PIC-WPC002354-1.jpg' }
                className="project-img" 
                alt=""
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