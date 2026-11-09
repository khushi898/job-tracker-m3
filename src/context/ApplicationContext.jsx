import { createContext,useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

const ApplicationContext=createContext(null);

export function ApplicationProvider({children}){
    const [applications,setApplications]=useLocalStorage("jt-applications",[]);

    function addApplication(data){
        const newApp={...data,id:crypto.randomUUID(),notes:[]};
        setApplications((prev)=>[...prev,newApp]);
        return newApp.id;
    }

    function updateApplication(id,changes){
        setApplications((prev)=>
        prev.map((app)=>(app.id===id?{ ...app, ...changes}:app))
    );
    }
    function deleteApplication(id){
        setApplications((prev)=>prev.filter((app)=>app.id!==id));

    }
    function addNote(id,text){
        const note={id:crypto.randomUUID(),text,date:new Date().toISOString()};
        setApplications((prev)=>
        prev.map((app)=>(app.id===id?{ ...app, notes:[...app.notes,note]}:app))
    );
    }

    return(
        <ApplicationContext.Provider
        value={{applications,addApplication,updateApplication,deleteApplication,addNote}}
        >
            {children}
        </ApplicationContext.Provider>
    );
}
export function useApplications(){
    return useContext(ApplicationContext);
}