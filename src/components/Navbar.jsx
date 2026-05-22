import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const fn = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          background: "rgba(6,13,27,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          height: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 5vw",
          transition: "all 0.3s",
        }}
      >
        {/* Logo */}
        <a href="#home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: "rgba(0,212,170,0.1)",
            border: "1px solid rgba(0,212,170,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#00d4aa", fontFamily: "monospace", fontWeight: 700, fontSize: 13,
          }}>&lt;/&gt;</div>
          <span style={{ fontWeight: 700, fontSize: "1rem", color: "#e2e8f0" }}>
            Harshit<span style={{ color: "#00d4aa" }}>.</span>
          </span>
        </a>

        {/* Desktop Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6 }} className="desktop-nav">
          {links.map(l => {
            const isActive = active === l.label.toLowerCase();
            return (
              <a key={l.label} href={l.href}
                style={{
                  fontSize: "0.83rem", fontWeight: 500,
                  color: isActive ? "#e2e8f0" : "#8892a4",
                  padding: "6px 18px", borderRadius: 20,
                  background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                  transition: "color 0.2s, background 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = "#e2e8f0"; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = "#8892a4"; } }}
              >{l.label}</a>
            );
          })}
          <a href="/download/Harshit_Tiwari_Resume_May.pdf" download style={{
            marginLeft: 16,
            background: "#00d4aa", color: "#060d1b",
            padding: "8px 22px", borderRadius: 8,
            fontWeight: 700, fontSize: "0.82rem",
            transition: "opacity 0.2s",
            textDecoration: "none",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            Resume
          </a>
        </nav>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="hamburger"
          style={{
            display: "none",
            background: "none", border: "none", cursor: "pointer",
            padding: 8, color: "#e2e8f0",
            flexDirection: "column", gap: 5, alignItems: "flex-end",
          }}
          aria-label="Toggle menu"
        >
          <span style={{
            display: "block", height: 2, borderRadius: 2,
            background: menuOpen ? "#00d4aa" : "#e2e8f0",
            width: menuOpen ? 22 : 22,
            transition: "all 0.3s",
            transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
          }} />
          <span style={{
            display: "block", height: 2, borderRadius: 2,
            background: "#e2e8f0", width: 16,
            transition: "all 0.3s",
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: "block", height: 2, borderRadius: 2,
            background: menuOpen ? "#00d4aa" : "#e2e8f0",
            width: menuOpen ? 22 : 20,
            transition: "all 0.3s",
            transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
          }} />
        </button>
      </motion.header>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed", top: 64, left: 0, right: 0,
              zIndex: 999,
              background: "rgba(6,13,27,0.98)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "20px 5vw 24px",
              display: "flex", flexDirection: "column", gap: 4,
            }}
          >
            {links.map(l => (
              <a key={l.label} href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: "1rem", fontWeight: 500,
                  color: active === l.label.toLowerCase() ? "#00d4aa" : "#e2e8f0",
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >{l.label}</a>
            ))}
            <a href="/download/Harshit_Tiwari_Resume_May.pdf" download
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: 12,
                background: "#00d4aa", color: "#060d1b",
                padding: "12px", borderRadius: 8,
                fontWeight: 700, fontSize: "0.88rem",
                textAlign: "center", textDecoration: "none",
              }}>
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}