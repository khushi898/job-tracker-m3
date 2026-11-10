import { useState,useEffect } from "react";

const API_URL="https://jobicy.com/api/jobs?count=50";
const CACHE_KEY="jt-jobs";

function useJobs(){
    const[jobs,setJobs]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState("");
    const[reloadKey,setReloadKey]=useState(0);

    useEffect(()=>{
        let ignore=false;

        async function loadJobs(){
            try{
                const cached=sessionStorage.getItem(CACHE_KEY);
                if(cached&&reloadKey===0){
                    setJobs(JSON.parse(cached));
                    return;
                }
                const response=await fetch(API_URL);
                if(!response.ok) throw new Error("Requested failed");
                const data=await response.json();
                if(!ignore){
                    setJobs(data.jobs);
                    sessionStorage.setItem(CACHE_KEY,JSON.stringify(data.jobs));

                }

            }catch{
                if(!ignore) setError("Could not load jobs. Check your connection and try again.");

            }finally{
                if(!ignore) setLoading(false);
            }
        }
        loadJobs();

        return()=>{
            ignore=true;
        };
    },[reloadKey]);

    function retry(){
        setLoading(true);
        setError("");
        setReloadKey((key)=>key + 1);
    }
    return {jobs,loading,error,retry};

}
export default useJobs;