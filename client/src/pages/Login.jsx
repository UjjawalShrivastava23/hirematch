import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import api, { getErrorMessage } from '../lib/api'
function Login(){
    const [email , setEmail]= useState('')
    const [password , setPassword]= useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()
 
     async function handlesubmit(event){
    event.preventDefault()
    setErrorMessage('')

    if (!email || !password) {
      setErrorMessage('Please enter your email and password.')
      return
    }

    setIsSubmitting(true)

    try{
    const response = await api.post('/auth/login', {
  email: email,
  password: password
})
localStorage.setItem('token', response.data.token)
localStorage.setItem('user', JSON.stringify(response.data.user))
        navigate('/dashboard', { replace: true })
      
}catch (error){
      setErrorMessage(getErrorMessage(error, 'Unable to sign in right now.'))
   } finally {
      setIsSubmitting(false)
   }
}
return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-slate-400 text-sm mb-6">Sign in to your HireMatch account</p>
        
        <form onSubmit={handlesubmit} className="flex flex-col gap-4">
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
          {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
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
