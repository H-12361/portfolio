import { personalInfo } from "../data";

const navLinks = ["Home", "About", "Projects", "Contact"];

export default function Footer() {
  return (
    <footer style={{
      background: "#0a1628",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "48px 5vw 24px",
    }}>
      <div className="footer-grid">
        {/* Col 1 — Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#00d4aa", fontFamily: "monospace", fontWeight: 700, fontSize: 12,
            }}>&lt;/&gt;</div>
            <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#e2e8f0" }}>Harshit Tiwari</span>
          </div>
          <p style={{ color: "#8892a4", fontSize: "0.82rem", lineHeight: 1.7, maxWidth: 220 }}>
            MERN Stack Developer crafting responsive &amp; scalable web applications.
          </p>
        </div>

        {/* Col 2 — Quick Links */}
        <div>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e2e8f0", marginBottom: 16 }}>
            QUICK LINKS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {navLinks.map((l, i) => (
              <a key={l} href={`#${l.toLowerCase()}`}
                style={{
                  fontSize: "0.83rem",
                  color: i === navLinks.length - 1 ? "#00d4aa" : "#8892a4",
                  transition: "color 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#00d4aa"}
                onMouseLeave={e => e.currentTarget.style.color = i === navLinks.length - 1 ? "#00d4aa" : "#8892a4"}
              >{l}</a>
            ))}
          </div>
        </div>

        {/* Col 3 — Get in Touch */}
        <div>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e2e8f0", marginBottom: 16 }}>
            GET IN TOUCH
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: "0.82rem", color: "#8892a4" }}>
            <span>✉</span>
            <span>{personalInfo.email}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, fontSize: "0.82rem", color: "#8892a4" }}>
            <span>📞</span>
            <span>{personalInfo.phone}</span>
          </div>
          {/* Social buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { label: "GH", href: personalInfo.github, title: "GitHub" },
              { label: "in", href: personalInfo.linkedin, title: "LinkedIn" },
            ].map(({ label, href, title }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={title}
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#8892a4", fontWeight: 700, fontSize: "13px",
                  transition: "border-color 0.2s, color 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,170,0.4)"; e.currentTarget.style.color = "#00d4aa"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#8892a4"; }}
              >{label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        paddingTop: 20, textAlign: "center",
        color: "#2d3748", fontSize: "0.75rem",
      }}>
        © {new Date().getFullYear()} Harshit Tiwari. Built with React.js
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
      `}</style>
    </footer>
  );
}