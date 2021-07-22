import './Singin.css'

import { useContext, useState } from 'react'

import Button from '../../components/Button/Button'

import { Context } from '../../Context/AuthContext'

// import baseApiUrl from '../../services/api'

const inicialState = {
    user: {
        email: '',
        password: ''
    }
}
function Singin(props) {
    
    //alterar estado do usuario apartir do formulario
    const [userState, setUserState] = useState({...inicialState})
    
    function changeUser(event) {
        const user = {...userState.user}
        user[event.target.name] = event.target.value
        setUserState({user})
    }

    //usando contexto de autenticação
    const {sendToSingin} = useContext(Context)

    return(
        <div className="background-image-one">
            <div className="singin-content">
                <h1 className="singin-title">Fazer login</h1>
                <form className="singin-form" onSubmit={e => sendToSingin(e, userState)}>
                    <input
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        className="singin-input"
                        onChange={(e) => changeUser(e)}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Senha"
                        className="singin-input"
                        onChange={(e) => changeUser(e)}
                    />
                    <Button title="Entrar" type="submit"/>
                    <p>Ainda não esta cadastrado? clique aqui.</p>
                </form>
            </div>
        </div>
    )
}

export default Singin