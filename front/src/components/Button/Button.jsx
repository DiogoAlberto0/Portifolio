import './Button.css'

function Button ( props ) {

    return (
        <button className={`default-button ${props.secondaryClass}`} {...props}>
            {props.title}
        </button>
    )
}

export default Button