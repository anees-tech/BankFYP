"use client"

import { useState, useEffect } from "react"
import "../styles/UserForm.css"

function UserForm({ mode, user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "customer",
    initialBalance: "0",
  })

  useEffect(() => {
    if (mode === "edit" && user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        password: "", // Don't populate password for security
        role: user.role || "customer",
        initialBalance: user.balance?.toString() || "0",
      })
    }
  }, [mode, user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Convert initialBalance to number
    const userData = {
      ...formData,
      initialBalance: Number.parseFloat(formData.initialBalance) || 0,
    }

    // If editing and password is empty, remove it from the data
    if (mode === "edit" && !userData.password) {
      delete userData.password
    }

    onSubmit(userData)
  }

  return (
    <div className="user-form">
      <h3>{mode === "create" ? "Add New User" : "Edit User"}</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="password">{mode === "create" ? "Password" : "Password (leave empty to keep current)"}</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={mode === "create"}
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange} required>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="initialBalance">{mode === "create" ? "Initial Balance ($)" : "Balance ($)"}</label>
          <input
            type="number"
            id="initialBalance"
            name="initialBalance"
            value={formData.initialBalance}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            {mode === "create" ? "Create User" : "Update User"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserForm
