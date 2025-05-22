const BASE_API_URL = "http://localhost:5000/api"; // Your backend API base URL

export const getAllUsers = async () => {
  const response = await fetch(`${BASE_API_URL}/users`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch users");
  }
  return response.json();
};

export const createUser = async (userData) => {
  const response = await fetch(`${BASE_API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) { 
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create user");
  }
  return response.json();
};

export const updateUser = async (userId, userData) => {
  const response = await fetch(`${BASE_API_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update user");
  }
  return response.json();
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${BASE_API_URL}/users/${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete user");
  }
  return response.json();
};
