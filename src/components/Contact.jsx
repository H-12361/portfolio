import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { personalInfo } from "../data";
import { SectionLabel } from "./About";

// const API_BASE = "/api/v1";
const API_BASE = import.meta.env.VITE_API_BASE_URL + "/api/v1";
// ─── Confirmation Screen ───
function ConfirmationCard({ name, message, onClose }) {
  const steps = [
    "Your message is safely stored in our system.",
    "Harshit will personally review your inquiry.",
    "You'll receive a reply within 24 hours.",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "#0d1e38",
        border: "1px solid rgba(0,212,170,0.25)",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #060d1b 0%, #0a1628 100%)",
        borderBottom: "2px solid #00d4aa",
        padding: "32px 28px",
        textAlign: "center",
        position: "relative",
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8, width: 32, height: 32,
            color: "#8892a4", cursor: "pointer", fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,212,170,0.1)"; e.currentTarget.style.color = "#00d4aa"; e.currentTarget.style.borderColor = "rgba(0,212,170,0.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#8892a4"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
        >✕</button>

        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          style={{
            width: 60, height: 60, borderRadius: "50%",
            background: "rgba(0,212,170,0.12)",
            border: "2px solid rgba(0,212,170,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "1.6rem",
          }}
        >✓</motion.div>

        <div style={{
          display: "inline-block",
          background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.35)",
          borderRadius: 8, padding: "4px 14px", marginBottom: 14,
        }}>
          <span style={{ fontFamily: "monospace", color: "#00d4aa", fontWeight: 700, fontSize: 13 }}>&lt;/&gt; Harshit Tiwari</span>
        </div>

        <h2 style={{ margin: "0 0 8px", color: "#ffffff", fontSize: "clamp(20px,4vw,26px)", fontWeight: 800 }}>
          Message Received!
        </h2>
        <p style={{ margin: 0, color: "#00d4aa", fontSize: "0.85rem", letterSpacing: "0.5px" }}>
          Thank you for reaching out ✨
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: "28px" }}>
        <p style={{ fontSize: "0.95rem", margin: "0 0 20px", color: "#ccd6f6" }}>
          Hi <strong style={{ color: "#00d4aa" }}>{name}</strong>,
        </p>
        <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "#8892a4", margin: "0 0 24px" }}>
          Your submission has been successfully recorded. Our team will contact you within{" "}
          <strong style={{ color: "#e2e8f0" }}>24 hours</strong>.
        </p>

        {/* Message preview */}
        <div style={{
          background: "rgba(0,212,170,0.05)",
          border: "1px solid rgba(0,212,170,0.2)",
          borderRadius: 10, padding: "16px 20px", marginBottom: 24,
        }}>
          <p style={{ margin: "0 0 8px", fontSize: "11px", color: "#00d4aa", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>
            Your Message
          </p>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#8892a4", lineHeight: 1.7, fontStyle: "italic" }}>
            "{message.length > 120 ? message.slice(0, 120) + "…" : message}"
          </p>
        </div>

        {/* What's next */}
        <p style={{ margin: "0 0 12px", fontSize: "11px", color: "#00d4aa", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>
          What happens next?
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                padding: "12px 14px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 8,
              }}
            >
              <span style={{
                minWidth: 24, height: 24, borderRadius: "50%",
                background: "rgba(0,212,170,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "12px", color: "#00d4aa", fontWeight: 700, flexShrink: 0,
              }}>{i + 1}</span>
              <span style={{ color: "#8892a4", fontSize: "0.85rem", lineHeight: 1.5 }}>{step}</span>
            </motion.div>
          ))}
        </div>

        {/* Back to portfolio button */}
        <button
          onClick={onClose}
          style={{
            width: "100%",
            background: "#00d4aa", color: "#060d1b",
            border: "none", borderRadius: 8,
            padding: "13px", fontWeight: 700, fontSize: "0.9rem",
            cursor: "pointer", transition: "opacity 0.2s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          ← Back to Portfolio
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Contact ───
export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState("");

  const handleChange = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async () => {
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all fields before sending.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const [mailRes] = await Promise.allSettled([
        fetch(`${API_BASE}/mail/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }),
        fetch(`${API_BASE}/contacts/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }),
      ]);

      if (mailRes.status === "fulfilled" && mailRes.value.ok) {
        setSubmittedData({ name: form.name, message: form.message });
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setError("Could not send. Please email me directly.");
      }
    } catch {
      setError("Server error. Please try again or email directly.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (key) => ({
    width: "100%", boxSizing: "border-box",
    background: "#0c1220",
    border: `1px solid ${focused === key ? "rgba(100,255,218,0.4)" : "rgba(255,255,255,0.07)"}`,
    borderRadius: 8, padding: "13px 16px",
    color: "#ccd6f6", fontSize: "0.9rem",
    outline: "none", transition: "border-color 0.25s",
  });

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

        <div className="contact-layout">
          {/* Left — Info cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
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
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = color + "50"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#8892b0"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
                >{label} ↗</a>
              ))}
            </div>
          </div>

          {/* Right — Form OR Confirmation */}
          <AnimatePresence mode="wait">
            {submitted ? (
              <ConfirmationCard
                key="confirmation"
                name={submittedData.name}
                message={submittedData.message}
                onClose={() => setSubmitted(false)}
              />
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16, padding: "2rem",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div className="form-row">
                    {[
                      { key: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
                      { key: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                    ].map(({ key, label, type, placeholder }) => (
                      <div key={key}>
                        <label style={{ color: "#495670", fontSize: "0.75rem", display: "block", marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                          {label}
                        </label>
                        <input
                          type={type} placeholder={placeholder}
                          value={form[key]} onChange={handleChange(key)}
                          onFocus={() => setFocused(key)} onBlur={() => setFocused("")}
                          style={inputStyle(key)}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label style={{ color: "#495670", fontSize: "0.75rem", display: "block", marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                      Message
                    </label>
                    <textarea
                      placeholder="Tell me about your project or opportunity..."
                      value={form.message} onChange={handleChange("message")}
                      onFocus={() => setFocused("message")} onBlur={() => setFocused("")}
                      rows={5} style={{ ...inputStyle("message"), resize: "vertical" }}
                    />
                  </div>

                  {/* Inline error */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{
                          display: "flex", alignItems: "center", gap: 10,
                          background: "rgba(255,80,80,0.08)",
                          border: "1px solid rgba(255,80,80,0.25)",
                          borderRadius: 8, padding: "10px 14px",
                          color: "#ff5050", fontSize: "0.82rem",
                        }}
                      >
                        <span>✕</span> {error}
                        <button onClick={() => setError("")} style={{ marginLeft: "auto", background: "none", border: "none", color: "#ff5050", cursor: "pointer", fontSize: 14 }}>✕</button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                      background: loading ? "rgba(100,255,218,0.1)" : "#64ffda",
                      color: loading ? "#64ffda" : "#060b14",
                      border: "1px solid rgba(100,255,218,0.4)",
                      borderRadius: 8, padding: "14px",
                      fontWeight: 700, fontSize: "0.92rem",
                      cursor: loading ? "not-allowed" : "pointer",
                      transition: "all 0.25s", width: "100%",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.88"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                  >
                    {loading ? (
                      <>
                        <div style={{ width: 16, height: 16, border: "2px solid #64ffda", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                        Sending...
                      </>
                    ) : "Send Message →"}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 36px;
          align-items: start;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 860px) {
          .contact-layout { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}