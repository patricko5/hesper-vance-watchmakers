"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type NavItem = {
  id: string;
  label: string;
};

export function ScrollSpyNav({ items }: { items: NavItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    // Use a tighter root margin so the active item updates accurately when scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px"
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="sticky top-20 z-30 backdrop-blur-md pt-4 pb-2">
      <div className="site-shell flex gap-6 overflow-x-auto">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link shrink-0 ${isActive ? "nav-link-active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
