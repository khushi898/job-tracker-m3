function StatCard({label,value,color="text-gray-900"}){
    return(
        <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">{label}</p>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
    );
}
export default StatCard;