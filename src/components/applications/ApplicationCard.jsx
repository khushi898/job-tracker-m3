import { Link } from "react-router-dom";
import StatusBadge from "../ui/StatusBadge.jsx";
import { STATUSES } from "../../constants.js";

function ApplicationCard({ application, onStatusChange, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="font-semibold text-lg">{application.role}</h2>
          <p className="text-gray-600">{application.company}</p>
        </div>
        <StatusBadge status={application.status} />
      </div>

      <p className="text-sm text-gray-500">Applied: {application.appliedDate}</p>

      <label className="text-sm">
        Status:
        <select
          value={application.status}
          onChange={(event) => onStatusChange(application.id, event.target.value)}
          className="border rounded px-2 py-1 ml-2"
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      <div className="flex gap-2 mt-auto">
        <Link
          to={`/applications/${application.id}`}
          className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          View
        </Link>
        <Link
          to={`/applications/${application.id}/edit`}
          className="px-3 py-1 rounded border text-sm hover:bg-gray-100"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(application.id)}
          className="px-3 py-1 rounded border border-red-300 text-red-600 text-sm hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ApplicationCard;