import {useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


function Register(){
    const [ name , setName ] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const navigate = useNavigate()

  async  function clickSubmit(){
    try{
        const response = await axios.post('http://localhost:8000/api/auth/register',{
            name : name,
            email : email,
            password : password
        })
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        console.log(response.data)
        navigate('/dashboard')
    }
     catch(error){} }
    return(
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md">
              <h1 className="text-2xl font-bold text-white mb-2">Create your Account</h1>
              <p className="text-slate-400 text-sm mb-6">Sign up to your HireMatch account</p>

             <div className="flex flex-col gap-4">
            
            <input 
            type = "name"
            placeholder="Name"
            value={name} 
            onChange={(n)=> setName(n.target.value)} 
            className="bg-slate-900 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"/>
            <input value= {email}
            type="email"
            placeholder="Email"
            onChange={(e)=> setEmail(e.target.value)} 
            className="bg-slate-900 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"/>
            <input value={password} 
            type="password"
            placeholder="Password"
            onChange={(p)=> setPassword(p.target.value)}
            className="bg-slate-900 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"/>
             
            <button onClick={clickSubmit}
             className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors"> 
             Create Account</button>
             </div>
        </div>     

    </div>    
    )
}
export default Register