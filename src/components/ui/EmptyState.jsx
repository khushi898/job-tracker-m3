import { Link } from "react-router-dom";

function EmptyState({title,message,actionText,actionTo}){
    return(
        <div className="bg-white rounded-lg shadow p-10 text-center">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-gray-500 mb-4">{message}</p>
            {actionText && (
                <Link
                 to={actionTo}
                 className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                 >
                    {actionText}
                 </Link>
            )}
        </div>
    );
}
export default EmptyState;