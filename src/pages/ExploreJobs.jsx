import useJobs from "../hooks/useJobs.js";
import { useApplications } from "../context/ApplicationContext.jsx";
import JobCard from "../components/jobs/JobCard.jsx";
import JobCardSkeleton from "../components/jobs/JobCardSkeleton.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";

function ExploreJobs() {
  const { jobs, loading, error, retry } = useJobs();
  const { applications, addApplication } = useApplications();

  function isSaved(job) {
    return applications.some((app) => app.jobUrl === job.url);
  }

  function handleSave(job) {
    addApplication({
      company: job.companyName,
      role: job.jobTitle,
      status: "Applied",
      appliedDate: new Date().toISOString().slice(0, 10),
      interviewDate: "",
      salaryMin: job.salaryMin ?? "",
      salaryMax: job.salaryMax ?? "",
      jobUrl: job.url,
    });
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Explore Jobs</h1>
        <p className="text-gray-500 text-sm">
          Live remote jobs from{" "}
          <a href="https://jobicy.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Jobicy
          </a>
        </p>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <JobCardSkeleton key={n} />
          ))}
        </div>
      ) : error ? (
        <div className="bg-white rounded-lg shadow p-10 text-center">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button onClick={retry} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Try again
          </button>
        </div>
      ) : jobs.length === 0 ? (
        <EmptyState title="No jobs found" message="Please check back later." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} isSaved={isSaved(job)} onSave={handleSave} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ExploreJobs;