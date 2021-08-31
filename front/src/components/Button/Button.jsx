import './Button.css'

function Button ( props ) {

    return (
        <button id="default-button" className={`default-button ${props.secondaryClass}`} {...props}>
            <a htmlFor="default-button" className="default-button-content" href>{props.title}</a>
        </button>
    )
}

export default Button