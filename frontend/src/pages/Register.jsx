import {useState} from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import { apiFetch } from "../api/api";
import { Link } from "react-router-dom";
import "../styles/Auth.css";
function Register(){
    const navigate=useNavigate();
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(! name||! email||! password){
            alert("Fill the field correctly");
            return;
        }
        const registerData={
            name,email,password
        };
       try {

  const response = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(registerData)
  });

  const data = await response.json();

  console.log("Registered data:", data);

  if (!response.ok) {
    alert(data.message || "Registration failed");
    return;
  }

  alert("Registration Successful");

  navigate("/login");

} catch (err) {

  console.log("Register error:", err);
  alert("Something went wrong");

}}
   return (
  <div className="auth-page">

    <div className="auth-card">

      <div className="auth-logo">
        <h1>Student Management System</h1>
      </div>

      <div className="auth-title">
        <h2>Create Account 🚀</h2>
        <p>Register to manage your students</p>
      </div>


      <form onSubmit={handleSubmit}>

        <div className="auth-form-group">

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />

        </div>


        <div className="auth-form-group">

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />

        </div>


        <div className="auth-form-group">

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />

        </div>


        <button
          type="submit"
          className="auth-btn"
        >
          Register
        </button>

      </form>


      <div className="auth-footer">

        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>

    </div>

  </div>
);
}
export default Register;