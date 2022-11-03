import { createContext, useReducer } from "react";

const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': 
            return { user: action.payload }
        
        case 'LOGOUT': 
            return { user: null }
        
        default: 
            return state
    }
}


export const AuthProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(authReducer, {
        user: null
    })

    console.log('Auth Context State: ' , state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;