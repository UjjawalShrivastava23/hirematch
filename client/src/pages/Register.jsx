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
        <div>
            <input value={name} 
            onChange={(n)=> setName(n.target.value)} />
            <input value= {email}
            onChange={(e)=> setEmail(e.target.value)} />
            <input value={password} 
            onChange={(p)=> setPassword(p.target.value)}/>

            <button onClick={clickSubmit}> Submit</button>

        </div>
    )
}
export default Register