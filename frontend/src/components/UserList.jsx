"use client"

import "../styles/UserList.css"

function UserList({ users, onEdit, onDelete }) {
  return (
    <div className="user-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Account Number</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.accountNumber}</td>
              <td>${user.balance?.toFixed(2) || "0.00"}</td>
              <td className="actions">
                <button className="edit-btn" onClick={() => onEdit(user)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => onDelete(user._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
