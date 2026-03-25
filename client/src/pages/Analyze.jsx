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
        const response = await axios.post('https://hirematch-backend.onrender.com/api/analysis/run', formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setResult(response.data)
      }catch(error){

      }}
      return (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Analyze Resume Fit</h2>
            
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-slate-400 text-sm mb-2">Upload Resume (PDF)</label>
                <input 
                  type="file" 
                  onChange={(e) => setselectedfiles(e.target.files[0])}  
                  className="w-full text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                />
              </div>
    
              <div>
                <label className="block text-slate-400 text-sm mb-2">Job Description</label>
                <textarea 
                  value={jobdescription} 
                  onChange={(e) => setjobdescription(e.target.value)} 
                  placeholder="Paste the job description here..."
                  className="w-full bg-slate-900 border border-slate-600 text-white placeholder-slate-500 rounded-xl p-4 h-40 focus:outline-none focus:border-blue-500"
                />
              </div>
    
              <button 
                onClick={handlesubmit} 
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-colors w-full"
              >
                Analyze Match
              </button>
            </div>
          </div>
    
          {Result && (
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-8 border-b border-slate-700 gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Analysis Complete</h2>
                  <p className="text-slate-400 text-sm mt-1">Here is how your resume stacks up against the JD.</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-5xl font-bold text-blue-400">{Result.score}%</p>
                  <p className="text-slate-400 text-sm mt-1">Match Score</p>
                </div>
              </div>
    
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Matched Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Result.matched_skills.length > 0 ? (
                      Result.matched_skills.map((skill, index) => (
                        <span key={index} className="bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-slate-500 text-sm">No exact matches found.</p>
                    )}
                  </div>
                </div>
    
                <div>
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Missing Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Result.missing_skills.length > 0 ? (
                      Result.missing_skills.map((skill, index) => (
                        <span key={index} className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-slate-500 text-sm">No missing skills detected.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )  
}

export default Analyze