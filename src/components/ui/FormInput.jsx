function FormInput({label,name,value,onChange,type="text",error,required=false}){
    return(
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium mb-1">
                {label}{required && <span className="text-red-600">*</span>}

            </label>

            <input  
             id={name}
             name={name}
             type={type}
             value={value}
             onChange={onChange}
             className={`w-full border rounded px-3 py-2 bg-white ${
                error ? "border-red-500":"border-gray-300"

             }`}
             />
             {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

        </div>
    );
}
export default FormInput;