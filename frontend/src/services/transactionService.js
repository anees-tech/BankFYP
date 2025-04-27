const API_URL = "http://localhost:5000/api"

export const getTransactions = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/transactions/user/${userId}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to fetch transactions")
    }

    return await response.json()
  } catch (error) {
    console.error("Transactions fetch error:", error)
    throw error
  }
}

export const getAllTransactions = async (filters = {}) => {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams()
    if (filters.userId) queryParams.append("userId", filters.userId)
    if (filters.type) queryParams.append("type", filters.type)
    if (filters.startDate) queryParams.append("startDate", filters.startDate)
    if (filters.endDate) queryParams.append("endDate", filters.endDate)

    const response = await fetch(`${API_URL}/transactions?${queryParams.toString()}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to fetch transactions")
    }

    return await response.json()
  } catch (error) {
    console.error("Transactions fetch error:", error)
    throw error
  }
}

export const makeTransfer = async (transferData) => {
  try {
    const response = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...transferData,
        type: "transfer",
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Transfer failed")
    }

    return await response.json()
  } catch (error) {
    console.error("Transfer error:", error)
    throw error
  }
}
