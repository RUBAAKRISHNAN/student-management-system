import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
function Navbar(){
    const navigate=useNavigate();
    const Handlelayout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("User");
        navigate("/login");
    }
    return (
        <div className="navbar" >
        <h2>STUDENT MANAGEMENT SYSTEM</h2>
        <button onClick={Handlelayout}  className="logout-btn">Logout</button>
        
        </div>
    );
}
export default Navbar;