import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/api";
import "../styles/students.css";
import "../styles/DeletePopup.css";
import DeletePopup from "../components/DeletePopup";
function Students() {

  const navigate = useNavigate();
  const[loading,setloading]=useState(true);
  const[error,seterror]=useState("");
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [coursefilter, setCoursefilter] = useState("All");
  const [deleteStudent, setDeleteStudent] = useState(null);

  useEffect(() => {

    const fetchStudents = async () => {

      // const token = localStorage.getItem("token");
      

      // console.log("TOKEN:", token);

      // if (!token) {
      //   console.log("No token found");
      //   navigate("/login");
      //   return;
      // }

      try {

        // const response = await fetch(
        //   "http://localhost:5000/api/students",
        //   {
        //     method: "GET",

        //     headers: {
        //       "Authorization": `Bearer ${token}`
        //     }
        //   }
        // );
        setloading(true);
        seterror("")
        const response=await apiFetch('/students')
        const data = await response.json();

        console.log("STUDENT RESPONSE:", data);

        if (!response.ok) {
          throw new Error(data.message);
        }

        setStudents(data);

      } catch (err) {

        console.log("Error fetching students:", err);
        seterror(err.message)

      }
      finally{
        setloading(false)
      }
    };

    fetchStudents();

  }, [navigate]);


  const handleDelete = async (id) => {
  try {

    const response = await apiFetch(`/students/${id}`, {
      method: "DELETE"
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      throw new Error(data.message || "Delete failed");
    }

    setStudents(
      students.filter((student) => student._id !== id)
    );

  } catch (err) {

    console.log("Delete error:", err);
    alert(err.message);

  }
};

  const filterStudents = students.filter((student) => {

    const matchSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      student.course.toLowerCase().includes(search.toLowerCase());

    const matchCourse =
      coursefilter === "All" ||
      student.course === coursefilter;

    return matchSearch && matchCourse;
  });


  return (
  <MainLayout>

    <div className="students-page">

      <div className="students-header">

        <div>
          <h1>Students</h1>
          <p>Manage all registered students</p>
        </div>

        <button
          className="add-student-btn"
          onClick={() => navigate("/add-student")}
        >
          + Add Student
        </button>

      </div>


      <div className="student-controls">

        <input
          className="search-input"
          type="text"
          placeholder="🔍 Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="course-select"
          value={coursefilter}
          onChange={(e) => setCoursefilter(e.target.value)}
        >
          <option value="All">All Courses</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="BME">BME</option>
        </select>

      </div>


      <div className="table-container">

        <table className="students-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filterStudents.map((student,index) => (

              <tr key={student._id}>

                <td className="student-id">
                 #{index + 1}
                </td>

                <td>
                  <strong>{student.name}</strong>
                </td>

                <td>
                  {student.email}
                </td>

                <td>
                  <span className="course-badge">
                    {student.course}
                  </span>
                </td>

                <td className="action-buttons">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(`/edit-student/${student._id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => setDeleteStudent(student)}
                    
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {filterStudents.length === 0 && (
          <div className="empty-students">
            <h3>No students found</h3>
            <p>Try changing your search or course filter.</p>
          </div>
        )}
        

      </div>
        {deleteStudent && (
  <DeletePopup
    student={deleteStudent}

    onCancel={() => {
      setDeleteStudent(null);
    }}

    onConfirm={async () => {

      await handleDelete(deleteStudent._id);

      setDeleteStudent(null);

    }}
  />
)}
    </div>
      
  </MainLayout>
);
}

export default Students;