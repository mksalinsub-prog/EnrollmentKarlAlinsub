import React, { useState } from "react";
import "./App.css";

type AcademicLevel = "" | "undergraduate" | "graduate";
type Semester = "" | "1st Semester" | "2nd Semester";
type Campus = "" | "Manila" | "Quezon City";

type UndergraduateDepartment =
  | ""
  | "College of Engineering and Architecture"
  | "College of Computer Studies"
  | "College of Business Education"
  | "College of Arts";

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  dob: string;
  gender: string;
  nationality: string;
  nationalityOther: string;
  religion: string;
  email: string;
  mobile: string;
  landline: string;
  street: string;
  barangay: string;
  city: string;
  province: string;
  zipCode: string;
  schoolGS: string;
  yearGS: string;
  schoolAddressGS: string;
  schoolJHS: string;
  yearJHS: string;
  schoolAddressJHS: string;
  schoolSHS: string;
  yearSHS: string;
  gradeAverageSHS: string;
  schoolAddressSHS: string;
  academicLevel: AcademicLevel;
  collegeDepartment: UndergraduateDepartment;
  degreeProgram: string;
  semester: Semester;
  campus: Campus;
}

type TouchedFields = Partial<Record<keyof FormData, boolean>>;

const initialForm: FormData = {
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
};

const undergraduateDegrees: Record<
  Exclude<UndergraduateDepartment, "">,
  string[]
> = {
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

const graduateDegrees: string[] = [
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

function App() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [touched, setTouched] = useState<TouchedFields>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleLettersOnly = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormData
  ): void => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleNumbersOnly = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormData,
    maxLength: number
  ): void => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= maxLength) {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof FormData
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleTouch = (field: keyof FormData): void => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const requiredFields: (keyof FormData)[] = [
      "firstName",
      "lastName",
      "dob",
      "gender",
      "nationality",
      "religion",
      "email",
      "mobile",
      "street",
      "barangay",
      "city",
      "province",
      "zipCode",
      "yearGS",
      "yearJHS",
      "yearSHS",
      "gradeAverageSHS",
      "academicLevel",
      "semester",
      "campus",
      "degreeProgram",
    ];

    const emptyFields = requiredFields.filter((field) => {
      if (field === "nationality" && formData.nationality === "Other") {
        return !formData.nationalityOther;
      }
      return !formData[field];
    });

    if (emptyFields.length > 0) {
      alert("Please fill all required fields!");
      const newTouched = emptyFields.reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {} as TouchedFields);

      if (formData.nationality === "Other" && !formData.nationalityOther) {
        newTouched.nationalityOther = true;
      }

      setTouched((prev) => ({ ...prev, ...newTouched }));
      return;
    }

    if (!formData.email.includes("@")) {
      alert("Email must contain @");
      setTouched((prev) => ({ ...prev, email: true }));
      return;
    }

    if (formData.mobile.length !== 11) {
      alert("Mobile number must be 11 digits");
      setTouched((prev) => ({ ...prev, mobile: true }));
      return;
    }

    if (formData.landline && formData.landline.length !== 8) {
      alert("Landline must be 8 digits");
      setTouched((prev) => ({ ...prev, landline: true }));
      return;
    }

    if (formData.zipCode.length !== 4) {
      alert("Zip Code must be 4 digits");
      setTouched((prev) => ({ ...prev, zipCode: true }));
      return;
    }

    setSubmitted(true);
  };

  const handleEnrollAgain = (): void => {
    setFormData(initialForm);
    setTouched({});
    setSubmitted(false);
  };

  const renderInput = (
    label: string,
    field: keyof FormData,
    type: React.HTMLInputTypeAttribute = "text",
    maxLength?: number,
    isRequired: boolean = true
  ) => {
    const value = formData[field];
    const isError = Boolean(touched[field] && isRequired && !value);

    return (
      <div>
        <label>{label}</label>
        <input
          type={type}
          value={value}
          onChange={(e) => {
            if (
              [
                "firstName",
                "middleName",
                "lastName",
                "suffix",
                "religion",
                "schoolGS",
                "schoolJHS",
                "schoolSHS",
              ].includes(field)
            ) {
              handleLettersOnly(e, field);
            } else if (
              [
                "mobile",
                "landline",
                "yearGS",
                "yearJHS",
                "yearSHS",
                "gradeAverageSHS",
                "zipCode",
              ].includes(field)
            ) {
              handleNumbersOnly(e, field, maxLength ?? 255);
            } else {
              handleTextChange(e, field);
            }
          }}
          onBlur={() => handleTouch(field)}
          maxLength={maxLength}
          className={isError ? "error" : ""}
          required={isRequired}
        />
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Alinsub University Portal</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Personal Information</legend>
            <div className="grid-4">
              {renderInput("First Name", "firstName")}
              {renderInput("Middle Name", "middleName")}
              {renderInput("Last Name", "lastName")}
              {renderInput("Suffix", "suffix", "text", 255, false)}
            </div>

            <div className="grid-3">
              <div>
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleTextChange(e, "dob")}
                  onBlur={() => handleTouch("dob")}
                  className={touched.dob && !formData.dob ? "error" : ""}
                  required
                />
              </div>

              <div>
                <label>Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleTextChange(e, "gender")}
                  onBlur={() => handleTouch("gender")}
                  className={touched.gender && !formData.gender ? "error" : ""}
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                </select>
              </div>

              <div>
                <label>Nationality</label>
                {formData.nationality === "Other" ? (
                  <input
                    type="text"
                    value={formData.nationalityOther}
                    onChange={(e) => {
                      if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                        setFormData((prev) => ({
                          ...prev,
                          nationalityOther: e.target.value,
                        }));
                      }
                    }}
                    onBlur={() => handleTouch("nationalityOther")}
                    className={
                      touched.nationalityOther && !formData.nationalityOther
                        ? "error"
                        : ""
                    }
                    placeholder="Type your nationality"
                    required
                  />
                ) : (
                  <select
                    value={formData.nationality}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        nationality: e.target.value,
                        nationalityOther: "",
                      }))
                    }
                    onBlur={() => handleTouch("nationality")}
                    className={
                      touched.nationality && !formData.nationality ? "error" : ""
                    }
                    required
                  >
                    <option value="">Select Nationality</option>
                    <option value="Philippines">Philippines</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Japan">Japan</option>
                    <option value="China">China</option>
                    <option value="India">India</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Other">Other</option>
                  </select>
                )}
              </div>
            </div>

            <div>{renderInput("Religion", "religion")}</div>
          </fieldset>

          <fieldset>
            <legend>Contact Details</legend>
            <div className="grid-3">
              {renderInput("Email", "email", "email")}
              {renderInput("Mobile Number", "mobile", "text", 11)}
              {renderInput("Landline", "landline", "text", 8, false)}
            </div>

            <h3>Complete Home Address</h3>
            <div className="grid-3">
              {renderInput("Street", "street")}
              {renderInput("Barangay", "barangay")}
              {renderInput("City", "city")}
              {renderInput("Province", "province")}
              {renderInput("Zip Code", "zipCode", "text", 4)}
            </div>
          </fieldset>

          <fieldset>
            <legend>Academic History</legend>
            <h3>Grade School</h3>
            <div className="grid-3">
              {renderInput("School Name", "schoolGS")}
              {renderInput("Year Graduated", "yearGS", "text", 4)}
              {renderInput("School Address", "schoolAddressGS")}
            </div>

            <h3>Junior High School</h3>
            <div className="grid-3">
              {renderInput("School Name", "schoolJHS")}
              {renderInput("Year Graduated", "yearJHS", "text", 4)}
              {renderInput("School Address", "schoolAddressJHS")}
            </div>

            <h3>Senior High School</h3>
            <div className="grid-3">
              {renderInput("School Name", "schoolSHS")}
              {renderInput("Year Graduated", "yearSHS", "text", 4)}
              {renderInput("Grade Average", "gradeAverageSHS")}
              {renderInput("School Address", "schoolAddressSHS")}
            </div>
          </fieldset>

          <fieldset>
            <legend>Enrollment Choices</legend>

            <div className="academic-section">
              <label>Academic Level</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="level"
                    value="undergraduate"
                    checked={formData.academicLevel === "undergraduate"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData((prev) => ({
                        ...prev,
                        academicLevel: e.target.value as AcademicLevel,
                        collegeDepartment: "",
                        degreeProgram: "",
                      }))
                    }
                    required
                  />{" "}
                  Undergraduate
                </label>

                <label>
                  <input
                    type="radio"
                    name="level"
                    value="graduate"
                    checked={formData.academicLevel === "graduate"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData((prev) => ({
                        ...prev,
                        academicLevel: e.target.value as AcademicLevel,
                        collegeDepartment: "",
                        degreeProgram: "",
                      }))
                    }
                  />{" "}
                  Graduate
                </label>
              </div>

              <label>Semester</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="semester"
                    value="1st Semester"
                    checked={formData.semester === "1st Semester"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData((prev) => ({
                        ...prev,
                        semester: e.target.value as Semester,
                      }))
                    }
                    required
                  />{" "}
                  1st Semester
                </label>

                <label>
                  <input
                    type="radio"
                    name="semester"
                    value="2nd Semester"
                    checked={formData.semester === "2nd Semester"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData((prev) => ({
                        ...prev,
                        semester: e.target.value as Semester,
                      }))
                    }
                  />{" "}
                  2nd Semester
                </label>
              </div>

              <label>Campus</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="campus"
                    value="Manila"
                    checked={formData.campus === "Manila"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData((prev) => ({
                        ...prev,
                        campus: e.target.value as Campus,
                      }))
                    }
                    required
                  />{" "}
                  Manila
                </label>

                <label>
                  <input
                    type="radio"
                    name="campus"
                    value="Quezon City"
                    checked={formData.campus === "Quezon City"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData((prev) => ({
                        ...prev,
                        campus: e.target.value as Campus,
                      }))
                    }
                  />{" "}
                  Quezon City
                </label>
              </div>

              {formData.academicLevel === "undergraduate" && (
                <div className="dropdown-group">
                  <label>College Department</label>
                  <select
                    value={formData.collegeDepartment}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        collegeDepartment:
                          e.target.value as UndergraduateDepartment,
                        degreeProgram: "",
                      }))
                    }
                    required
                  >
                    <option value="">Select Department</option>
                    {Object.keys(undergraduateDegrees).map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>

                  {formData.collegeDepartment && (
                    <>
                      <label>Degree Program</label>
                      <select
                        value={formData.degreeProgram}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            degreeProgram: e.target.value,
                          }))
                        }
                        required
                      >
                        <option value="">Select Program</option>
                        {undergraduateDegrees[
                          formData.collegeDepartment as Exclude<
                            UndergraduateDepartment,
                            ""
                          >
                        ].map((degree) => (
                          <option key={degree} value={degree}>
                            {degree}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                </div>
              )}

              {formData.academicLevel === "graduate" && (
                <div className="dropdown-group">
                  <label>Degree Program (Master’s)</label>
                  <select
                    value={formData.degreeProgram}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        degreeProgram: e.target.value,
                      }))
                    }
                    required
                  >
                    <option value="">Select Program</option>
                    {graduateDegrees.map((degree) => (
                      <option key={degree} value={degree}>
                        {degree}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </fieldset>

          <button type="submit">Submit Registration</button>
        </form>
      ) : (
        <div className="confirmation-section">
          <h2>Registration Confirmed!</h2>
          <p>
            Thank you, {formData.firstName} {formData.lastName}, for enrolling.
          </p>
          <p>
            You have successfully registered for{" "}
            <strong>{formData.degreeProgram}</strong> in the{" "}
            <strong>{formData.semester}</strong> at{" "}
            <strong>{formData.campus}</strong> campus.
          </p>
          <button onClick={handleEnrollAgain}>Enroll Again</button>
        </div>
      )}

      <style>{`
        .radio-group {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          margin-bottom: 1rem;
        }
        .dropdown-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .dropdown-group label {
          font-weight: 500;
        }
        .error {
          border-color: red;
        }
        .confirmation-section {
          text-align: center;
          padding: 2rem;
          border: 2px solid #4caf50;
          border-radius: 8px;
          background-color: #e6f9e6;
        }
        .confirmation-section button {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}

export default App;