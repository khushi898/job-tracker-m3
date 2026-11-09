import { useState } from "react";
import { useNavigate,useParams} from "react-router-dom";
import { useApplications } from "../context/ApplicationContext.jsx";
import {STATUSES} from "../constants.js";
import FormInput from "../components/ui/FormInput.jsx";
import FormSelect from "../components/ui/FormSelect.jsx";

const emptyForm={
    company:"",
    role:"",
    status:"Applied",
    appliedDate:"",
    interviewDate:"",
    salaryMin:"",
    salaryMax:"",
};

function ApplicationForm(){
    const {id}=useParams();
    const navigate=useNavigate();
    const {applications,addApplication,updateApplication,addNote}=useApplications();

    const isEdit=Boolean(id);
    const existing=applications.find((app)=>app.id===id);
    const[form,setForm]=useState(existing ?? emptyForm);
    const [firstNote,setFirstNote]=useState("");
    const [errors,setErrors]=useState({});
    if(isEdit && !existing){
        return <p className="text-gray-600">Application not found!</p>;

    
}
function handleChange(event){
    const {name,value}=event.target;
    setForm((prev)=>({...prev,[name]:value}));
}


function validate(){
    const newErrors={};
    if(form.company.trim()==="")newErrors.company="Company is required";
    if(form.role.trim()==="")newErrors.role="Role is required";
    if(form.appliedDate==="")newErrors.appliedDate="Applied date is required";
    if(
        form.salaryMin!=="" &&
        form.salaryMax!=="" &&
        Number(form.salaryMax)<Number(form.salaryMin)

    ){
        newErrors.salaryMax="Max salary must be more than min salary";

    }
    return newErrors;
}
function handleSubmit(event){
    event.preventDefault();
    const newErrors=validate();
    setErrors(newErrors);
    if(Object.keys(newErrors).length>0) return;

    if(isEdit){
        updateApplication(id,form);
        navigate(`/applications/${id}`);

    }else{
        const newId=addApplication(form);
        if(firstNote.trim()!==""){
            addNote(newId,firstNote.trim());
        }
        navigate(`/applications/${newId}`);
    }
}

return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Application" : "Add Application"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-x-4 sm:grid-cols-2">
          <FormInput label="Company" name="company" value={form.company}
            onChange={handleChange} error={errors.company} required />
          <FormInput label="Role" name="role" value={form.role}
            onChange={handleChange} error={errors.role} required />
          <FormSelect label="Status" name="status" value={form.status}
            onChange={handleChange} options={STATUSES} />
          <FormInput label="Applied date" name="appliedDate" type="date"
            value={form.appliedDate} onChange={handleChange} error={errors.appliedDate} required />
          <FormInput label="Interview date (if any)" name="interviewDate" type="date"
            value={form.interviewDate} onChange={handleChange} />
          <div />
          <FormInput label="Salary min (£)" name="salaryMin" type="number"
            value={form.salaryMin} onChange={handleChange} />
          <FormInput label="Salary max (£)" name="salaryMax" type="number"
            value={form.salaryMax} onChange={handleChange} error={errors.salaryMax} />
        </div>

        {!isEdit && (
          <div className="mb-4">
            <label htmlFor="firstNote" className="block text-sm font-medium mb-1">
              Notes (optional)
            </label>
            <textarea
              id="firstNote"
              value={firstNote}
              onChange={(event) => setFirstNote(event.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        )}

        <div className="flex gap-3">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {isEdit ? "Save changes" : "Add application"}
          </button>
          <button type="button" onClick={() => navigate(-1)}
            className="px-4 py-2 rounded border hover:bg-gray-100">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}


export default ApplicationForm;