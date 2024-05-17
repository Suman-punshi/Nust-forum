import { createContext, useReducer, useEffect} from "react";

export const authContext = createContext(); // creating conterxt that will wrap entire app

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload}; // on login assign user the payload in action object
        case 'LOGOUT':
            return {user: null}; // on logout assign user as null
        default:
            return state; // if none matches, return the last state sent to this function
    }
} 

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    useEffect( () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({type: 'LOGIN', payload: user})
        } 
    }, []);


   

    console.log('AuthContext state: ', state);

    return (
        <authContext.Provider value = {{...state, dispatch}}>
            { children } 
        </authContext.Provider>
    )
}

