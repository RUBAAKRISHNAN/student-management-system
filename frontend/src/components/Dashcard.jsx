function Dashcard({ title, value, icon }) {
  return (
    <div className="dash-card">

      <div className="dash-card-icon">
        {icon}
      </div>

      <div className="dash-card-content">

        <p>{title}</p>

        <h2>{value}</h2>

      </div>

    </div>
  );
}

export default Dashcard;