import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience, education } from "../data";
import { SectionLabel } from "./About";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} style={{ padding: "100px 5vw", background: "rgba(255,255,255,0.012)" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <SectionLabel>experience</SectionLabel>
        <h2 style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: "clamp(2rem,5vw,3.5rem)",
          fontWeight: 800, color: "#ccd6f6",
          letterSpacing: "-0.03em", marginBottom: "3rem",
        }}>
          Where I've Worked
        </h2>

        {/* Timeline */}
        <div style={{ position: "relative", maxWidth: 780 }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute", left: 23, top: 8, bottom: 8,
            width: 1,
            background: "linear-gradient(to bottom, #64ffda, rgba(100,255,218,0.1))",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {experience.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.18, duration: 0.6 }}
                style={{ display: "flex", gap: 28 }}
              >
                {/* Dot */}
                <div style={{ flexShrink: 0, position: "relative", zIndex: 1 }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: "50%",
                    background: "var(--bg-card)",
                    border: `2px solid ${exp.color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginTop: 2,
                  }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: exp.color }} />
                  </div>
                </div>

                {/* Card */}
                <div style={{
                  flex: 1,
                  background: "var(--bg-card)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 14,
                  padding: "1.75rem 2rem",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: exp.color, opacity: 0.5 }} />

                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: "0.5rem" }}>
                    <div>
                      <h3 style={{ fontFamily: "'Times New Roman', Times, serif", color: "#ccd6f6", fontWeight: 700, fontSize: "1.1rem" }}>{exp.role}</h3>
                      <p style={{ color: exp.color, fontWeight: 600, fontSize: "0.88rem", marginTop: 3 }}>
                        {exp.company}{exp.location ? ` · ${exp.location}` : ""}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                      <span style={{
                        color: "#495670", fontSize: "0.76rem",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        padding: "4px 12px", borderRadius: 4,
                        whiteSpace: "nowrap", fontFamily: "monospace",
                      }}>
                        {exp.period}
                      </span>
                      <span style={{
                        color: exp.color, fontSize: "0.68rem", fontWeight: 700,
                        background: exp.color + "12",
                        border: `1px solid ${exp.color}25`,
                        padding: "3px 8px", borderRadius: 4,
                        letterSpacing: "0.06em", textTransform: "uppercase",
                      }}>
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <ul style={{ paddingLeft: "1.2rem", marginTop: "1rem" }}>
                    {exp.points.map((pt, j) => (
                      <li key={j} style={{
                        color: "#8892b0",
                        fontSize: "0.88rem",
                        lineHeight: 1.75,
                        marginBottom: 8,
                        paddingLeft: 4,
                      }}>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div style={{ marginTop: 72 }}>
          <SectionLabel>education</SectionLabel>
          <h2 style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(1.8rem,4vw,2.8rem)",
            fontWeight: 800, color: "#ccd6f6",
            letterSpacing: "-0.03em", marginBottom: "2rem",
          }}>
            Academic Background
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, maxWidth: 780 }}>
            {education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  padding: "1.5rem",
                  display: "flex", gap: 16, alignItems: "flex-start",
                  position: "relative", overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: edu.color, opacity: 0.5 }} />
                <div style={{
                  width: 52, height: 52, borderRadius: 10,
                  background: edu.color + "14",
                  border: `1px solid ${edu.color}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{ fontFamily: "'Times New Roman', Times, serif", color: edu.color, fontWeight: 800, fontSize: "0.82rem" }}>{edu.short}</span>
                </div>
                <div>
                  <h3 style={{ color: "#ccd6f6", fontWeight: 600, fontSize: "0.95rem", marginBottom: 4, fontFamily: "'Times New Roman', Times, serif" }}>{edu.degree}</h3>
                  <p style={{ color: "#8892b0", fontSize: "0.82rem", marginBottom: 4 }}>{edu.school}</p>
                  <p style={{ color: "#495670", fontSize: "0.76rem" }}>{edu.period} · <span style={{ color: edu.color }}>{edu.note}</span></p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
