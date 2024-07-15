import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext()

const FAKE_USER = {
    name: "ƴσɳӃσ亗😈✨",
    email: "Heedrhiss@example.com",
    password: "heedrhiss",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

const initialState = {
    isAuth : false,
    user : null
}


function AuthProvider({children}){

    function reducer(state, action){
        switch(action.type){
            case 'login' : return{...state, user: action.payload, isAuth: true}
            case 'logout': return{initialState}
            default: throw new Error("Unknown action type")
        }}

const [{isAuth, user }, dispatch] = useReducer(reducer, initialState)

function login(email, password){
    if (email === FAKE_USER.email && password=== FAKE_USER.password) dispatch({type: 'login', payload: FAKE_USER})
}

function logout (){
    dispatch({type: 'logout'})
}

return <AuthContext.Provider value={{user, isAuth, login, logout}}>
    {children}
</AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext)
    if(context == undefined) throw new Error("Auth context was used outside Auth Provider")
    return context

}
export {AuthProvider, useAuth}