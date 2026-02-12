import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    dob: "",
    gender: "",
    nationality: "",
    nationalityOther: "",
    religion: "",
    email: "",
    mobile: "",
    landline: "",
    street: "",
    barangay: "",
    city: "",
    province: "",
    zipCode: "",
    schoolGS: "",
    yearGS: "",
    schoolAddressGS: "",
    schoolJHS: "",
    yearJHS: "",
    schoolAddressJHS: "",
    schoolSHS: "",
    yearSHS: "",
    gradeAverageSHS: "",
    schoolAddressSHS: "",
    academicLevel: "",
    collegeDepartment: "",
    degreeProgram: "",
    semester: "",
    campus: "",
  });

  const [touched, setTouched] = useState({});

  // --- OPTIONS ---
  const undergraduateDegrees = {
    "College of Engineering and Architecture": [
      "BS Architecture","BS Chemical Engineering","BS Civil Engineering","BS Computer Engineering","BS Electrical Engineering",
      "BS Electronics Engineering","BS Industrial Engineering","BS Mechanical Engineering",
    ],
    "College of Computer Studies": ["BS Computer Science","BS Data Science and Analytics","BS Entertainment and Multimedia Computing","BS Information Technology"],
    "College of Business Education": ["BS Accountancy","BS Accounting Information System","BS Business Administration","Financial Management","Human Resource Management","Logistics and Supply Chain Management","Marketing Management"],
    "College of Arts": ["Bachelor of Arts in English Language","Bachelor of Arts in Political Science"],
  };

  const graduateDegrees = [
    "Master in Information Systems","Master in Information Technology","Master in Logistics and Supply Chain Management",
    "Master of Engineering with Specialization in Civil Engineering","Master of Engineering with Specialization in Computer Engineering",
    "Master of Engineering with Specialization in Electrical Engineering","Master of Engineering with Specialization in Electronics Engineering",
    "Master of Engineering with Specialization in Industrial Engineering","Master of Engineering with Specialization in Mechanical Engineering",
    "Master of Science in Computer Science",
  ];

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

  // --- FORM SUBMIT ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      "firstName","lastName","dob","gender",
      "nationality","religion","email","mobile",
      "street","barangay","city","province","zipCode",
      "yearGS","yearJHS","yearSHS","gradeAverageSHS",
      "academicLevel","semester","campus","degreeProgram"
    ];

    const emptyFields = requiredFields.filter(f => {
      if(f==="nationality" && formData.nationality==="Other") return !formData.nationalityOther;
      return !formData[f];
    });

    if(emptyFields.length>0){
      alert("Please fill all required fields!");
      setTouched(emptyFields.reduce((acc,f)=>({...acc,[f]:true}),{}));
      return;
    }

    if(!formData.email.includes("@")){
      alert("Email must contain @");
      setTouched({...touched,email:true});
      return;
    }

    if(formData.mobile.length!==11){
      alert("Mobile number must be 11 digits");
      setTouched({...touched,mobile:true});
      return;
    }

    if(formData.landline.length!==8){
      alert("Landline must be 8 digits");
      setTouched({...touched,landline:true});
      return;
    }

    if(formData.zipCode.length!==4){
      alert("Zip Code must be 4 digits");
      setTouched({...touched,zipCode:true});
      return;
    }

    alert("Registration submitted successfully!");
  };

  // --- RENDER INPUT ---
  const renderInput = (label, field, type="text", maxLength)=>{
    const value = formData[field];
    const isError = touched[field] && !value;
    return(
      <div>
        <label>{label}</label>
        <input
          type={type}
          value={value}
          onChange={(e)=>{
            if(["firstName","middleName","lastName","suffix","religion"].includes(field)) handleLettersOnly(e,field);
            else if(["mobile","landline","yearGS","yearJHS","yearSHS","gradeAverageSHS","zipCode"].includes(field)) handleNumbersOnly(e,field,maxLength||255);
            else handleTextChange(e,field);
          }}
          onBlur={()=>handleTouch(field)}
          maxLength={maxLength}
          className={isError?"error":""}
          required
        />
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Alinsub University Portal</h1>
      <form onSubmit={handleSubmit}>

        {/* PERSONAL INFORMATION */}
        <fieldset>
          <legend>Personal Information</legend>
          <div className="grid-4">
            {renderInput("First Name","firstName")}
            {renderInput("Middle Name","middleName")}
            {renderInput("Last Name","lastName")}
            {renderInput("Suffix","suffix")}
          </div>
          <div className="grid-3">
            <div>
              <label>Date of Birth</label>
              <input type="date" value={formData.dob} onChange={(e)=>handleTextChange(e,"dob")}
                onBlur={()=>handleTouch("dob")}
                className={touched.dob && !formData.dob?"error":""} required
              />
            </div>
            <div>
              <label>Gender</label>
              <select value={formData.gender} onChange={(e)=>handleTextChange(e,"gender")}
                onBlur={()=>handleTouch("gender")}
                className={touched.gender && !formData.gender?"error":""} required
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
              </select>
            </div>

            {/* NATIONALITY */}
            <div>
              <label>Nationality</label>
              {formData.nationality==="Other"?(
                <input type="text" value={formData.nationalityOther||""}
                  onChange={(e)=>{
                    if(/^[a-zA-Z\s]*$/.test(e.target.value)){
                      setFormData({...formData,nationalityOther:e.target.value});
                    }
                  }}
                  onBlur={()=>handleTouch("nationalityOther")}
                  className={touched.nationalityOther && !formData.nationalityOther?"error":""}
                  placeholder="Type your nationality"
                  required
                />
              ):(
                <select value={formData.nationality} onChange={(e)=>setFormData({...formData,nationality:e.target.value,nationalityOther:""})}
                  onBlur={()=>handleTouch("nationality")}
                  className={touched.nationality && !formData.nationality?"error":""} required
                >
                  <option value="">Select Nationality</option>
                  <option>Philippines</option>
                  <option>USA</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Japan</option>
                  <option>China</option>
                  <option>India</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Brazil</option>
                  <option>Other</option>
                </select>
              )}
            </div>
          </div>
          <div>{renderInput("Religion","religion")}</div>
        </fieldset>

        {/* CONTACT DETAILS */}
        <fieldset>
          <legend>Contact Details</legend>
          <div className="grid-3">
            {renderInput("Email","email","email")}
            {renderInput("Mobile Number","mobile","text",11)}
            {renderInput("Landline","landline","text",8)}
          </div>
          <h3>Complete Home Address</h3>
          <div className="grid-3">
            {renderInput("Street","street")}
            {renderInput("Barangay","barangay")}
            {renderInput("City","city")}
            {renderInput("Province","province")}
            {renderInput("Zip Code","zipCode","text",4)}
          </div>
        </fieldset>

        {/* ACADEMIC HISTORY */}
        <fieldset>
          <legend>Academic History</legend>
          <h3>Grade School</h3>
          <div className="grid-3">
            {renderInput("School Name","schoolGS")}
            {renderInput("Year Graduated","yearGS","text",4)}
            {renderInput("School Address","schoolAddressGS")}
          </div>
          <h3>Junior High School</h3>
          <div className="grid-3">
            {renderInput("School Name","schoolJHS")}
            {renderInput("Year Graduated","yearJHS","text",4)}
            {renderInput("School Address","schoolAddressJHS")}
          </div>
          <h3>Senior High School</h3>
          <div className="grid-3">
            {renderInput("School Name","schoolSHS")}
            {renderInput("Year Graduated","yearSHS","text",4)}
            {renderInput("Grade Average","gradeAverageSHS")}
            {renderInput("School Address","schoolAddressSHS")}
          </div>
        </fieldset>

        {/* ENROLLMENT CHOICES */}
        <fieldset>
          <legend>Enrollment Choices</legend>
          <h3>Academic Level</h3>
          <label><input type="radio" name="level" value="undergraduate"
            checked={formData.academicLevel==="undergraduate"}
            onChange={(e)=>setFormData({...formData,academicLevel:e.target.value,collegeDepartment:"",degreeProgram:""})} required /> Undergraduate
          </label>
          <label><input type="radio" name="level" value="graduate"
            checked={formData.academicLevel==="graduate"}
            onChange={(e)=>setFormData({...formData,academicLevel:e.target.value,collegeDepartment:"",degreeProgram:""})} /> Graduate
          </label>

          <h3>Semester</h3>
          <label><input type="radio" name="semester" value="1st Semester"
            checked={formData.semester==="1st Semester"}
            onChange={(e)=>setFormData({...formData,semester:e.target.value})} required /> 1st Semester</label>
          <label><input type="radio" name="semester" value="2nd Semester"
            checked={formData.semester==="2nd Semester"}
            onChange={(e)=>setFormData({...formData,semester:e.target.value})} /> 2nd Semester</label>

          <h3>Campus</h3>
          <label><input type="radio" name="campus" value="Manila"
            checked={formData.campus==="Manila"}
            onChange={(e)=>setFormData({...formData,campus:e.target.value})} required /> Manila</label>
          <label><input type="radio" name="campus" value="Quezon City"
            checked={formData.campus==="Quezon City"}
            onChange={(e)=>setFormData({...formData,campus:e.target.value})} /> Quezon City</label>

          {/* Undergraduate */}
          {formData.academicLevel==="undergraduate" && <>
            <h3>College Department</h3>
            <select value={formData.collegeDepartment} onChange={(e)=>setFormData({...formData,collegeDepartment:e.target.value,degreeProgram:""})} required>
              <option value="">Select Department</option>
              {Object.keys(undergraduateDegrees).map(d=> <option key={d}>{d}</option>)}
            </select>
            {formData.collegeDepartment && <>
              <h3>Degree Program</h3>
              <select value={formData.degreeProgram} onChange={(e)=>setFormData({...formData,degreeProgram:e.target.value})} required>
                <option value="">Select Program</option>
                {undergraduateDegrees[formData.collegeDepartment].map(d=><option key={d}>{d}</option>)}
              </select>
            </>}
          </>}

          {/* Graduate */}
          {formData.academicLevel==="graduate" && <>
            <h3>Degree Program (Master’s)</h3>
            <select value={formData.degreeProgram} onChange={(e)=>setFormData({...formData,degreeProgram:e.target.value})} required>
              <option value="">Select Program</option>
              {graduateDegrees.map(d=><option key={d}>{d}</option>)}
            </select>
          </>}
        </fieldset>

        <button type="submit">Submit Registration</button>
      </form>
    </div>
  );
}

export default App;
