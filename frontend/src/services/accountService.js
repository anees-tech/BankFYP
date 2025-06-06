const API_URL = "http://localhost:5000/api"

export const getAccountDetails = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/accounts/${userId}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to fetch account details")
    }

    return await response.json()
  } catch (error) {
    console.error("Account fetch error:", error)
    throw error
  }
}

export const makeTransaction = async (transactionData) => {
  try {
    const response = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Assuming you'll implement token-based auth, you'd add:
        // "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(transactionData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Transaction failed")
    }

    return await response.json()
  } catch (error) {
    console.error("Transaction error:", error)
    throw error
  }
}

export const getTransactionsByUserId = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/transactions/user/${userId}`, {
      // headers: {
      //   "Authorization": `Bearer ${localStorage.getItem("token")}`
      // }
    })
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
