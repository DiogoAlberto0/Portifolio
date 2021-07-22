import './Home.css'

import history from '../../Main/history'

import Button from '../../components/Button/Button'
import { useEffect, useState } from 'react'

import baseApiUrl from '../../services/api'

function Home( props ) {

    const [homeText, setHomeText] = useState({})

    useEffect(() => {
        baseApiUrl.get('/home/1')
            .then(resp => setHomeText(...resp.data))
            .catch(err => console.warn(err))
    }, [])

    function redirectTo() {
        history.push('/projects')
    }
    return(
        <div className="background-image-one">
            <div className="content-home">
                <h1>Diogo Alberto</h1>
                <p>{homeText.text}</p>
                <Button title="Projetos" onClick={redirectTo}/>
            </div>
        </div>
    )
}

export default Home