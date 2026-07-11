import Link from "next/link";

export default function HomePage() {
  return (
    <div className="page">
      <section className="hero-grid">
        <div className="hero">
          <span className="eyebrow">Overview</span>
          <h2>Build the dashboard around real workflow, not demo fluff.</h2>
          <p>
            This frontend scaffold matches the take-home architecture: Next.js on the
            frontend, Python on the backend, and PostgreSQL underneath both.
          </p>
          <div className="toolbar">
            <Link className="tag" href="/patients">
              Patient table
            </Link>
            <Link className="tag" href="/analytics">
              Analytics dashboard
            </Link>
          </div>
        </div>
        <div className="panel">
          <h3>Current state</h3>
          <p>
            The Next.js app is now scaffolded and wired into local development. The
            next meaningful step is replacing these placeholder views with the Figma
            direction and real backend data.
          </p>
        </div>
      </section>

      <section className="kpi-grid">
        <article className="kpi">
          <span className="eyebrow">Frontend</span>
          <p className="kpi-value">Next.js 14</p>
          <p className="muted">App Router, TypeScript, local dev via Nix.</p>
        </article>
        <article className="kpi">
          <span className="eyebrow">Backend</span>
          <p className="kpi-value">FastAPI</p>
          <p className="muted">Current API surface is placeholder scaffolding.</p>
        </article>
        <article className="kpi">
          <span className="eyebrow">Deploy</span>
          <p className="kpi-value">Railway</p>
          <p className="muted">Separate frontend, backend, and Postgres services.</p>
        </article>
      </section>
    </div>
  );
}
