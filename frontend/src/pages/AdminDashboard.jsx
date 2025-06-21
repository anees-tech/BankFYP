"use client"

import { useState, useEffect } from "react"
import "../styles/AdminDashboard.css"
import UserList from "../components/UserList"
import MultiStepUserForm from "../components/MultiStepUserForm" // Import new form
import AllTransactions from "../components/AllTransactions"
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService"

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
    try {
      const fetchedUsers = await getAllUsers()
      setUsers(fetchedUsers)
    } catch (err) {
      setError(err.message || "Failed to load users")
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
      try {
        await deleteUser(userIdToDelete)
        fetchUsers() // Refresh the list
      } catch (err) {
        setError(err.message || "Failed to delete user")
        console.error(err)
      }
    }
  }

  const handleFormSubmit = async (userData) => {
    setLoading(true)
    setError("")
    try {
      if (formMode === "create") {
        await createUser(userData)
      } else {
        await updateUser(selectedUser._id, userData)
      }
      setIsFormVisible(false)
      setSelectedUser(null)
      fetchUsers() // Refresh the list
    } catch (err) {
      setError(err.message || `Failed to ${formMode} user`)
      console.error(err)
    } finally {
      setLoading(false)
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

      {activeTab === "users" && !isFormVisible && (
        <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
      )}

      {activeTab === "transactions" && <AllTransactions />}

      <MultiStepUserForm
        isOpen={isFormVisible}
        mode={formMode}
        user={selectedUser}
        onSubmit={handleFormSubmit}
        onClose={handleFormCancel}
      />
    </div>
  )
}

export default AdminDashboard
