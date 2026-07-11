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
    <nav className="nav" aria-label="Primary">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          data-active={pathname === item.href ? "true" : "false"}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
