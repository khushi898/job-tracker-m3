import { useState } from "react";
import { Navigate,useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Login(){
    const[name,setName]=useState("");
    const[error,setError]=useState("");
    const {user,login}=useAuth();
    const navigate=useNavigate();

    if(user){
        return <Navigate to="/dashboard" replace/>;

    }

    function handleSubmit(event){
       event.preventDefault();
       if(name.trim()===""){
        setError("Please enter your name");
        return;
       }
       login(name.trim());
       navigate("/dashboard");
    }

    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-1">Welcome to JobTracker</h1>
                <p className="text-gray-500 mb-4">Enter your name to continue</p>
             
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event)=>setName(event.target.value)}
              className="w-full border rounded px-3 py-2 mb-2"
              />

              {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Log in
              </button>
            </form>
        </div>
    )
}
export default Login;