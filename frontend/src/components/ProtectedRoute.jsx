import { useState } from "react";
import Popup from "./Popup";

function ProtectedRoutes({ children }) {

  const token = localStorage.getItem("token");

  const [showPopup, setShowPopup] = useState(!token);

  if (!token) {
    return (
      <>
        {showPopup && (
          <Popup
            onClose={() => setShowPopup(false)}
          />
        )}
      </>
    );
  }

  return children;
}

export default ProtectedRoutes;