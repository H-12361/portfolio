import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "../data";
import { SectionLabel } from "./About";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const contacts = [
    { icon: "📧", label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: "📞", label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: "📍", label: "Location", value: personalInfo.location, href: null },
  ];

  return (
    <section id="contact" ref={ref} style={{ padding: "100px 5vw 120px" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <SectionLabel>contact</SectionLabel>
        <h2 style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: "clamp(2rem,5vw,3.5rem)",
          fontWeight: 800, color: "#ccd6f6",
          letterSpacing: "-0.03em", marginBottom: "0.75rem",
        }}>
          Let's Work Together
        </h2>
        <p style={{ color: "#8892b0", marginBottom: "3rem", fontSize: "1rem", maxWidth: 480 }}>
          Open to freelance projects, full-time opportunities, and interesting collaborations.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 480 }}>
          {contacts.map(({ icon, label, value, href }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10, padding: "1.1rem 1.4rem",
                display: "flex", gap: 14, alignItems: "center",
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 9,
                background: "rgba(100,255,218,0.08)",
                border: "1px solid rgba(100,255,218,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.1rem", flexShrink: 0,
              }}>{icon}</div>
              <div style={{ minWidth: 0 }}>
                <p style={{ color: "#495670", fontSize: "0.72rem", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 3 }}>{label}</p>
                {href ? (
                  <a href={href} style={{ color: "#ccd6f6", fontSize: "0.88rem", fontWeight: 500, transition: "color 0.2s", wordBreak: "break-all" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#64ffda"}
                    onMouseLeave={e => e.currentTarget.style.color = "#ccd6f6"}
                  >{value}</a>
                ) : (
                  <p style={{ color: "#ccd6f6", fontSize: "0.88rem", fontWeight: 500 }}>{value}</p>
                )}
              </div>
            </motion.div>
          ))}

          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            {[
              { label: "LinkedIn", href: personalInfo.linkedin, color: "#0a66c2" },
              { label: "GitHub", href: personalInfo.github, color: "#e2e8f0" },
            ].map(({ label, href, color }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{
                  flex: 1, textAlign: "center", padding: "11px",
                  background: "var(--bg-card)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 8, color: "#8892b0",
                  fontSize: "0.83rem", fontWeight: 600,
                  transition: "color 0.2s, border-color 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = color + "50"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#8892b0"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
              >{label} ↗</a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}