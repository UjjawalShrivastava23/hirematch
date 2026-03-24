
import { useNavigate } from "react-router-dom";
function Navbar(){
const navigate = useNavigate()
 function Logout(){

   
    localStorage.removeItem('token' ),
    localStorage.removeItem('user',)
    
    navigate('/login')
}

return(
    <nav className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
      <span className="text-blue-400 font-bold text-xl cursor-pointer" onClick={() => navigate('/dashboard')}>
        HireMatch 🎯
      </span>
      <div className="flex items-center gap-6">
        <span className="text-slate-300 hover:text-white cursor-pointer text-sm" onClick={() => navigate('/analyze')}>Analyze</span>
        <span className="text-slate-300 hover:text-white cursor-pointer text-sm" onClick={() => navigate('/history')}>History</span>
        <button onClick={Logout} className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-4 py-2 rounded-lg transition-colors">
          Logout
        </button>
      </div>
    </nav>

)}
export default Navbar