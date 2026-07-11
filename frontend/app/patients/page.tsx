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
    <div className="grid gap-6">
      <header className="grid gap-3">
        <span className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
          Patient table
        </span>
        <h2 className="text-4xl leading-tight text-foreground sm:text-5xl">
          Find patients quickly and act with confidence.
        </h2>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground">
          This is the scaffold for the front-desk workflow page. Search, filters, and
          sorting will connect to the backend patient endpoint next.
        </p>
      </header>

      <section className="rounded-[28px] border bg-card/95 p-6 shadow-[0_18px_60px_rgba(48,34,20,0.08)]">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row">
          <input
            className="min-w-0 flex-1 rounded-2xl border bg-[color:var(--input-background)] px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none"
            placeholder="Search by patient, email, or phone"
          />
          <select
            className="rounded-2xl border bg-[color:var(--input-background)] px-4 py-3 text-foreground focus:outline-none"
            defaultValue="all"
          >
            <option value="all">All sources</option>
            <option value="instagram">Instagram</option>
            <option value="website">Website</option>
            <option value="google">Google</option>
          </select>
          <select
            className="rounded-2xl border bg-[color:var(--input-background)] px-4 py-3 text-foreground focus:outline-none"
            defaultValue="created_desc"
          >
            <option value="created_desc">Newest first</option>
            <option value="value_desc">Highest value</option>
            <option value="appointments_desc">Most appointments</option>
          </select>
        </div>
        <div className="overflow-hidden rounded-2xl border">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-secondary/65 text-muted-foreground">
              <tr>
                <th className="px-4 py-4 font-medium">Patient</th>
                <th className="px-4 py-4 font-medium">Source</th>
                <th className="px-4 py-4 font-medium">Created</th>
                <th className="px-4 py-4 font-medium">Appointments</th>
                <th className="px-4 py-4 font-medium">Last visit</th>
                <th className="px-4 py-4 font-medium">Lifetime value</th>
              </tr>
            </thead>
            <tbody className="bg-card">
              {rows.map((row) => (
                <tr key={row.name} className="border-t align-middle">
                  <td className="px-4 py-4 text-foreground">{row.name}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                      {row.source}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">{row.created}</td>
                  <td className="px-4 py-4 text-foreground">{row.appointments}</td>
                  <td className="px-4 py-4 text-muted-foreground">{row.lastVisit}</td>
                  <td className="px-4 py-4 font-medium text-foreground">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Active patients", "4,000", "Seed count loaded from the provided dataset"],
          ["Avg. patient value", "$742", "Placeholder until backend analytics are wired"],
          ["Recent bookings", "182", "Will become a live short-horizon operational metric"]
        ].map(([label, value, note]) => (
          <article
            key={label}
            className="rounded-[24px] border bg-card px-6 py-5 shadow-[0_14px_40px_rgba(48,34,20,0.06)]"
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {label}
            </p>
            <p className="mt-3 text-4xl font-medium text-foreground">{value}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{note}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
