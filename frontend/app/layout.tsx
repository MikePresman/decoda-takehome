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
      <body>
        <div className="app-shell">
          <aside className="sidebar">
            <div className="brand">
              <span className="brand-mark">Beauty Med Spa</span>
              <h1>Patient intelligence for front desk and leadership.</h1>
              <p>
                A calm, operational dashboard for patient management, service demand,
                and revenue visibility.
              </p>
            </div>
            <SidebarNav />
          </aside>
          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  );
}
