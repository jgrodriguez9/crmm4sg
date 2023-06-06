import { useState } from "react"
import ViewLeadInformation from "./LeadInformation/ViewLeadInformation"
import FormLeadInformation from "./LeadInformation/FormLeadInformation"

const LeadInformation = () => {
    const [editMode, setEditMode] = useState(false)
    return (
        <>
        {
            editMode ? 
            <FormLeadInformation editMode={editMode} setEditMode={setEditMode}/> : 
            <ViewLeadInformation editMode={editMode} setEditMode={setEditMode}/>
        }
        </>
    )
    
}

export default LeadInformation