import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../api/api";

function EditStudent() {

  const { id } = useParams();
  const navigate = useNavigate();

  console.log("Student id:", id);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [course, setcourse] = useState("");

  // GET one student
  useEffect(() => {

    const fetchStudent = async () => {

      try {

        const response = await apiFetch(`/students/${id}`);

        const data = await response.json();

        console.log("Student data:", data);

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


  // UPDATE student
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

      console.log("Updated student:", data);

      if (!response.ok) {
        alert(data.message || "Update failed");
        return;
      }

      alert("Student Updated Successfully");

      setname("");
      setemail("");
      setcourse("");

      navigate("/students");

    } catch (err) {

      console.log("Update error:", err.message);

    }
  };


  return (
    <div>

      <h1>Edit Student</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Name:</label>
          <br />

          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>

        <div>
          <label>Email:</label>
          <br />

          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>

        <div>
          <label>Course:</label>
          <br />

          <input
            value={course}
            onChange={(e) => setcourse(e.target.value)}
          />
        </div>

        <button type="submit">
          Update Student
        </button>

      </form>

    </div>
  );
}

export default EditStudent;