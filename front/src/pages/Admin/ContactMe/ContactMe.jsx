import './ContactMe.css'

import { useEffect, useState } from 'react'

import ContactModel from './ContactModel/ContactModel'
import Button from '../../../components/Button/Button'

import baseApiUrl from '../../../services/api'
import history from '../../../Main/history'

const ContactMe = props => {

    const [contacts, setContacts] = useState([])

    const seenContact = async(id) => {
        await baseApiUrl
            .put(`contactus/${id}`)
            .then(_ => console.log('Menssagem lida'))
            .catch(err => console.warn(err.response))
    }

    useEffect(() => {
        const getContacts = async() => {
            await baseApiUrl
                .get('/contactus')
                .then(resp => setContacts([...resp.data]))
                .catch(err => console.warn(err.response))
        }

        getContacts()
    }, [])


    return(
        <div className="contactme-content">
            {
                contacts.map(contact => {
                    return(
                        <ContactModel 
                            key={contact.id}
                            name={contact.name}
                            email={contact.email}
                            subject={contact.subject}
                            eraser={e => seenContact(contact.id)}
                        />
                    )
                })
            }

            <Button title="Voltar" onClick={e => history.push('/admin/home')}></Button>
        </div>
    )
}

export default ContactMe