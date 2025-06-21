"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser } from "../services/userService"
import MultiStepUserForm from "../components/MultiStepUserForm"

function Register() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()

  const handleRegisterSubmit = async (userData) => {
    setLoading(true)
    setError("")
    try {
      await createUser(userData)
      setIsSuccess(true)
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSuccess = () => {
    navigate('/login')
  }

  return (
    <div className="register-container">
      {isSuccess ? (
        <div className="modal-backdrop">
          <div className="success-card">
            <h2>Registration Successful!</h2>
            <p>Your account has been created successfully. You can now log in.</p>
            <button onClick={handleSuccess} className="btn btn-primary">
              Go to Login
            </button>
          </div>
        </div>
      ) : (
        <>
          {error && <div className="error-message global-error">{error}</div>}
          {loading && <div className="loading">Processing registration...</div>}
          <MultiStepUserForm
            isOpen={true}
            mode="create"
            onSubmit={handleRegisterSubmit}
            onClose={() => navigate('/')}
          />
        </>
      )}
    </div>
  )
}

export default Register