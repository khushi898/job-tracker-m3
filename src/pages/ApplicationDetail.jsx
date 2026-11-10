import { useState } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import { useApplications } from "../context/ApplicationContext.jsx";
import { STATUSES } from "../constants.js";
import StatusBadge from "../components/ui/StatusBadge.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import ConfirmModal from "../components/ui/ConfirmModal.jsx";
import NotesTimeline from "../components/applications/NotesTimeline.jsx";

function formatSalary(min,max){
    if(!min && !max) return "Not specified!";
    if(min && max) return `£${Number(min || max).toLocaleString()}`;

}
function ApplicationDetail(){
    const {id}=useParams();
    const navigate=useNavigate();
    const {applications,updateApplication,deleteApplication,addNote}=useApplications();
    const [showDelete,setShowDelete]=useState(false);
    const app=applications.find((item)=>item.id===id);

    if(!app){
        return(
            <EmptyState
            title="Application not found"
            message="It may have been deleted"
            actionText="Back to applications"
            actionTo="/applications"
            />
        );
    }

    function handleDelete(){
        deleteApplication(app.id);
        navigate(".applications");
    }
    return(
        <>
        <div className="max-w-3xl mx-auto space-y-6">
            <Link to="/applications" className="text-blue-600 hover:underline">
            Back to applications</Link>
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-6">

                </div>
                <h1 className="text-2xl font-bold">{app.role}</h1>
                <p className="text-lg text-gray-600">{app.company}</p>

            </div>

            <dl className="grid gap-4 sm:grid-cols-2 mb-6">
                <div>
                    <dt className="text-sm text-gray-500">Applied Date</dt>
                    <dd>{app.appliedDate}</dd>
                </div>
                <div>
                    <dt className="text-sm text-gray-500">Interview date</dt>
                    <dd>{app.interviewDate ||"Not Scheduled"}</dd>
                </div>

                <div>
                    <dt className="text-sm text-gray-500">Salary Range</dt>
                    <dd>{formatSalary(app.salaryMin,app.salaryMax)}</dd>
                </div>
                <div>
                    <dt className="text-sm text-gray-500">Change Status</dt>
                    <dd>
                        <select 
                        value={app.status}
                        onChange={(event)=>updateApplication(app.id,{status:event.target.value})}
                        className="border rounded px-2 py-1 mt-1"
                        >
                            {STATUSES.map((status)=>(
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </dd>
                </div>
            </dl>

            <div className="flex gap-3">
                <Link to={`/applications/${app.id}/edit`}
                className="px-4 py-2 rounded border hover:bg-gray-100"
                >
                   Edit
                </Link>
                <button onClick={()=>setShowDelete(true)}
                className="px-4 py-2 rounded border border-red-300 text-red-600 hover:bg-red-50"
                >
                    Delete
                </button>
            </div>

        </div>
    <NotesTimeline notes={app.notes} onAddNote={(text)=>addNote(app.id,text)}/>
    <ConfirmModal 
    isOpen={showDelete}
    title="Delete application"
    message={`This will permanently delete ${app.company} and all its notes.`}
    onConfirm={handleDelete}
    onCancel={()=>setShowDelete(false)}
    />
        </>
                         ) ;

}
export default ApplicationDetail;