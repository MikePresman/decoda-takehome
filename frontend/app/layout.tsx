import type { Metadata } from "next";

import { SidebarNav } from "@/components/sidebar-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beauty Med Spa Dashboard",
  description: "Patient operations and analytics dashboard"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.4),transparent_35%),linear-gradient(180deg,#f7efe4_0%,#f4ede2_100%)]">
        <div className="grid min-h-screen lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="border-sidebar-border bg-sidebar text-sidebar-foreground lg:border-r">
            <div className="flex h-full flex-col px-6 py-8">
              <div className="mb-10">
                <span className="inline-flex rounded-full bg-sidebar-accent px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-sidebar-primary">
                  Beauty Med Spa
                </span>
                <h1 className="mt-4 text-[28px] leading-tight text-sidebar-foreground">
                  Patient intelligence for front desk and leadership.
                </h1>
                <p className="mt-3 text-sm leading-6 text-sidebar-foreground/70">
                  A calm, operational dashboard for patient management, service
                  demand, and revenue visibility.
                </p>
              </div>
              <SidebarNav />
              <div className="mt-auto rounded-2xl border border-sidebar-border bg-sidebar-accent p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-sidebar-primary">
                  Environment
                </p>
                <p className="mt-3 text-sm leading-6 text-sidebar-foreground/72">
                  Next.js frontend, Python backend, PostgreSQL, and Railway deployment.
                </p>
              </div>
            </div>
          </aside>
          <main className="px-5 py-5 sm:px-8 sm:py-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
