const topSources = [
  ["Instagram", "1,122 patients"],
  ["Google", "987 patients"],
  ["Website", "754 patients"],
  ["Phone", "624 patients"]
];

const topServices = [
  ["Botox Injection", "1,406 bookings"],
  ["Lip Filler", "1,201 bookings"],
  ["Hydrafacial", "1,064 bookings"],
  ["Laser Treatment", "932 bookings"]
];

export default function AnalyticsPage() {
  return (
    <div className="page">
      <header className="page">
        <span className="eyebrow">Analytics</span>
        <h2 className="page-title">Track demand, revenue, and provider utilization.</h2>
        <p className="page-subtitle">
          This page is scaffolded for KPI cards, ranked lists, and charts that will
          later be backed by the production analytics queries.
        </p>
      </header>

      <section className="kpi-grid">
        <article className="kpi">
          <span className="eyebrow">Revenue</span>
          <p className="kpi-value">$428k</p>
          <p className="muted">Paid revenue placeholder from seed-backed analytics.</p>
        </article>
        <article className="kpi">
          <span className="eyebrow">Patients</span>
          <p className="kpi-value">4,000</p>
          <p className="muted">Patient count from the provided dataset.</p>
        </article>
        <article className="kpi">
          <span className="eyebrow">Providers</span>
          <p className="kpi-value">10</p>
          <p className="muted">Provider utilization will anchor the dashboard.</p>
        </article>
      </section>

      <section className="panel-grid">
        <article className="placeholder-chart">
          <div>
            <h3>Revenue trend</h3>
            <p className="muted">Placeholder chart container for monthly revenue.</p>
          </div>
        </article>
        <article className="placeholder-chart">
          <div>
            <h3>Appointment status</h3>
            <p className="muted">Placeholder chart container for status distribution.</p>
          </div>
        </article>
      </section>

      <section className="panel-grid">
        <article className="panel">
          <h3>Top patient sources</h3>
          <ul className="list">
            {topSources.map(([label, value]) => (
              <li key={label}>
                <span>{label}</span>
                <span className="mono">{value}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="panel">
          <h3>Top services</h3>
          <ul className="list">
            {topServices.map(([label, value]) => (
              <li key={label}>
                <span>{label}</span>
                <span className="mono">{value}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
