const API_URL = "http://localhost:5000/api"

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to fetch users")
    }

    return await response.json()
  } catch (error) {
    console.error("Users fetch error:", error)
    throw error
  }
}

export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to create user")
    }

    return await response.json()
  } catch (error) {
    console.error("User creation error:", error)
    throw error
  }
}

export const updateUser = async (userId, userData) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to update user")
    }

    return await response.json()
  } catch (error) {
    console.error("User update error:", error)
    throw error
  }
}

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to delete user")
    }

    return await response.json()
  } catch (error) {
    console.error("User deletion error:", error)
    throw error
  }
}
