import { STATUSES } from "../../constants.js";

function ApplicationFilters({ search, onSearchChange, status, onStatusChange, sortBy, onSortChange }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="Search by company..."
        aria-label="Search by company"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className="flex-1 border rounded px-3 py-2"
      />

      <select
        aria-label="Filter by status"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="All">All statuses</option>
        {STATUSES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        aria-label="Sort by date"
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>
  );
}

export default ApplicationFilters;