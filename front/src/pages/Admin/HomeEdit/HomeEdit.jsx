import './HomeEdit.css'

import Button from '../../../components/Button/Button'

import baseApiUrl from '../../../services/api'

import history from '../../../Main/history'
import { useEffect, useState } from 'react'

const HomeEdit = props => {

    const [ homeContent, setHomeContent] = useState('')

    async function submitHome(e) {
        e.preventDefault()

        const text = homeContent

        await baseApiUrl
            .put('/home/1', {text})
            .then(resp => console.log(resp))
            .catch(err => console.log(err.response.data))
    }

    async function getHomeText() {
        await baseApiUrl
            .get('/home/1')
            .then(resp => setHomeContent(resp.data[0].text))
            .catch(err => console.log(err.response))
    }

    const changeValue = (e) => {
        var text = ''
        text = e.target.value
        setHomeContent(text)
    }

    useEffect(() => {
        getHomeText()
    }, [])
    return(
        <div className="home-edit">
            <h1>home edit</h1>
            <form className="home-form" onSubmit={e => submitHome(e)} wrap="hard">
                <textarea 
                    type="text"
                    name="text"
                    value={homeContent}
                    className="home-edit-input"
                    onChange={e => changeValue(e)}
                />
                <Button title="Salvar" type="submit"/>
                <br />
            </form>
                <Button title="voltar" onClick={e => history.push('/admin/home')}></Button>
        </div>
    )
}

export default HomeEdit