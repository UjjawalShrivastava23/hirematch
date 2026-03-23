import { useState } from "react";
import axios from 'axios'

function Analyze(){
    const[selectedfiles , setselectedfiles] = useState('')
    const [jobdescription , setjobdescription] = useState('')
    const [Result , setResult]=useState('')
    async function handlesubmit() {
        try{
        const formData = new FormData()
        formData.append('resume', selectedfiles)
        formData.append('job_description', jobdescription)
        
        const token = localStorage.getItem('token')
        const response = await axios.post('http://localhost:8000/api/analysis/run', formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setResult(response.data)
      }catch(error){

      }}
  return(
    <div>
        <input type="file" onChange={(e) => setselectedfiles(e.target.files[0])}  />
        <textarea value={jobdescription} onChange={(e) => setjobdescription(e.target.value)} />
        <button onClick={handlesubmit}> Analyze </button>
        {Result && (
  <div>
    <h2>Match Score: {Result.score}%</h2>
    <h3>Matched Skills:</h3>
    <p>{Result.matched_skills.join(', ')}</p>
    <h3>Missing Skills:</h3>
    <p>{Result.missing_skills.join(', ')}</p>
  </div>
)}
    </div>
  )   
}

export default Analyze