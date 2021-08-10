import './ContactUs.css'

import Button from '../../components/Button/Button'
import { useState } from 'react'

import baseApiUrl from '../../services/api'

const inicialState = {
    user: {
        name: '',
        email: '',
        subject: ''
    }
}

const ContactUs = (props) => {

    const [contact, setContact] = useState({ ...inicialState })

    const changeContact = (event) => {
        const user = { ...contact.user }
        user[event.target.name] = event.target.value
        setContact({ user })
    }

    async function submitContact(e) {
        e.preventDefault()

        const user = {...contact.user}
        
        await baseApiUrl
            .post('/contactus', user)
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err.response.data))
    }
    return (
        <div className="contact-page">
            <div className="contact-content">
                <form className="contact-form" onSubmit={e => submitContact(e)}>
                    <h1 className="contact-title">Entre em contato</h1>

                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        name="name"
                        className="default-contact-input other-inputs"
                        onChange={e => changeContact(e)}
                    />

                    <label htmlFor="email">E-mail:</label>
                    <input 
                        type="text"
                        name="email"
                        className="default-contact-input other-inputs"
                        onChange={e => changeContact(e)}
                    />

                    <label htmlFor="subject">Assunto:</label>
                    <textarea 
                        type="text"
                        name="subject"
                        className="default-contact-input subject-input"
                        onChange={e => changeContact(e)}    
                    />

                    <div className="contact-button">
                        <Button title="Enviar" type="submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ContactUs