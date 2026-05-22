import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
      <span style={{ fontFamily: "monospace", color: "#00d4aa", fontSize: "0.83rem" }}>&lt; {children} /&gt;</span>
      <div style={{ flex: 1, height: 1, background: "rgba(0,212,170,0.12)", maxWidth: 180 }} />
    </div>
  );
}

const skillGroups = [
  {
    title: "Languages", icon: "<>", iconClass: "teal",
    items: ["JavaScript (ES6+)", "C++ (DSA)", "HTML5", "CSS3"],
  },
  {
    title: "Frontend", icon: "<>", iconClass: "purple",
    items: ["React.js", "EJS", "Responsive UI", "Tailwind CSS"],
  },
  {
    title: "Backend", icon: "≡", iconClass: "green",
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Database", icon: "DB", iconClass: "orange",
    items: ["MongoDB", "CRUD Operations"],
  },
  {
    title: "Auth", icon: "🛡", iconClass: "red",
    items: ["JWT", "Passport.js"],
  },
  {
    title: "Tools", icon: "🔧", iconClass: "gray",
    items: ["Git", "GitHub", "Postman", "VS Code", "Vercel"],
  },
];

const iconColors = {
  teal: { bg: "rgba(0,212,170,0.12)", border: "rgba(0,212,170,0.25)", color: "#00d4aa" },
  purple: { bg: "rgba(140,100,255,0.12)", border: "rgba(140,100,255,0.25)", color: "#a78bfa" },
  green: { bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.25)", color: "#34d399" },
  orange: { bg: "rgba(251,146,60,0.12)", border: "rgba(251,146,60,0.25)", color: "#fb923c" },
  red: { bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.25)", color: "#f87171" },
  gray: { bg: "rgba(148,163,184,0.1)", border: "rgba(148,163,184,0.2)", color: "#94a3b8" },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} style={{ padding: "80px 5vw", background: "rgba(10,22,40,0.5)" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
        <SectionLabel>skills</SectionLabel>
        <h2 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "#e2e8f0", marginBottom: 8 }}>Technical Stack</h2>
        <p style={{ color: "#8892a4", fontSize: "0.9rem", marginBottom: 36, maxWidth: 460 }}>
          Languages, frameworks, and tools I work with to ship production-quality code.
        </p>

        <div className="skills-grid">
          {skillGroups.map((g, i) => (
            <SkillCard key={g.title} group={g} index={i} inView={inView} />
          ))}
        </div>
      </motion.div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 500px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

function SkillCard({ group, index, inView }) {
  const c = iconColors[group.iconClass];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      style={{
        background: "#0a1628", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12, padding: "24px",
        transition: "transform 0.2s, border-color 0.2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "rgba(0,212,170,0.2)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          background: c.bg, border: `1px solid ${c.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: c.color, fontWeight: 700, fontSize: 13, fontFamily: "monospace",
        }}>{group.icon}</div>
        <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#e2e8f0" }}>{group.title}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {group.items.map(item => (
          <span key={item} style={{
            padding: "4px 12px", borderRadius: 6,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            fontSize: "0.75rem", color: "#8892a4",
          }}>{item}</span>
        ))}
      </div>
    </motion.div>
  );
}