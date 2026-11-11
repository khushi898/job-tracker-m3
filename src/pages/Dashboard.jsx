import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useApplications} from "../context/ApplicationContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import StatCard from "../components/ui/StatCard.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";

function Dashboard(){
    const {applications}=useApplications();
    const {user}=useAuth();

    const stats=useMemo(()=>{
        const count=(status)=>applications.filter((app)=>app.status===status).length;
        const total=applications.length;
        const responded=applications.filter((app)=>app.status!=="Applied").length;

        return{
            total,
            applied: count("Applied"),
            interview: count("Interview"),
            offer: count("Offer"),
            rejected: count("Rejected"),
            responseRate: total===0?0:Math.round((responded/total)*100),
        };

    },[applications]);

    const today=new Date().toISOString().slice(0,10);
    const upcoming=applications
    .filter((app)=>app.interviewDate && app.interviewDate>=today)
    .sort((a,b)=>a.interviewDate.localeCompare(b.interviewDate))
    .slice(0,5);

    if(applications.length===0){
        return(
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Welcome, {user}!</h1>
                <EmptyState
                title="No application yet"
                message="Add your first application or explore live jobs to get started."
                actionText="+Add application"
                actionTo="/applications/new"
                />

            </div>


        );
    }
    return(
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Welcome back, {user}!</h1>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
                <StatCard label="Total applications" value={stats.total}/>
                <StatCard label="Applied" value={stats.applied} color="text-blue-600"/>
                <StatCard label="Interview" value={stats.interview} color="text-yellow-600"/>
                <StatCard label="Offer" value={stats.offer} color="text-green-600"/>
                <StatCard label="Rejected" value={stats.Rejected} color="text-red-600"/>
                <StatCard label="Response Rate" value={`${stats.responseRate} $`}/>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Upcoming interviews</h2>

                {upcoming.length===0?(
                    <p className="text-gray-500">
                        No Upcoming interviews. Add an interview date to anapplication to see it here.</p>
                ):(
                    <ul className="divide-y">
                        {upcoming.map((app)=>(
                            <li key={app.id} className="py-3 flex flex-wrap items-centre justify-between gap-2">
                                <Link to={`/applications/${app.id}`} className="font-medium hover:underline">
                                {app.role} at {app.company}
                                </Link>

                                <span className="text-sm text-gray-600">{app.interviewDate}</span>
                            </li>
                        ))}
                        </ul>
                )}
            </div>
        </div>
    )
}
export default Dashboard;