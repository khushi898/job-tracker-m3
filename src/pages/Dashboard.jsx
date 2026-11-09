import { useApplications } from "../context/ApplicationContext.jsx";

function Dashboard(){
    const {applications,addApplication}=useApplications();

    function addTest(){
        addApplication({
            company:"Test Company",
            role:"Frontend Developer",
            status:"Applied",
            appliedDate:"2026-11-1",
            interviewDate:"",
            salaryMin:30000,
            salaryMax:40000,
        });
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="mb-4">You have {applications.length} applications.</p>
            <button onClick={addTest} className="bg-blue-600 text-white px-4 py-2 rounded">
                Add test application
            </button>
        </div>
    )
}
export default Dashboard;