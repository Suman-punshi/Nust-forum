import { useAuthContext } from "./useAuthContext";


export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        // removing user from local storage
        localStorage.removeItem('user');

        // dispatch logout action
        dispatch({type: 'LOGOUT'});
    }
    return {logout};
}