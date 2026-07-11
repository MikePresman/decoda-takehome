const rows = [
  {
    name: "Betty Smith",
    source: "Instagram",
    created: "Oct 26, 2025",
    appointments: 4,
    lastVisit: "Nov 17, 2025",
    value: "$1,248"
  },
  {
    name: "Carla Turner",
    source: "Website",
    created: "Sep 02, 2025",
    appointments: 2,
    lastVisit: "Nov 13, 2025",
    value: "$490"
  },
  {
    name: "Monica Rivera",
    source: "Google",
    created: "Aug 14, 2025",
    appointments: 6,
    lastVisit: "Nov 19, 2025",
    value: "$2,085"
  }
];

export default function PatientsPage() {
  return (
    <div className="page">
      <header className="page">
        <span className="eyebrow">Patient table</span>
        <h2 className="page-title">Find patients quickly and act with confidence.</h2>
        <p className="page-subtitle">
          This is the scaffold for the front-desk workflow page. Search, filters, and
          sorting will connect to the backend patient endpoint next.
        </p>
      </header>

      <section className="table-card">
        <div className="toolbar">
          <input placeholder="Search by patient, email, or phone" />
          <select defaultValue="all">
            <option value="all">All sources</option>
            <option value="instagram">Instagram</option>
            <option value="website">Website</option>
            <option value="google">Google</option>
          </select>
          <select defaultValue="created_desc">
            <option value="created_desc">Newest first</option>
            <option value="value_desc">Highest value</option>
            <option value="appointments_desc">Most appointments</option>
          </select>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Source</th>
              <th>Created</th>
              <th>Appointments</th>
              <th>Last visit</th>
              <th>Lifetime value</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>
                  <span className="tag">{row.source}</span>
                </td>
                <td>{row.created}</td>
                <td>{row.appointments}</td>
                <td>{row.lastVisit}</td>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
