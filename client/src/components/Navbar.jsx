
import { useNavigate } from "react-router-dom";
function Navbar(){
const navigate = useNavigate()
 function Logout(){

   
    localStorage.removeItem('token' ),
    localStorage.removeItem('user',)
    
    navigate('/login')
}

return(
    <div>

    <span>Hirematch🎯</span>
    <button onClick={Logout}>Logout</button>
    </div>

)}
export default Navbar