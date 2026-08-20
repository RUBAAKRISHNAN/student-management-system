import "../styles/DeletePopup.css";

function DeletePopup({ student, onCancel, onConfirm }) {

  return (
    <div className="delete-overlay">

      <div className="delete-popup">

        <div className="delete-icon">
          ⚠️
        </div>

        <h2>Delete Student?</h2>

        <p>
          Are you sure you want to delete{" "}
          <strong>{student.name}</strong>?
        </p>

        <p className="delete-warning">
          This action cannot be undone.
        </p>

        <div className="delete-buttons">

          <button
            className="delete-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="delete-confirm"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeletePopup;