"use client"

import { useState, useEffect } from "react"
import "../styles/AdminDashboard.css"
import UserList from "../components/UserList"
import UserForm from "../components/UserForm"
import AllTransactions from "../components/AllTransactions"
import { dummyUsers } from "../data/dummyData" // Import dummy data

function AdminDashboard({ user }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [formMode, setFormMode] = useState("create") // 'create' or 'edit'
  const [activeTab, setActiveTab] = useState("users") // 'users' or 'transactions'

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    setError("")
    await new Promise((resolve) => setTimeout(resolve, 400))
    try {
      setUsers([...dummyUsers])
    } catch (err) {
      setError("Failed to load dummy users")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = () => {
    setSelectedUser(null)
    setFormMode("create")
    setIsFormVisible(true)
  }

  const handleEditUser = (userToEdit) => {
    setSelectedUser(userToEdit)
    setFormMode("edit")
    setIsFormVisible(true)
  }

  const handleDeleteUser = async (userIdToDelete) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      try {
        const userIndex = dummyUsers.findIndex((u) => u._id === userIdToDelete)
        if (userIndex > -1) {
          dummyUsers.splice(userIndex, 1)
        } else {
          throw new Error("User not found in dummy data")
        }
        fetchUsers()
      } catch (err) {
        setError("Failed to delete dummy user")
        console.error(err)
      }
    }
  }

  const handleFormSubmit = async (userData) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    try {
      if (formMode === "create") {
        const newUser = {
          ...userData,
          _id: `user_dummy_${Date.now()}`,
          accountNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
          balance: userData.initialBalance || 0,
          createdAt: new Date().toISOString(),
        }
        delete newUser.password
        dummyUsers.push(newUser)
      } else {
        const userIndex = dummyUsers.findIndex((u) => u._id === selectedUser._id)
        if (userIndex > -1) {
          const updatedUser = {
            ...dummyUsers[userIndex],
            ...userData,
            balance: userData.initialBalance,
          }
          if (!userData.password) {
            delete updatedUser.password
          }
          dummyUsers[userIndex] = updatedUser
        } else {
          throw new Error("User not found in dummy data for update")
        }
      }
      setIsFormVisible(false)
      fetchUsers()
    } catch (err) {
      setError(`Failed to ${formMode} dummy user`)
      console.error(err)
    }
  }

  const handleFormCancel = () => {
    setIsFormVisible(false)
    setSelectedUser(null)
  }

  if (loading && users.length === 0) return <div className="loading">Loading users...</div>

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <div className="admin-actions">
          <div className="tabs">
            <button className={`tab ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>
              Manage Users
            </button>
            <button
              className={`tab ${activeTab === "transactions" ? "active" : ""}`}
              onClick={() => setActiveTab("transactions")}
            >
              All Transactions
            </button>
          </div>
          {activeTab === "users" && <button onClick={handleCreateUser}>Add New User</button>}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {activeTab === "users" ? (
        isFormVisible ? (
          <UserForm mode={formMode} user={selectedUser} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
        ) : (
          <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
        )
      ) : (
        <AllTransactions />
      )}
    </div>
  )
}

export default AdminDashboard
