"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import "./App.css"

// Components
import Header from "./components/Header"
import Footer from "./components/Footer"

// Pages
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs"
import ContactUs from "./pages/ContactUs"
import FAQs from "./pages/FAQs"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import AdminDashboard from "./pages/AdminDashboard"

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user")
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />
  }

  const AdminRoute = ({ children }) => {
    return user && user.role === 'admin' ? children : <Navigate to="/dashboard" />
  }

  return (
    <Router>
      <div className="app">
        <Header user={user} onLogout={handleLogout} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} 
            />
            <Route 
              path="/register" 
              element={user ? <Navigate to="/dashboard" /> : <Register />} 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  {user?.role === 'admin' ? <AdminDashboard user={user} /> : <Dashboard user={user} />}
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminDashboard user={user} />
                </AdminRoute>
              } 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
