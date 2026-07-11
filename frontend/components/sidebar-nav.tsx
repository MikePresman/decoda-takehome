"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/patients", label: "Patients" },
  { href: "/analytics", label: "Analytics" }
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2" aria-label="Primary">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={[
            "rounded-xl px-4 py-3 text-sm transition-colors duration-150",
            pathname === item.href
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground/72 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground"
          ].join(" ")}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
