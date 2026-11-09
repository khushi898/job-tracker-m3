import {useParams} from "react-router-dom";

function ApplicationDetail(){
    const {id}=useParams();
    return <h1 className="text-2xl font-bold">Application {id}</h1>;

}
export default ApplicationDetail;