import { createContext,useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

const AuthContext=createContext(null);
export function AuthProvider({ children}){
    const[user,setUser]=useLocalStorage("jt-user",null);

    function login(name){
        setUser(name);
    }
    function logout(){
        setUser(null);
    }
    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth(){
    return useContext(AuthContext);
}