"use client"

import { useState, useEffect } from "react"
import "./App.css"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import AdminDashboard from "./pages/AdminDashboard"
import Footer from "./components/Footer"

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem("user")
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <div className="app">
      <header>
        <h1>Bank Management System</h1>
        {user && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>

      <main>
        {!user ? (
          <Login setUser={setUser} />
        ) : user.role === "admin" ? (
          <AdminDashboard user={user} />
        ) : (
          <Dashboard user={user} />
        )}
      </main>

      <footer>
        <Footer/>
        <p>&copy; 2025 Bank Management System</p>
      </footer>
    </div>
  )
}

export default App
