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
    <div className="grid gap-6">
      <header className="grid gap-3">
        <span className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
          Analytics
        </span>
        <h2 className="text-4xl leading-tight text-foreground sm:text-5xl">
          Track demand, revenue, and provider utilization.
        </h2>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground">
          This page is scaffolded for KPI cards, ranked lists, and charts that will
          later be backed by the production analytics queries.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-[24px] border bg-card px-6 py-5 shadow-[0_14px_40px_rgba(48,34,20,0.06)]">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Revenue
          </span>
          <p className="mt-3 text-4xl font-medium text-foreground">$428k</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Paid revenue placeholder from seed-backed analytics.
          </p>
        </article>
        <article className="rounded-[24px] border bg-card px-6 py-5 shadow-[0_14px_40px_rgba(48,34,20,0.06)]">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Patients
          </span>
          <p className="mt-3 text-4xl font-medium text-foreground">4,000</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Patient count from the provided dataset.
          </p>
        </article>
        <article className="rounded-[24px] border bg-card px-6 py-5 shadow-[0_14px_40px_rgba(48,34,20,0.06)]">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Providers
          </span>
          <p className="mt-3 text-4xl font-medium text-foreground">10</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Provider utilization will anchor the dashboard.
          </p>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-[28px] border bg-card p-6 shadow-[0_18px_60px_rgba(48,34,20,0.08)]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="text-lg text-foreground">Revenue trend</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Placeholder chart container for monthly revenue.
              </p>
            </div>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              Monthly
            </span>
          </div>
          <div className="mt-6 h-64 rounded-[22px] border bg-[linear-gradient(180deg,rgba(184,134,74,0.24),rgba(184,134,74,0.04)),linear-gradient(90deg,#f9f5ef,#fff)]" />
        </article>
        <article className="rounded-[28px] border bg-card p-6 shadow-[0_18px_60px_rgba(48,34,20,0.08)]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="text-lg text-foreground">Appointment status</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Placeholder chart container for status distribution.
              </p>
            </div>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              Distribution
            </span>
          </div>
          <div className="mt-6 h-64 rounded-[22px] border bg-[linear-gradient(180deg,rgba(90,138,138,0.24),rgba(90,138,138,0.04)),linear-gradient(90deg,#f9f5ef,#fff)]" />
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-[28px] border bg-card p-6 shadow-[0_18px_60px_rgba(48,34,20,0.08)]">
          <h3 className="text-lg text-foreground">Top patient sources</h3>
          <ul className="mt-5 space-y-4">
            {topSources.map(([label, value]) => (
              <li
                key={label}
                className="flex items-baseline justify-between gap-4 border-b pb-4 last:border-b-0 last:pb-0"
              >
                <span className="text-foreground">{label}</span>
                <span className="font-mono text-sm text-muted-foreground">{value}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-[28px] border bg-card p-6 shadow-[0_18px_60px_rgba(48,34,20,0.08)]">
          <h3 className="text-lg text-foreground">Top services</h3>
          <ul className="mt-5 space-y-4">
            {topServices.map(([label, value]) => (
              <li
                key={label}
                className="flex items-baseline justify-between gap-4 border-b pb-4 last:border-b-0 last:pb-0"
              >
                <span className="text-foreground">{label}</span>
                <span className="font-mono text-sm text-muted-foreground">{value}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
