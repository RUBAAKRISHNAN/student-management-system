  import { useState } from "react";
  import { Routes, Route } from "react-router-dom";

  import Login from "./pages/Login";
  import Register from "./pages/Register";
  import Dashboard from "./pages/Dashboard";
  import Students from "./pages/Students";
  import AddStudent from "./pages/AddStudent";
import EditStudent  from "./pages/EditStudent";
import ProtectedRoute from "./components/ProtectedRoute";
  function App() {
    const [students, setStudents] = useState("");

    return (
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={ <Register />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute> } />

        <Route
          path="/students"
          element={<ProtectedRoute><Students/></ProtectedRoute>}
        />

        <Route
          path="/add-student"
          element={
            <ProtectedRoute>
            <AddStudent/>
            </ProtectedRoute>
            
           
          }
        />
        <Route path="edit-student/:id" 
        element={
          <ProtectedRoute>
          <EditStudent/></ProtectedRoute>
        }/>
      </Routes>
    );
  }

  export default App;