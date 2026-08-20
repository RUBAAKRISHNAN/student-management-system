import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiFetch } from "../api/api";


import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import "../styles/AddStudent.css"
function AddStudent() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [err,seterr]=useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("BUTTON CLICKED");

  if(!name ||!email || !course){
    alert("please fill the form correctly");
    return;
  }
if((!email.includes("@")) || (!email.includes("."))){
  alert("Enter Correct email");
  return;
}
// const token = localStorage.getItem("token");

// if (!token) {
//   alert("Please login first");
//   navigate("/login");
//   return;
// }
  const newStudent = {
    name,
    email,
    course
  };
  

  try {
    // const response = await fetch("http://localhost:5000/api/students", {
    //   method: "POST",

    //   headers: {
    //     "Content-Type": "application/json",
    //      "Authorization": `Bearer ${token}`
    //   },

    //   body: JSON.stringify(newStudent)
    // });
   const response=await apiFetch("/students",{
    method:"POST",
    body:JSON.stringify(newStudent)
   })
    const data = await response.json();

    console.log("Student added:", data);

    setName("");
    setEmail("");
    setCourse("");
    navigate("/students")

  } catch (error) {
    console.log("Error:", error);
  }
};
 return (
  <MainLayout>

    <div className="add-student-page">

      <div className="add-student-header">
        <h1>Add Student</h1>
        <p>Add a new student to the management system</p>
      </div>

      <div className="student-form-card">

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter student name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>


          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter student email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>


          <div className="form-group">
            <label>Course</label>

            <input
              type="text"
              placeholder="Enter course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>


          <button
            type="submit"
            className="add-submit-btn"
          >
            Add Student
          </button>

        </form>


        <div className="back-links">

          <Link to="/students">Students</Link>

          <Link to="/dashboard">DashBoard</Link>

        </div>

      </div>

    </div>

  </MainLayout>
);
}

export default AddStudent;