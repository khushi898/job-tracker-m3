import { useApplications } from "../context/ApplicationContext.jsx";

function Dashboard(){
    const {applications}=useApplications();

 

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="mb-4">You have {applications.length} applications.</p>
           
        </div>
    )
}
export default Dashboard;