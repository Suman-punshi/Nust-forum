import { authContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(authContext);

    if (!context){
        throw Error('useAuthContext must be inside an AuthContextProvider');
    }

    return context;
}