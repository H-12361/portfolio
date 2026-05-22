import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "../data";
import { SectionLabel } from "./About";

function ProjectCard({ project, index, inView }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#0a1628",
        border: `1px solid ${hov ? "rgba(0,212,170,0.25)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 16, overflow: "hidden",
        transition: "transform 0.2s, border-color 0.2s",
        transform: hov ? "translateY(-4px)" : "none",
      }}
    >
      {/* Image area */}
      <div style={{
        width: "100%", aspectRatio: "16/9",
        background: project.imgBg || "linear-gradient(135deg, #0d1e38, #0a1628)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
        <div style={{ textAlign: "center", color: project.badgeColor, fontSize: "2rem" }}>{project.icon}</div>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 60%, rgba(10,22,40,0.8))",
        }} />
      </div>

      <div style={{ padding: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#e2e8f0" }}>{project.title}</h3>
          {project.badge && (
            <span style={{
              fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em",
              background: project.badgeColor + "14",
              border: `1px solid ${project.badgeColor}30`,
              color: project.badgeColor,
              padding: "2px 8px", borderRadius: 4, textTransform: "uppercase",
            }}>{project.badge}</span>
          )}
        </div>
        <p style={{ fontSize: "0.82rem", color: "#8892a4", lineHeight: 1.75, marginBottom: 16 }}>{project.desc}</p>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {project.tech.map(t => (
            <span key={t} style={{
              padding: "4px 10px", borderRadius: 5, fontSize: "0.7rem", fontWeight: 600,
              background: "rgba(0,212,170,0.08)", color: "#00d4aa",
              border: "1px solid rgba(0,212,170,0.2)",
            }}>{t}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 10 }}>
          {project.live && project.live !== "#" && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              style={{
                padding: "7px 16px", borderRadius: 6, fontSize: "0.75rem", fontWeight: 700,
                background: "#00d4aa", color: "#060d1b",
                transition: "opacity 0.2s",
                display: "inline-flex", alignItems: "center", gap: 5,
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Live ↗
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{
                padding: "7px 16px", borderRadius: 6, fontSize: "0.75rem", fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.1)", color: "#8892a4",
                display: "inline-flex", alignItems: "center", gap: 5,
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#00d4aa"; e.currentTarget.style.borderColor = "rgba(0,212,170,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#8892a4"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
              GitHub →
            </a>
          )}
          {!project.live && !project.github && (
            <span style={{ padding: "7px 16px", borderRadius: 6, fontSize: "0.75rem", color: "#4a5568", border: "1px solid rgba(255,255,255,0.05)" }}>Private</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} style={{ padding: "80px 5vw" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
        <SectionLabel>projects</SectionLabel>
        <h2 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "#e2e8f0", marginBottom: 8 }}>What I've Built</h2>
        <p style={{ color: "#8892a4", fontSize: "0.9rem", marginBottom: 36 }}>A mix of production work and personal projects.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} inView={inView} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
