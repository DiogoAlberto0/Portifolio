import './AdminButton.css'



const AdminButton = props => {

    return(
        <button className="admin-button" {...props}>
            <img src={props.img} className="admin-button-img" alt={props.alt}/>
        </button>
    )
}

export default AdminButton