import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    // --- Core Fields ---
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
    accountNumber: { type: String, unique: true },
    balance: { type: Number, default: 0 },

    // --- Step 1: Personal Details ---
    fatherName: { type: String },
    dob: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    maritalStatus: { type: String, enum: ["Single", "Married", "Other"] },
    currentAddress: { type: String },
    city: { type: String },
    state: { type: String }, // Or Province
    pinCode: { type: String },
    mobileNumber: { type: String },

    // --- Step 2: Additional Details ---
    cnic: { type: String, unique: true, sparse: true }, // sparse allows nulls to not be unique
    religion: { type: String },
    category: { type: String },
    educationalQualification: { type: String },
    sourceOfIncome: { type: String, enum: ["Salaried", "Business", "Freelancer", "Other", ""] },
    companyName: { type: String }, // For Salaried
    monthlySalary: { type: Number }, // For Salaried
    businessName: { type: String }, // For Business
    ntn: { type: String }, // For Business
    nomineeName: { type: String },
    nomineeRelation: { type: String },
    nomineeCNIC: { type: String },
    bloodGroup: { type: String },
    medicalConditions: { type: String },

    // --- Step 3: Account Details ---
    accountType: { type: String, required: true, default: "Saving Account" },
    servicesRequired: [{ type: String }], // e.g., ["ATM CARD", "Internet Banking"]
  },
  {
    timestamps: true,
  },
)

const User = mongoose.model("User", userSchema)

export default User
