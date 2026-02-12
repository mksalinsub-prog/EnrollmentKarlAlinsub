import { useState } from "react";
import "./App.css";

function App() {
  // --- STATES ---
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [landline, setLandline] = useState("");
  const [academicLevel, setAcademicLevel] = useState("");
  const [collegeDepartment, setCollegeDepartment] = useState("");
  const [degreeProgram, setDegreeProgram] = useState("");
  const [yearGS, setYearGS] = useState("");
  const [yearJHS, setYearJHS] = useState("");
  const [yearSHS, setYearSHS] = useState("");

  // --- INPUT VALIDATION ---
  const handleLettersOnly = (e, setter) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) setter(value);
  };

  const handleNumbersOnly = (e, setter) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) setter(value);
  };

  const handleEmailChange = (e) => setEmail(e.target.value);

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

  // --- SUBMIT ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      alert("Please enter a valid email with @ symbol.");
      return;
    }
    alert("Registration Submitted Successfully!");
  };

  return (
    <div className="container">
      <h1>ADEi University Registration Portal</h1>

      <form onSubmit={handleSubmit}>

        {/* --- PERSONAL INFO --- */}
        <fieldset>
          <legend><h2>Personal Information</h2></legend>
          <div className="grid-4">
            <div>
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => handleLettersOnly(e, setFirstName)}
                required
              />
            </div>
            <div>
              <label>Middle Name</label>
              <input
                type="text"
                value={middleName}
                onChange={(e) => handleLettersOnly(e, setMiddleName)}
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => handleLettersOnly(e, setLastName)}
                required
              />
            </div>
            <div>
              <label>Suffix</label>
              <input
                type="text"
                value={suffix}
                onChange={(e) => handleLettersOnly(e, setSuffix)}
              />
            </div>
          </div>

          <div className="grid-3">
            <div>
              <label>Date of Birth</label>
              <input type="date" required />
            </div>
            <div>
              <label>Gender</label>
              <select required>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
              </select>
            </div>
            <div>
              <label>Nationality</label>
              <input
                type="text"
                value={nationality}
                onChange={(e) => handleLettersOnly(e, setNationality)}
                required
              />
            </div>
          </div>

          <div>
            <label>Religion</label>
            <input type="text" />
          </div>
        </fieldset>

        {/* --- CONTACT DETAILS --- */}
        <fieldset>
          <legend><h2>Contact Details</h2></legend>

          <div className="grid-3">
            <div>
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="example@domain.com"
                required
              />
            </div>
            <div>
              <label>Mobile Number</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => handleNumbersOnly(e, setMobile)}
                required
              />
            </div>
            <div>
              <label>Landline</label>
              <input
                type="text"
                value={landline}
                onChange={(e) => handleNumbersOnly(e, setLandline)}
              />
            </div>
          </div>

          <h3>Complete Home Address</h3>
          <div className="grid-3">
            <div>
              <label>Street</label>
              <input type="text" required />
            </div>
            <div>
              <label>Barangay</label>
              <input type="text" required />
            </div>
            <div>
              <label>City</label>
              <input type="text" required />
            </div>
            <div>
              <label>Province</label>
              <input type="text" required />
            </div>
            <div>
              <label>Zip Code</label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => handleNumbersOnly(e, setZipCode)}
                required
              />
            </div>
          </div>
        </fieldset>

        {/* --- ACADEMIC HISTORY --- */}
        <fieldset>
          <legend><h2>Academic History</h2></legend>

          <h3>Grade School</h3>
          <div className="grid-3">
            <div>
              <label>School Name</label>
              <input type="text" required />
            </div>
            <div>
              <label>Year Graduated</label>
              <input
                type="text"
                value={yearGS}
                onChange={(e) => handleNumbersOnly(e, setYearGS)}
                required
              />
            </div>
            <div>
              <label>School Address</label>
              <input type="text" required />
            </div>
          </div>

          <h3>Junior High School</h3>
          <div className="grid-3">
            <div>
              <label>School Name</label>
              <input type="text" required />
            </div>
            <div>
              <label>Year Graduated</label>
              <input
                type="text"
                value={yearJHS}
                onChange={(e) => handleNumbersOnly(e, setYearJHS)}
                required
              />
            </div>
            <div>
              <label>School Address</label>
              <input type="text" required />
            </div>
          </div>

          <h3>Senior High School</h3>
          <div className="grid-3">
            <div>
              <label>School Name</label>
              <input type="text" required />
            </div>
            <div>
              <label>Year Graduated</label>
              <input
                type="text"
                value={yearSHS}
                onChange={(e) => handleNumbersOnly(e, setYearSHS)}
                required
              />
            </div>
            <div>
              <label>Grade Average</label>
              <input type="number" step="0.01" required />
            </div>
            <div>
              <label>School Address</label>
              <input type="text" required />
            </div>
          </div>
        </fieldset>

        {/* --- ENROLLMENT CHOICES --- */}
        <fieldset>
          <legend><h2>Enrollment Choices</h2></legend>

          <h3>Academic Level</h3>
          <label>
            <input
              type="radio"
              name="level"
              value="undergraduate"
              checked={academicLevel === "undergraduate"}
              onChange={(e) => {
                setAcademicLevel(e.target.value);
                setCollegeDepartment("");
                setDegreeProgram("");
              }}
              required
            /> Undergraduate
          </label>
          <label>
            <input
              type="radio"
              name="level"
              value="graduate"
              checked={academicLevel === "graduate"}
              onChange={(e) => {
                setAcademicLevel(e.target.value);
                setCollegeDepartment("");
                setDegreeProgram("");
              }}
            /> Graduate
          </label>

          <h3>Semester</h3>
          <label><input type="radio" name="semester" required /> 1st Semester</label>
          <label><input type="radio" name="semester" /> 2nd Semester</label>

          <h3>Campus</h3>
          <label><input type="radio" name="campus" required /> Manila</label>
          <label><input type="radio" name="campus" /> Quezon City</label>

          {/* Undergraduate → Department */}
          {academicLevel === "undergraduate" && (
            <>
              <h3>College Department</h3>
              <select
                value={collegeDepartment}
                onChange={(e) => {
                  setCollegeDepartment(e.target.value);
                  setDegreeProgram("");
                }}
                required
              >
                <option value="">Select Department</option>
                {Object.keys(undergraduateDegrees).map((dept) => (
                  <option key={dept}>{dept}</option>
                ))}
              </select>
            </>
          )}

          {/* Undergraduate → Degree Program */}
          {academicLevel === "undergraduate" && collegeDepartment && (
            <>
              <h3>Degree Program</h3>
              <select
                value={degreeProgram}
                onChange={(e) => setDegreeProgram(e.target.value)}
                required
              >
                <option value="">Select Program</option>
                {undergraduateDegrees[collegeDepartment].map((deg) => (
                  <option key={deg}>{deg}</option>
                ))}
              </select>
            </>
          )}

          {/* Graduate → Master Degrees */}
          {academicLevel === "graduate" && (
            <>
              <h3>Degree Program (Master’s)</h3>
              <select
                value={degreeProgram}
                onChange={(e) => setDegreeProgram(e.target.value)}
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
