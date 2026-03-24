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
  <div className="max-w-7xl mx-auto px-6 py-12">
   
      
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Your Analysis History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {history.map((item) => (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-blue-500 transition-colors" key={item._id}>
          <h3 className="text-3xl font-bold text-blue-400 mb-4">Score: {item.matchScore}%</h3>
          <p className="text-slate-400 text-sm mb-4">Missing Skills: {item.missingSkills.join(', ')}</p>
          <p className="text-slate-500 text-xs text-right mt-4 pt-4 border-t border-slate-700">{new Date(item.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
    </div>
    </div>
    
  )}

export default History  