import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import "../styles/Dashboard.css";
import Dashcard from "../components/Dashcard";
import { apiFetch } from "../api/api";
function Dashboard() {

  const [students, setStudents] = useState([]);

  useEffect(() => {

    const fetchStudents = async () => {

      try {

        const token = localStorage.getItem("token");

      const response = await apiFetch("/students");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setStudents(data);

      } catch (err) {

        console.log("Dashboard error:", err);

      }
    };

    fetchStudents();

  }, []);


  const totalCourses = new Set(
    students.map((student) => student.course)
  ).size;


  return (
    <MainLayout>

      <div className="dashboard">

        <div className="dashboard-heading">

          <div>
            <h1>Dashboard</h1>
            <p>Welcome to your Student Management System 👋</p>
          </div>

        </div>


        <div className="dashboard-cards">

          <Dashcard
            title="Total Students"
            value={students.length}
            icon="👨‍🎓"
          />

          <Dashcard
            title="Total Courses"
            value={totalCourses}
            icon="📚"
          />

          <Dashcard
            title="System Status"
            value="Active"
            icon="🟢"
          />

        </div>


        <div className="recent-section">

          <div className="section-header">
            <h2>Recent Students</h2>
          </div>

          <div className="recent-list">

            {students.slice(-5).reverse().map((student) => (

              <div
                className="recent-student"
                key={student._id}
              >

                <div className="student-avatar">
                  {student.name.charAt(0).toUpperCase()}
                </div>

                <div className="student-info">

                  <strong>{student.name}</strong>

                  <span>{student.email}</span>

                </div>

                <span className="dashboard-course">
                  {student.course}
                </span>

              </div>

            ))}


            {students.length === 0 && (
              <p className="no-students">
                No students available.
              </p>
            )}

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;