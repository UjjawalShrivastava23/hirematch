import {useState} from "react"
import { useNavigate } from "react-router-dom"
import api, { getErrorMessage } from "../lib/api"


function Register(){
    const [ name , setName ] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

  async  function clickSubmit(event){
    event.preventDefault()
    setErrorMessage('')

    if (!name || !email || !password) {
      setErrorMessage('Please fill in your name, email, and password.')
      return
    }

    setIsSubmitting(true)

    try{
        const response = await api.post('/auth/register',{
            name : name,
            email : email,
            password : password
        })
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        navigate('/dashboard', { replace: true })
    }
     catch(error){
        setErrorMessage(getErrorMessage(error, 'Unable to create your account right now.'))
     } finally {
        setIsSubmitting(false)
     } }
    return(
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md">
              <h1 className="text-2xl font-bold text-white mb-2">Create your Account</h1>
              <p className="text-slate-400 text-sm mb-6">Sign up to your HireMatch account</p>

             <form onSubmit={clickSubmit} className="flex flex-col gap-4">
            
            <input 
            type = "text"
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
            {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}
             
            <button type="submit" disabled={isSubmitting}
             className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors"> 
             {isSubmitting ? 'Creating Account...' : 'Create Account'}</button>
             </form>
        </div>     

    </div>    
    )
}
export default Register
