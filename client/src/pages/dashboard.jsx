import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
function Dashboard(){
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/login', { replace: true })
        }
      }, [navigate])
   const storedUser = localStorage.getItem('user')
   const user = storedUser ? JSON.parse(storedUser) : null
   return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name || user?.email || 'Candidate'} 👋</h1>
          <p className="text-slate-400 mt-2">Ready to land your next role? Let's check your resume fit.</p>
        </div>
        <button 
          onClick={() => navigate('/analyze')}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
        >
          + New Analysis
        </button>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Total Analyses Run</h3>
          <p className="text-3xl font-bold text-white">--</p>
        </div>
        
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Average Match Score</h3>
          <p className="text-3xl font-bold text-blue-400">--%</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
          <h3 className="text-slate-400 text-sm font-medium mb-2">System Status</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <p className="text-lg font-bold text-slate-200">ML Engine Online</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard
