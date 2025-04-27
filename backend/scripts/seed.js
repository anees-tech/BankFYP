import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import { createUser } from "../controllers/userController.js"; // Import createUser to handle account number generation

dotenv.config();

// Mock request and response objects for createUser controller
const mockReqRes = (body) => ({
  body,
  // Mock other properties if needed by the controller
});

const mockNext = (err) => {
  if (err) {
    console.error("Error in mocked controller:", err);
    throw err; // Re-throw to stop seeding if controller fails
  }
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/bank_management"
    );
    console.log("Connected to MongoDB for seeding.");

    // Clear existing data
    console.log("Clearing existing User and Transaction data...");
    await User.deleteMany();
    await Transaction.deleteMany();
    console.log("Existing data cleared.");

    // --- Create Sample Users using the controller logic ---
    console.log("Creating sample users...");
    const usersData = [
      {
        name: "John Doe",
        username: "john_doe",
        email: "john@example.com",
        password: "password123",
        role: "customer",
        initialBalance: 1000,
      },
      {
        name: "Jane Smith",
        username: "jane_smith",
        email: "jane@example.com",
        password: "password456",
        role: "customer",
        initialBalance: 500,
      },
      {
        name: "Admin User",
        username: "admin",
        email: "admin@example.com",
        password: "adminpassword",
        role: "admin",
        initialBalance: 0,
      },
    ];

    const createdUsers = [];
    for (const userData of usersData) {
      const req = mockReqRes(userData);
      const res = {
        statusCode: 201, // Default success code
        jsonData: null,
        status: function (code) {
          this.statusCode = code;
          return this; // Allow chaining
        },
        json: function (data) {
          this.jsonData = data;
          return this; // Allow chaining
        },
      };
      await createUser(req, res, mockNext);
      if (res.statusCode >= 400) {
        // Handle potential errors from createUser (like duplicate username/email if run multiple times without clearing)
        console.error(
          `Failed to create user ${userData.username}:`,
          res.jsonData?.message || "Unknown error"
        );
        // Decide whether to continue or stop seeding
        // throw new Error(`User creation failed for ${userData.username}`);
      } else if (res.jsonData) {
        // Fetch the full user object including the generated accountNumber and _id
        const fullUser = await User.findById(res.jsonData._id);
        if (fullUser) {
          createdUsers.push(fullUser);
          console.log(`User ${fullUser.username} created successfully.`);
        } else {
          console.warn(
            `Could not retrieve full user data for ${res.jsonData._id}`
          );
        }
      }
    }

    if (createdUsers.length < 2) {
      console.error("Not enough users were created to seed transactions.");
      throw new Error("User creation phase failed.");
    }

    // --- Create Sample Transactions ---
    console.log("Creating sample transactions...");
    const transactionsData = [
      // Transactions for John Doe
      {
        userId: createdUsers[0]._id,
        type: "deposit",
        amount: 200,
        balanceAfter: createdUsers[0].balance + 200,
      }, // Manually calculate balanceAfter for seed
      {
        userId: createdUsers[0]._id,
        type: "withdraw",
        amount: 50,
        balanceAfter: createdUsers[0].balance + 200 - 50,
      },
      // Transactions for Jane Smith
      {
        userId: createdUsers[1]._id,
        type: "deposit",
        amount: 300,
        balanceAfter: createdUsers[1].balance + 300,
      },
    ];

    // Update user balances based on seed transactions (simplified approach)
    // Note: This is basic for seeding; real transactions update balance atomically.
    createdUsers[0].balance = createdUsers[0].balance + 200 - 50;
    createdUsers[1].balance = createdUsers[1].balance + 300;
    await createdUsers[0].save();
    await createdUsers[1].save();

    await Transaction.insertMany(transactionsData);
    console.log("Sample transactions created.");

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exitCode = 1; // Indicate failure
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
};

seedDatabase();
