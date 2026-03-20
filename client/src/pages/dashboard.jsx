import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
function Dashboard(){
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) navigate('/login')
      }, [])
   const user = JSON.parse(localStorage.getItem('user'))
    return(
        <h1>Welcome to the platform ,{user ? user.name: ''}</h1>
    )
}
export default Dashboard