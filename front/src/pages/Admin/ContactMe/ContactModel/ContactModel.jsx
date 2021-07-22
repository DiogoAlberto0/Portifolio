import './ContactModel.css'

import Button from '../../../../components/Button/Button'
const ContactModel = props => {


    return(
        <div className="contact-model">
            <h1>{props.name}</h1>
            <div className="contact-separator"></div>
            <h2>{props.email}</h2>
            <div className="contact-separator"></div>
            <p className="contact-subject">
                {props.subject}
            </p>
            <Button title="Lida" onClick={props.eraser}/>
        </div>
    )
}

export default ContactModel