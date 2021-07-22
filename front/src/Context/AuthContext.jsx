import { createContext, useState } from "react"

import baseApiUrl from '../services/api'

import history from '../Main/history'

const inicialState = {
    user: {
        id: undefined,
        iat: undefined,
        exp: undefined,
        token: ''
    },
    authenticated: false
}


export const Context = createContext({})

const AuthContextProvider = props => {

    const [ userAuthenticated, setUserAuthenticated ] = useState({...inicialState})

    async function sendToSingin(event, userState) {
        event.preventDefault()

        const user = {...userState.user}

        await baseApiUrl.post('/singin', user)
            .then(resp => handleLogin(resp.data))
            .catch(err => console.error(err.response.data))
    }

    async function handleLogin(user) {
        setUserAuthenticated({user, authenticated:true})
        localStorage.setItem('token', user.token)
        baseApiUrl.defaults.headers.authorization = `Bearer ${user.token}`
        history.push('/admin/home')
    }
    async function handleLogout() {
        setUserAuthenticated({...inicialState})
        localStorage.setItem('token', '')
        baseApiUrl.defaults.headers.authorization = ``
        history.push('/singin')
    }


    function getUser() {
        const token = localStorage.getItem('token')
        baseApiUrl.defaults.headers.authorization = `Bearer ${token}`
    }




    return(
        <Context.Provider value={{sendToSingin, userAuthenticated, handleLogout, getUser}}>
            {props.children}
        </Context.Provider>
    )
}

export default AuthContextProvider