import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Dashboard from './pages/dashboard'
import Analyze from './pages/Analyze'
import History from './pages/History'
function App() {
  return (
    <BrowserRouter>
     <div className="min-h-screen bg-slate-950 text-slate-100">
     <Navbar />
      <Routes>
        <Route path="/" element={<h1 className="text-3xl font-bold text-blue-600 p-8">HireMatch 🎯</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element= {<Dashboard/>} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/history"element={<History />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App