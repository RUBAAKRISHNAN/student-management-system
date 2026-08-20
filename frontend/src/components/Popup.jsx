import { useNavigate } from "react-router-dom";
import "../styles/popup.css";
function Popup({ onClose }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };
  const handlecancel=()=>{
    onClose;
    navigate("/login")
  }

  return (
    <div className="popup-overlay">

      <div className="login-popup">

        <div className="popup-icon">
          🔒
        </div>

        <h2>Login Required</h2>

        <p>
          Please login first to access this page.
        </p>

        <div className="popup-buttons">

          <button
            className="cancel-btn"
            onClick={handlecancel}
           
          >
            Cancel
            
          </button>

          <button
            className="login-btn"
            onClick={handleLogin}
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Popup;