import { useState } from "react";
import "./App.css";

function App() {
  // --- STATES ---
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    nationality: "",
    religion: "",
    email: "",
    zipCode: "",
    mobile: "",
    landline: "",
    academicLevel: "",
    collegeDepartment: "",
    degreeProgram: "",
    yearGS: "",
    yearJHS: "",
    yearSHS: "",
  });

  const [touched, setTouched] = useState({}); // Track touched fields

  // --- INPUT HANDLERS ---
  const handleLettersOnly = (e, field) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleNumbersOnly = (e, field, maxLength) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= maxLength) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleTextChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleTouch = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  // --- DEGREE PROGRAM OPTIONS ---
  const undergraduateDegrees = {
    "College of Engineering and Architecture": [
      "BS Architecture",
      "BS Chemical Engineering",
      "BS Civil Engineering",
      "BS Computer Engineering",
      "BS Electrical Engineering",
      "BS Electronics Engineering",
      "BS Industrial Engineering",
      "BS Mechanical Engineering",
    ],
    "College of Computer Studies": [
      "BS Computer Science",
      "BS Data Science and Analytics",
      "BS Entertainment and Multimedia Computing",
      "BS Information Technology",
    ],
    "College of Business Education": [
      "BS Accountancy",
      "BS Accounting Information System",
      "BS Business Administration",
      "Financial Management",
      "Human Resource Management",
      "Logistics and Supply Chain Management",
      "Marketing Management",
    ],
    "College of Arts": [
      "Bachelor of Arts in English Language",
      "Bachelor of Arts in Political Science",
    ],
  };

  const graduateDegrees = [
    "Master in Information Systems",
    "Master in Information Technology",
    "Master in Logistics and Supply Chain Management",
    "Master of Engineering with Specialization in Civil Engineering",
    "Master of Engineering with Specialization in Computer Engineering",
    "Master of Engineering with Specialization in Electrical Engineering",
    "Master of Engineering with Specialization in Electronics Engineering",
    "Master of Engineering with Specialization in Industrial Engineering",
    "Master of Engineering with Specialization in Mechanical Engineering",
    "Master of Science in Computer Science",
  ];

  // --- FORM SUBMIT ---
  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    const emptyFields = Object.keys(formData).filter((key) => !formData[key]);
    if (emptyFields.length > 0) {
      alert("Please fill all required fields!");
      setTouched(
        emptyFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
      );
      return;
    }
    if (!formData.email.includes("@")) {
      alert("Please enter a valid email with @ symbol.");
      setTouched({ ...touched, email: true });
      return;
    }
    if (formData.mobile.length !== 11) {
      alert("Mobile number must be 11 digits.");
      setTouched({ ...touched, mobile: true });
      return;
    }
    if (formData.landline.length !== 8) {
      alert("Landline number must be 8 digits.");
      setTouched({ ...touched, landline: true });
      return;
    }
    alert("Registration Submitted Successfully!");
  };

  // --- RENDER INPUT ---
  const renderInput = (label, field, type = "text", maxLength) => {
    let value = formData[field];
    const isError = touched[field] && !value;
    return (
      <div>
        <label>{label}</label>
        <input
          type={type}
          value={value}
          onChange={(e) => {
            if (type === "text") handleLettersOnly(e, field);
            else if (type === "number" || field === "mobile" || field === "landline" || field.includes("year") || field === "zipCode") {
              handleNumbersOnly(e, field, maxLength || 255);
            } else {
              handleTextChange(e, field);
            }
          }}
          onBlur={() => handleTouch(field)}
          maxLength={maxLength}
          className={isError ? "error" : ""}
          required
        />
      </div>
    );
  };

  return (
    <div className="container">
      <h1>ADEi University Registration Portal</h1>

      <form onSubmit={handleSubmit}>
        {/* Personal Info */}
        <fieldset>
          <legend>Personal Information</legend>
          <div className="grid-4">
            {renderInput("First Name", "firstName")}
            {renderInput("Middle Name", "middleName")}
            {renderInput("Last Name", "lastName")}
            {renderInput("Suffix", "suffix")}
          </div>
          <div className="grid-3">
            <div>
              <label>Date of Birth</label>
              <input
                type="date"
                onBlur={() => handleTouch("dob")}
                className={touched.dob && !formData.dob ? "error" : ""}
                required
              />
            </div>
            <div>
              <label>Gender</label>
              <select
                onChange={(e) => handleTextChange(e, "gender")}
                onBlur={() => handleTouch("gender")}
                className={touched.gender && !formData.gender ? "error" : ""}
                required
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
              </select>
            </div>
            <div>
              {renderInput("Nationality", "nationality")}
            </div>
          </div>
          <div>
            <label>Religion</label>
            <input
              type="text"
              value={formData.religion}
              onChange={(e) => handleTextChange(e, "religion")}
              onBlur={() => handleTouch("religion")}
              className={touched.religion && !formData.religion ? "error" : ""}
              required
            />
          </div>
        </fieldset>

        {/* Contact Details */}
        <fieldset>
          <legend>Contact Details</legend>
          <div className="grid-3">
            <div>
              <label>Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={handleTextChange}
                onBlur={() => handleTouch("email")}
                className={touched.email && !formData.email ? "error" : ""}
                placeholder="example@domain.com"
                required
              />
            </div>
            <div>
              <label>Mobile Number</label>
              <input
                type="text"
                value={formData.mobile}
                onChange={(e) => handleNumbersOnly(e, "mobile", 11)}
                onBlur={() => handleTouch("mobile")}
                className={touched.mobile && !formData.mobile ? "error" : ""}
                placeholder="11 digits"
                required
              />
            </div>
            <div>
              <label>Landline</label>
              <input
                type="text"
                value={formData.landline}
                onChange={(e) => handleNumbersOnly(e, "landline", 8)}
                onBlur={() => handleTouch("landline")}
                className={touched.landline && !formData.landline ? "error" : ""}
                placeholder="8 digits"
                required
              />
            </div>
          </div>
          <h3>Complete Home Address</h3>
          <div className="grid-3">
            <div><label>Street</label><input type="text" required /></div>
            <div><label>Barangay</label><input type="text" required /></div>
            <div><label>City</label><input type="text" required /></div>
            <div><label>Province</label><input type="text" required /></div>
            <div>
              <label>Zip Code</label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => handleNumbersOnly(e, "zipCode")}
                onBlur={() => handleTouch("zipCode")}
                className={touched.zipCode && !formData.zipCode ? "error" : ""}
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Academic History */}
        <fieldset>
          <legend>Academic History</legend>
          <h3>Grade School</h3>
          <div className="grid-3">
            <div><label>School Name</label><input type="text" required /></div>
            <div>
              <label>Year Graduated</label>
              <input
                type="text"
                value={formData.yearGS}
                onChange={(e) => handleNumbersOnly(e, "yearGS", 4)}
                onBlur={() => handleTouch("yearGS")}
                className={touched.yearGS && !formData.yearGS ? "error" : ""}
                required
              />
            </div>
            <div><label>School Address</label><input type="text" required /></div>
          </div>
          {/* Similar blocks for JHS, SHS */}
        </fieldset>

        {/* Enrollment Choices */}
        
          collegeDepartment: "",
          degreeProgram: "",
        });
      }}
      required
    /> Undergraduate
  </label>
  <label>
    <input
      type="radio"
      name="level"
      value="graduate"
      checked={formData.academicLevel === "graduate"}
      onChange={(e) => {
        setFormData({
          ...formData,
          academicLevel: e.target.value,
          collegeDepartment: "",
          degreeProgram: "",
        });
      }}
    /> Graduate
  </label>

  {/* Semester */}
  <h3>Semester</h3>
  <label>
    <input
      type="radio"
      name="semester"
      value="1st Semester"
      checked={formData.semester === "1st Semester"}
      onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
      required
    /> 1st Semester
  </label>
  <label>
    <input
      type="radio"
      name="semester"
      value="2nd Semester"
      checked={formData.semester === "2nd Semester"}
      onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
    /> 2nd Semester
  </label>

  {/* Campus */}
  <h3>Campus</h3>
  <label>
    <input
      type="radio"
      name="campus"
      value="Manila"
      checked={formData.campus === "Manila"}
      onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
      required
    /> Manila
  </label>
  <label>
    <input
      type="radio"
      name="campus"
      value="Quezon City"
      checked={formData.campus === "Quezon City"}
      onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
    /> Quezon City
  </label>

  {/* Undergraduate → Department → Degree */}
  {formData.academicLevel === "undergraduate" && (
    <>
      <h3>College Department</h3>
      <select
        value={formData.collegeDepartment}
        onChange={(e) =>
          setFormData({ ...formData, collegeDepartment: e.target.value, degreeProgram: "" })
        }
        required
      >
        <option value="">Select Department</option>
        {Object.keys(undergraduateDegrees).map((dept) => (
          <option key={dept}>{dept}</option>
        ))}
      </select>
      {formData.collegeDepartment && (
        <>
          <h3>Degree Program</h3>
          <select
            value={formData.degreeProgram}
            onChange={(e) => setFormData({ ...formData, degreeProgram: e.target.value })}
            required
          >
            <option value="">Select Program</option>
            {undergraduateDegrees[formData.collegeDepartment].map((deg) => (
              <option key={deg}>{deg}</option>
            ))}
          </select>
        </>
      )}
    </>
  )}

  {/* Graduate → Master Degrees */}
  {formData.academicLevel === "graduate" && (
    <>
      <h3>Degree Program (Master’s)</h3>
      <select
        value={formData.degreeProgram}
        onChange={(e) => setFormData({ ...formData, degreeProgram: e.target.value })}
        required
      >
        <option value="">Select Program</option>
        {graduateDegrees.map((deg) => (
          <option key={deg}>{deg}</option>
        ))}
      </select>
    </>
  )}
</fieldset>

        <button type="submit">Submit Registration</button>
      </form>
    </div>
  );
}

export default App;
