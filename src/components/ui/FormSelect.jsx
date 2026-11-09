function FormSelect({label,name,value,onChange,options}){
    return(
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium mb-1">
                {label}

            </label>

            <select  
             id={name}
             name={name}
             value={value}
             onChange={onChange}
             className="w-full border rounded px-3 py-2 bg-white" >
                {options.map((option)=>(
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
                </select>
                </div>
      
    );
}
export default FormSelect;