import "./App.css";

function App() {

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration Submitted Successfully!");
  };

  return (
    <div className="container">
      <h1>ADEi University Registration Portal</h1>

      <form onSubmit={handleSubmit}>

        {/* PERSONAL INFORMATION */}
        <fieldset>
          <legend><h2>Personal Information</h2></legend>

          <div className="grid-4">
            <div>
              <label>First Name</label>
              <input type="text" required />
            </div>

            <div>
              <label>Middle Name</label>
              <input type="text" />
            </div>

            <div>
              <label>Last Name</label>
              <input type="text" required />
            </div>

            <div>
              <label>Suffix</label>
              <input type="text" />
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
              <select required>
                <option value="">Select</option>
                <option>Filipino</option>
                <option>American</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label>Religion</label>
            <input type="text" />
          </div>
        </fieldset>


        {/* CONTACT DETAILS */}
        <fieldset>
          <legend><h2>Contact Details</h2></legend>

          <div className="grid-3">
            <div>
              <label>Email Address</label>
              <input type="email" required />
            </div>

            <div>
              <label>Mobile Number</label>
              <input type="tel" required />
            </div>

            <div>
              <label>Landline</label>
              <input type="tel" />
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
              <input type="text" required />
            </div>
          </div>
        </fieldset>


        {/* ACADEMIC HISTORY */}
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
              <input type="number" min="1900" max="2026" required />
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
              <input type="number" min="1900" max="2026" required />
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
              <input type="number" min="1900" max="2026" required />
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


        {/* ENROLLMENT CHOICES */}
        <fieldset>
          <legend><h2>Enrollment Choices</h2></legend>

          <h3>Academic Level</h3>
          <label><input type="radio" name="level" required /> Undergraduate</label>
          <label><input type="radio" name="level" /> Graduate</label>

          <h3>Semester</h3>
          <label><input type="radio" name="semester" required /> 1st Semester</label>
          <label><input type="radio" name="semester" /> 2nd Semester</label>

          <h3>Campus</h3>
          <label><input type="radio" name="campus" required /> Manila</label>
          <label><input type="radio" name="campus" /> Quezon City</label>

          <h3>College Department</h3>
          <select required>
            <option value="">Select Department</option>
            <option>College of Engineering and Architecture</option>
            <option>College of Computer Studies</option>
            <option>College of Business Education</option>
            <option>College of Arts</option>
          </select>

          <h3>Degree Program</h3>
          <select required>
            <option value="">Select Program</option>
            <option>BS Computer Science</option>
            <option>BS Information Technology</option>
            <option>BS Civil Engineering</option>
            <option>BS Mechanical Engineering</option>
            <option>BS Accountancy</option>
            <option>Doctor in Information Technology</option>
            <option>Master in Information Technology</option>
          </select>
        </fieldset>


        <button type="submit">Submit Registration</button>

      </form>
    </div>
  );
}

export default App;
