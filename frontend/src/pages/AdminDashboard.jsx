"use client"

import { useState, useEffect } from "react"
import "../styles/AdminDashboard.css"
import { getAllUsers, createUser, updateUser, deleteUser } from "../services/userService"
import UserList from "../components/UserList"
import UserForm from "../components/UserForm"
import AllTransactions from "../components/AllTransactions"

function AdminDashboard({ user }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [formMode, setFormMode] = useState("create") // 'create' or 'edit'
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState("users") // 'users' or 'transactions'

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const usersData = await getAllUsers()
      setUsers(usersData)
    } catch (err) {
      setError("Failed to load users")
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

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setFormMode("edit")
    setIsFormVisible(true)
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId)
        fetchUsers() // Refresh the list
      } catch (err) {
        setError("Failed to delete user")
        console.error(err)
      }
    }
  }

  const handleFormSubmit = async (userData) => {
    try {
      if (formMode === "create") {
        await createUser(userData)
      } else {
        await updateUser(selectedUser._id, userData)
      }
      setIsFormVisible(false)
      fetchUsers() // Refresh the list
    } catch (err) {
      setError(`Failed to ${formMode} user`)
      console.error(err)
    }
  }

  const handleFormCancel = () => {
    setIsFormVisible(false)
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
