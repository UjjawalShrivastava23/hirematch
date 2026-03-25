import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
function Login(){
    const [email , setEmail]= useState('')
    const [password , setPassword]= useState('')
    const navigate = useNavigate()
 
     async function handlesubmit(){
    try{
    const response = await axios.post('https://hirematch-backend.onrender.com/api/auth/login', {
  email: email,
  password: password
})
localStorage.setItem('token', response.data.token)
localStorage.setItem('user', JSON.stringify(response.data.user))
        console.log(response.data)
        navigate('/dashboard')
      
}catch (error){
      console.error();
   }
}
return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-slate-400 text-sm mb-6">Sign in to your HireMatch account</p>
        
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-900 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(p) => setPassword(p.target.value)}
            className="bg-slate-900 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handlesubmit}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </div>
        
        <p className="text-slate-400 text-sm text-center mt-4">
          Don't have an account? 
          <span className="text-blue-400 cursor-pointer hover:underline ml-1" onClick={() => navigate('/register')}>
            Register
          </span>
        </p>
      </div>
    </div>
  )}
export default Login
