"use client";

import { useState, useEffect } from "react";


interface Section {
  id: string;
  title: string;
}

interface LegalSidebarProps {
  sections: Section[];
}

export function LegalSidebar({ sections }: LegalSidebarProps) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: "smooth",
      });
    }
  };

  return (
    <aside className="hidden lg:block sticky top-32 h-fit w-64 shrink-0">
      <nav className="space-y-1">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 px-4">
          On this page
        </p>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
              activeSection === section.id
                ? "bg-blue-500/10 text-blue-400 border-l-2 border-blue-500"
                : "text-slate-500 hover:text-slate-300 hover:bg-white/5 border-l-2 border-transparent"
            }`}
          >
            {section.title}
          </button>
        ))}
      </nav>
    </aside>
  );
}
