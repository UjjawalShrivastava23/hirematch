import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api, { getErrorMessage } from "../lib/api";

function History(){
    const[history , sethistory]=useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    useEffect(()=>{
        async function fetchhistory(){
            setErrorMessage('')
            const token = localStorage.getItem('token')

            if (!token) {
              navigate('/login', { replace: true })
              return
            }

        try {
          const response =  await api.get('/analysis/history' ,{
           headers : {Authorization : `Bearer ${token}`}})
           sethistory(response.data)
        } catch (error) {
          setErrorMessage(getErrorMessage(error, 'Unable to load your history right now.'))
        }
    }
    fetchhistory()
},[navigate])
  

return (
  <div className="max-w-7xl mx-auto px-6 py-12">
   
      
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Your Analysis History</h1>
      {errorMessage && <p className="text-sm text-red-400 mb-6">{errorMessage}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {history.map((item) => (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-blue-500 transition-colors" key={item._id}>
          <h3 className="text-3xl font-bold text-blue-400 mb-4">Score: {item.matchScore}%</h3>
          <p className="text-slate-400 text-sm mb-4">Missing Skills: {item.missingSkills.join(', ')}</p>
          <p className="text-slate-500 text-xs text-right mt-4 pt-4 border-t border-slate-700">{new Date(item.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
    {!errorMessage && history.length === 0 && (
      <p className="text-slate-400 mt-6">No analyses yet. Run your first resume check from the Analyze page.</p>
    )}
    </div>
    </div>
    
  )}

export default History  
