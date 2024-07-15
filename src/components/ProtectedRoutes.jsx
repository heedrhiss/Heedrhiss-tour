import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useEffect } from "react"

function ProtectedRoutes({children}) {
    const {isAuth} = useAuth()
    const navigate = useNavigate()

    useEffect(function(){
        if(!isAuth) navigate('/login')
    },[isAuth, navigate])

    if (isAuth) return children
}

export default ProtectedRoutes
