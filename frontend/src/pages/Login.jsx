import { useState } from "react";
import Input from "../components/Input";
import Navbar from "../components/Navbar";

import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Login() {

  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    const loginData = {
      email: email,
      password: pass
    };

    console.log("Sending:", loginData);

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(loginData)
        }
      );

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (response.ok) {

        console.log("TOKEN:", data.token);

        localStorage.setItem("token", data.token);

        localStorage.setItem(
          "user",
          JSON.stringify(data.User)
        );

        alert("Login Successful");

        navigate("/dashboard");

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.log("Login error:", err);

    }
  };


 return (
  <div className="auth-page">

    <div className="auth-card">

      <div className="auth-logo">
        <h1>Student Management System</h1>
      </div>

      <div className="auth-title">
        <h2>Welcome Back 👋</h2>
        <p>Login to manage your students</p>
      </div>

      <form onSubmit={handleSubmit}>

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
            placeholder="Enter your password"
            value={pass}
            onChange={(e) => setpass(e.target.value)}
          />

        </div>


        <button
          type="submit"
          className="auth-btn"
        >
          Login
        </button>

      </form>


      <div className="auth-footer">

        <p>
          Don't have an account?{" "}
          <a href="/register">
            Register
          </a>
        </p>

      </div>

    </div>

  </div>
);
}

export default Login;