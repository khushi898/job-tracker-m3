function JobCard({job,isSaved,onSave}){
    return(
        <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
            <h2 className="font-semibold">{job.jobTitle}</h2>
            <p className="text-gray-600">{job.companyName}</p>
            <p className="text-sm text-gray-500">
                {job.jobGeo}. Posted {job.pubDate?.slice(0,10)}

            </p>

            <div className="flex gap-2 mt-auto pt-2">
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded border text-sm hover:bg-gray-100"
                  >
                    View Job
                  </a>

                  <button 
                    onClick={()=>onSave(job)}
                    disabled={isSaved}
                    className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isSaved ? "Saved" : "Save to tracker"}

                    </button>
            </div>
        </div>
    )
}
export default JobCard;