import { useState,useMemo } from "react";
import { Link } from "react-router-dom";
import { useApplications } from "../context/ApplicationContext.jsx";
import ApplicationCard from "../components/applications/ApplicationCard.jsx";
import ApplicationFilters from "../components/applications/ApplicationFilters.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";

function Applications(){
    const {applications,updateApplication,deleteApplication}=useApplications();
    const[search,setSearch]=useState("");
    const[statusFilter,setStatusFilter]=useState("All");
    const[sortBy,setSortBy]=useState("newest");

    const visibleApplications=useMemo(()=>{
        const text=search.trim().toLowerCase();
        const result=applications.filter((app)=>{
            const matchesSearch=app.company.toLowerCase().includes(text);
            const matchesStatus=statusFilter==="All"||app.status===statusFilter;
            return matchesSearch && matchesStatus;
        });

        return result.sort((a,b)=>
        sortBy==="newest"
    ? b.appliedDate.localeCompare(a.appliedDate)
    : a.appliedDate.localeCompare(b.appliedDate)
);
    },[applications,search,statusFilter,sortBy]);


    function handleStatusChange(id,status){
        updateApplication(id,{status});
    }
    return(
        <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h1 className="text-2xl font-bold">My Applications</h1>
                <Link
                  to="/applications/new"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    +Add Application
                  </Link>
            </div>
            {applications.length===0?(
                <EmptyState
                title="No application yet"
                message="Add your first job application to start tracking your job hunt."
                actionText="+Add application"
                actionTo="/application/new"
                />
            )
        :
        (
            <>
            <ApplicationFilters
            search={search}
            onSearchChange={setSearch}
            status={statusFilter}
            onStatusChange={setStatusFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            />
            {visibleApplications.length===0 ?(
                <EmptyState
                title="No matching applications"
                message="Try a different search or status filter."
                />
            ):
            (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleApplications.map((app)=>(
                        <ApplicationCard
                        key={app.id}
                        application={app}
                        onStatusChange={handleStatusChange}
                        onDelete={deleteApplication}
                        />
                    ))}
                </div>
            )}
            </>
        )}
        </div>
       
    );
}

export default Applications;
