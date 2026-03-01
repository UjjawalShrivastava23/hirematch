import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1 className="text-3xl font-bold text-blue-600 p-8">HireMatch 🎯</h1>} />
        <Route path="/login" element={<h1 className="p-8">Login Page</h1>} />
        <Route path="/register" element={<h1 className="p-8">Register Page</h1>} />
        <Route path="/dashboard" element={<h1 className="p-8">Dashboard</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App