import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)]">
        <div className="rounded-[28px] border bg-card/90 p-8 shadow-[0_18px_60px_rgba(48,34,20,0.08)] backdrop-blur">
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
            Overview
          </span>
          <h2 className="mt-4 max-w-3xl text-4xl leading-tight text-foreground sm:text-5xl">
            Build the dashboard around real workflow, not demo fluff.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            This frontend scaffold matches the take-home architecture: Next.js on the
            frontend, Python on the backend, and PostgreSQL underneath both.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              href="/patients"
            >
              Patient table
            </Link>
            <Link
              className="rounded-full border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent"
              href="/analytics"
            >
              Analytics dashboard
            </Link>
          </div>
        </div>
        <div className="rounded-[28px] border bg-card/90 p-8 shadow-[0_18px_60px_rgba(48,34,20,0.08)] backdrop-blur">
          <h3 className="text-lg text-foreground">Current state</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            The Next.js app is now scaffolded and wired into local development. The
            next meaningful step is replacing these placeholder views with the Figma
            direction and real backend data.
          </p>
          <div className="mt-6 space-y-3">
            {[
              "Warm editorial palette and dark navigation shell",
              "Tailwind v4 theme tokens from Figma",
              "Page scaffolds for overview, patients, and analytics"
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border bg-secondary/60 px-4 py-3 text-sm text-secondary-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-[24px] border bg-card px-6 py-5 shadow-[0_14px_40px_rgba(48,34,20,0.06)]">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Frontend
          </span>
          <p className="mt-3 text-4xl font-medium text-foreground">Next.js 14</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            App Router, TypeScript, Tailwind v4, and local dev via Nix.
          </p>
        </article>
        <article className="rounded-[24px] border bg-card px-6 py-5 shadow-[0_14px_40px_rgba(48,34,20,0.06)]">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Backend
          </span>
          <p className="mt-3 text-4xl font-medium text-foreground">FastAPI</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Current API surface is still scaffolded and ready for real queries.
          </p>
        </article>
        <article className="rounded-[24px] border bg-card px-6 py-5 shadow-[0_14px_40px_rgba(48,34,20,0.06)]">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Deploy
          </span>
          <p className="mt-3 text-4xl font-medium text-foreground">Railway</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Separate frontend, backend, and Postgres services.
          </p>
        </article>
      </section>
    </div>
  );
}
