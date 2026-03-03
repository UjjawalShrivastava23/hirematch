import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
function Login(){
    const [email , setEmail]= useState('')
    const [password , setPassword]= useState('')
    const navigate = useNavigate()
 
     async function handlesubmit(){
    try{
    const response = await axios.post('http://localhost:8000/api/auth/login', {
  email: email,
  password: password
})
localStorage.setItem('token', response.data.token)
        console.log(response.data)
        navigate('/dashboard')
}catch (error){
      console.error();
   }
}
    return(
        <div>
        <input value ={email}
        onChange={(e) =>setEmail(e.target.value)} />
        <input value ={password} 
        onChange={(p)=>setPassword(p.target.value)}/>
       
    
    
<button onClick={handlesubmit}> submit </button>
    
    
</div>
    ) }
export default Login
