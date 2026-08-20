import { Link } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">

      <h3 className="sidebar-title">
        Menu
      </h3>

      <nav className="sidebar-menu">

        <Link to="/dashboard" className="sidebar-link">
          🏠 Dashboard
        </Link>

        <Link to="/students" className="sidebar-link">
          👨‍🎓 Students
        </Link>

        <Link to="/add-student" className="sidebar-link">
          ➕ Add Student
        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;