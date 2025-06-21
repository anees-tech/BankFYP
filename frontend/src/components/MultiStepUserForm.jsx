"use client"

import { useState, useEffect } from "react"
import "../styles/MultiStepUserForm.css"

const FormHeader = ({ page, title, formNumber }) => (
  <div className="form-header">
    <div className="form-logo">🏦</div>
    <div className="form-titles">
      <h4>Page {page}: {title}</h4>
      <span>Application Form No: <strong>{formNumber}</strong></span>
    </div>
  </div>
);

const Step1_PersonalDetails = ({ formData, handleChange, mode }) => (
  <div className="form-step-container step-1">
    <FormHeader page="1" title="Personal Details" formNumber="8999" />
    <div className="form-grid">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="fatherName">Father's Name</label>
        <input type="text" id="fatherName" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="dob">Date of Birth</label>
        <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Gender</label>
        <div className="radio-group">
          <label><input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} /> Male</label>
          <label><input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} /> Female</label>
        </div>
      </div>
      <div className="form-group full-width">
        <label htmlFor="currentAddress">Address</label>
        <input type="text" id="currentAddress" name="currentAddress" value={formData.currentAddress} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="pinCode">Pin Code</label>
        <input type="text" id="pinCode" name="pinCode" value={formData.pinCode} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Marital Status</label>
        <div className="radio-group">
          <label><input type="radio" name="maritalStatus" value="Single" checked={formData.maritalStatus === "Single"} onChange={handleChange} /> Single</label>
          <label><input type="radio" name="maritalStatus" value="Married" checked={formData.maritalStatus === "Married"} onChange={handleChange} /> Married</label>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="password">{mode === "create" ? "Password" : "New Password"}</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required={mode === "create"} placeholder={mode === 'edit' ? 'Leave blank to keep current' : ''} />
      </div>
    </div>
  </div>
);

const Step2_AdditionalDetails = ({ formData, handleChange }) => (
  <div className="form-step-container step-2">
    <FormHeader page="2" title="Additional Details" formNumber="8999" />
    <div className="form-grid">
      <div className="form-group">
        <label htmlFor="religion">Religion</label>
        <input type="text" id="religion" name="religion" value={formData.religion} onChange={handleChange} placeholder="e.g., Islam, Christianity" />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} placeholder="e.g., General, etc." />
      </div>
      <div className="form-group">
        <label htmlFor="educationalQualification">Educational Qualification</label>
        <input type="text" id="educationalQualification" name="educationalQualification" value={formData.educationalQualification} onChange={handleChange} placeholder="e.g., Bachelors, Masters" />
      </div>
      <div className="form-group">
        <label htmlFor="sourceOfIncome">Occupation</label>
        <select id="sourceOfIncome" name="sourceOfIncome" value={formData.sourceOfIncome} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="Salaried">Salaried</option>
          <option value="Business">Business</option>
          <option value="Freelancer">Freelancer</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="cnic">CNIC Number</label>
        <input type="text" id="cnic" name="cnic" value={formData.cnic} onChange={handleChange} required placeholder="XXXXX-XXXXXXX-X" />
      </div>
      <div className="form-group">
        <label htmlFor="ntn">National Tax Number (NTN)</label>
        <input type="text" id="ntn" name="ntn" value={formData.ntn} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="mobileNumber">Mobile Number</label>
        <input type="tel" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required placeholder="+923XXXXXXXXX" />
      </div>
      <div className="form-group">
        <label htmlFor="nomineeName">Nominee's Name</label>
        <input type="text" id="nomineeName" name="nomineeName" value={formData.nomineeName} onChange={handleChange} />
      </div>
    </div>
  </div>
);

const Step3_AccountDetails = ({ formData, handleCheckboxChange, handleChange }) => (
  <div className="form-step-container step-3">
    <FormHeader page="3" title="Account Details" formNumber="8999" />
    <div className="form-grid">
      <div className="form-group full-width">
        <label>Account Type</label>
        <div className="radio-group">
          <label><input type="radio" name="accountType" value="Saving Account" checked={formData.accountType === "Saving Account"} onChange={handleChange} /> Saving Account</label>
          <label><input type="radio" name="accountType" value="Fixed Deposit Account" checked={formData.accountType === "Fixed Deposit Account"} onChange={handleChange} /> Fixed Deposit Account</label>
          <label><input type="radio" name="accountType" value="Current Account" checked={formData.accountType === "Current Account"} onChange={handleChange} /> Current Account</label>
        </div>
      </div>
      <div className="form-group full-width">
        <label>Services Required</label>
        <div className="checkbox-group">
          <label><input type="checkbox" name="servicesRequired" value="ATM CARD" checked={formData.servicesRequired.includes("ATM CARD")} onChange={handleCheckboxChange} /> ATM CARD</label>
          <label><input type="checkbox" name="servicesRequired" value="Internet Banking" checked={formData.servicesRequired.includes("Internet Banking")} onChange={handleCheckboxChange} /> Internet Banking</label>
          <label><input type="checkbox" name="servicesRequired" value="Mobile Banking" checked={formData.servicesRequired.includes("Mobile Banking")} onChange={handleCheckboxChange} /> Mobile Banking</label>
          <label><input type="checkbox" name="servicesRequired" value="EMAIL Alerts" checked={formData.servicesRequired.includes("EMAIL Alerts")} onChange={handleCheckboxChange} /> EMAIL Alerts</label>
          <label><input type="checkbox" name="servicesRequired" value="Cheque Book" checked={formData.servicesRequired.includes("Cheque Book")} onChange={handleCheckboxChange} /> Cheque Book</label>
          <label><input type="checkbox" name="servicesRequired" value="E-Statement" checked={formData.servicesRequired.includes("E-Statement")} onChange={handleCheckboxChange} /> E-Statement</label>
        </div>
      </div>
      <div className="form-group full-width">
        <label htmlFor="initialBalance">Initial Deposit (PKR)</label>
        <input type="number" id="initialBalance" name="initialBalance" value={formData.initialBalance} onChange={handleChange} min="0" step="1" required />
      </div>
      <div className="form-group full-width">
        <label className="checkbox-group">
          <input type="checkbox" name="declaration" required />
          I hereby declare that the above entered details are correct to the best of my knowledge.
        </label>
      </div>
    </div>
  </div>
);

function MultiStepUserForm({ isOpen, mode, user, onSubmit, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Core
    name: "", username: "", email: "", password: "", role: "customer",
    // Step 1
    fatherName: "", dob: "", gender: "Male", maritalStatus: "Single", currentAddress: "", city: "", state: "Punjab", pinCode: "", mobileNumber: "",
    // Step 2
    cnic: "", religion: "", category: "General", educationalQualification: "", sourceOfIncome: "",
    companyName: "", monthlySalary: "", businessName: "", ntn: "",
    nomineeName: "", nomineeRelation: "", nomineeCNIC: "", bloodGroup: "", medicalConditions: "",
    // Step 3
    accountType: "Saving Account", servicesRequired: ["ATM CARD", "Internet Banking"], initialBalance: "5000",
  });

  useEffect(() => {
    if (mode === "edit" && user) {
      setFormData({
        ...formData, // Start with defaults
        ...user, // Overwrite with user data
        dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : "",
        password: "", // Clear password for edit mode
        initialBalance: user.balance?.toString() || "0",
        servicesRequired: user.servicesRequired || [],
      });
    }
    setStep(1);
  }, [mode, user, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const services = prev.servicesRequired;
      if (checked) {
        return { ...prev, servicesRequired: [...services, value] };
      } else {
        return { ...prev, servicesRequired: services.filter((service) => service !== value) };
      }
    });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalUserData = { ...formData, initialBalance: Number.parseFloat(formData.initialBalance) || 0 };
    if (mode === "edit" && !finalUserData.password) delete finalUserData.password;
    onSubmit(finalUserData);
  };

  if (!isOpen) return null;

  const totalSteps = 3;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <form onSubmit={handleSubmit}>
          {step === 1 && <Step1_PersonalDetails formData={formData} handleChange={handleChange} mode={mode} />}
          {step === 2 && <Step2_AdditionalDetails formData={formData} handleChange={handleChange} />}
          {step === 3 && <Step3_AccountDetails formData={formData} handleChange={handleChange} handleCheckboxChange={handleCheckboxChange} />}
          
          <div className="form-actions-container">
            <div className="progress-bar">
              <div className="progress" style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}></div>
            </div>
            <div className="form-actions">
              {step > 1 && <button type="button" className="prev-btn" onClick={prevStep}>Previous</button>}
              <div style={{ flex: 1 }}></div> {/* Spacer */}
              {step < totalSteps && <button type="button" className="next-btn" onClick={nextStep}>Next</button>}
              {step === totalSteps && <button type="submit" className="submit-btn">{mode === "create" ? "Submit" : "Update"}</button>}
              <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MultiStepUserForm;