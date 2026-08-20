function Input({ label, type, placeholder, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <br />

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      <br />
   
    </div>
  );
}

export default Input;