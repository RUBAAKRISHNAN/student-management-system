import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../api/api";
import "../styles/EditStudent.css";

function EditStudent() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [course, setcourse] = useState("");

  useEffect(() => {

    const fetchStudent = async () => {

      try {

        const response = await apiFetch(`/students/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setname(data.name);
        setemail(data.email);
        setcourse(data.course);

      } catch (err) {

        console.log("Error:", err);

      }
    };

    fetchStudent();

  }, [id]);


  const handleSubmit = async (e) => {

    e.preventDefault();

    const updatedstudent = {
      name,
      email,
      course
    };

    try {

      const response = await apiFetch(`/students/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedstudent)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Update failed");
        return;
      }

      alert("Student Updated Successfully");

      navigate("/students");

    } catch (err) {

      console.log("Update error:", err.message);

    }
  };


  return (
    <div className="edit-page">

      <div className="edit-card">

        <div className="edit-header">
          <h1>Edit Student</h1>
          <p>Update student information</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="edit-form-group">
            <label>Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>


          <div className="edit-form-group">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>


          <div className="edit-form-group">
            <label>Course</label>

            <input
              type="text"
              value={course}
              onChange={(e) => setcourse(e.target.value)}
            />
          </div>


          <div className="edit-actions">

            <button
              type="button"
              className="edit-cancel-btn"
              onClick={() => navigate("/students")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edit-update-btn"
            >
              Update Student
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditStudent;