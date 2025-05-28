import React , {createContext,useState,useContext} from "react";
const FormContext = createContext();

export function FormProvider({ children }){
    const [formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        wheels:null,
        typeId:null,
        vehicleId:null,
        startDate:null,
        endDate:null
    });
    const updateFormData = (updates)=>{
         setFormData((prev) => ({ ...prev, ...updates }));
    };

    return (
        <FormContext.Provider value ={{ formData , updateFormData}}>
            {children}
        </FormContext.Provider>
    );
}

export function useForm(){
    return useContext(FormContext);
}