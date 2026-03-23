import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function History(){
    const[history , sethistory]=useState([])
    useEffect(()=>{
        async function fetchhistory(){
            const token = localStorage.getItem('token')
        const response =  await axios.get('http://localhost:8000/api/analysis/history' ,{
         headers : {Authorization : `Bearer ${token}`}})
         sethistory(response.data)
    }
    fetchhistory()
},[])
  

return (
    <div>
      <h1>Your Analysis History</h1>
      {history.map((item) => (
        <div key={item._id}>
          <h3>Score: {item.matchScore}%</h3>
          <p>Missing Skills: {item.missingSkills.join(', ')}</p>
          <p>{new Date(item.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  )}

export default History  