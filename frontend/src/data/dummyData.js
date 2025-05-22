export const dummyUsers = [
  {
    _id: "user1",
    name: "John Doe",
    username: "john_doe",
    email: "john@example.com",
    role: "customer",
    accountNumber: "1234567890",
    balance: 1500.5, // Initial balance for reference if needed
    createdAt: new Date().toISOString(),
  },
  {
    _id: "user2",
    name: "Jane Smith",
    username: "jane_smith",
    email: "jane@example.com",
    role: "customer",
    accountNumber: "0987654321",
    balance: 750.25, // Initial balance for reference if needed
    createdAt: new Date().toISOString(),
  },
  {
    _id: "admin1",
    name: "Admin User",
    username: "admin",
    email: "admin@example.com",
    role: "admin",
    accountNumber: "ADMIN00001",
    balance: 0,
    createdAt: new Date().toISOString(),
  },
]

// --- Static Data for Display ---

export const staticAccountDetails = {
  accountNumber: "9876543210", // Generic account number
  balance: 2500.75, // Generic balance
}

export const staticTransactions = [
  {
    _id: "stat_txn1",
    userId: "user_generic", // Placeholder ID
    type: "deposit",
    amount: 5014125120,
    balanceAfter: 2525412500.75,
    date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    description: "Salary Deposit",
  },
  {
    _id: "stat_txn2",
    userId: "user_generic",
    type: "withdraw",
    amount: 75,
    balanceAfter: 2425.75,
    date: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    description: "Groceries",
  },
  {
    _id: "stat_txn3",
    userId: "user_generic",
    type: "transfer",
    amount: 150,
    balanceAfter: 2275.75,
    recipientAccountNumber: "1122334455", // Dummy recipient
    date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    description: "Rent Payment",
  },
  {
    _id: "stat_txn4",
    userId: "user_generic",
    type: "deposit",
    amount: 25,
    balanceAfter: 2300.75,
    date: new Date().toISOString(),
    description: "Refund Received",
  },
]