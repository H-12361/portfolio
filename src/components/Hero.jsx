import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../data";

const roles = ["MERN Stack Developer", "React.js Developer", "Node.js Developer", "Full Stack Developer"];

function TypeWriter({ words }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [display, setDisplay] = useState("");
  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => { setDisplay(current.slice(0, charIdx)); setCharIdx(c => c + 1); }, 65);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => { setDisplay(current.slice(0, charIdx)); setCharIdx(c => c - 1); }, 35);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words]);
  return (
    <span style={{ color: "#00d4aa" }}>
      {display}
      <span style={{ animation: "blink 1s step-end infinite", borderRight: "2px solid #00d4aa", marginLeft: 2 }}>&nbsp;</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      {/* bg glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 700px 500px at 80% 40%, rgba(0,212,170,0.04), transparent)", pointerEvents: "none" }} />

      {/* LEFT */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.25)",
          color: "#00d4aa", padding: "6px 16px", borderRadius: 20,
          fontSize: "0.8rem", fontWeight: 500, marginBottom: 24,
        }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00d4aa" }} />
          Available for opportunities
        </div>

        <p style={{ color: "#8892a4", fontSize: "0.85rem", marginBottom: 4 }}>Hi, I'm</p>

        <h1 style={{
          fontSize: "clamp(40px,6vw,72px)", fontWeight: 800, lineHeight: 1.0,
          marginBottom: 4, color: "#e2e8f0",
        }}>
          <span style={{ color: "#00d4aa" }}>Harshit</span>
        </h1>

        <h2 style={{
          fontSize: "clamp(18px,3.5vw,36px)", fontWeight: 600,
          color: "#4a5568", lineHeight: 1.2, marginBottom: 20,
          minHeight: "1.4em",
        }}>
          <TypeWriter words={roles} />
        </h2>

        <p style={{ color: "#8892a4", fontSize: "0.9rem", lineHeight: 1.8, maxWidth: 500, marginBottom: 12 }}>
          MCA student building responsive &amp; scalable full-stack apps
          with React.js, Node.js, Express.js, and MongoDB.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#8892a4", fontSize: "0.82rem", marginBottom: 28 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Indore, Madhya Pradesh
        </div>

        <div style={{ display: "flex", gap: 14, marginBottom: 36, flexWrap: "wrap" }}>
          <a href="#projects" style={{
            background: "#00d4aa", color: "#060d1b",
            padding: "12px 28px", borderRadius: 8, fontWeight: 700, fontSize: "0.85rem",
            display: "inline-flex", alignItems: "center", gap: 8,
            transition: "opacity 0.2s, transform 0.2s",
            textDecoration: "none",
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = ""; }}>
            View My Work →
          </a>
          <a href="/download/Harshit_Tiwari_Resume_May.pdf" download style={{
            background: "rgba(255,255,255,0.06)", color: "#e2e8f0",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "12px 28px", borderRadius: 8, fontWeight: 600, fontSize: "0.85rem",
            display: "inline-flex", alignItems: "center", gap: 8,
            transition: "background 0.2s, transform 0.2s",
            textDecoration: "none",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = ""; }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download CV
          </a>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {[
            { label: "GH", href: personalInfo.github, title: "GitHub" },
            { label: "in", href: personalInfo.linkedin, title: "LinkedIn" },
          ].map(({ label, href, title }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={title}
              style={{
                width: 38, height: 38, borderRadius: 8,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#8892a4", fontWeight: 700, fontSize: "13px",
                transition: "border-color 0.2s, color 0.2s, background 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,170,0.4)"; e.currentTarget.style.color = "#00d4aa"; e.currentTarget.style.background = "rgba(0,212,170,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#8892a4"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}>
              {label}
            </a>
          ))}
        </div>
      </motion.div>

      {/* RIGHT — Card */}
      <motion.div
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        className="hero-card-wrapper"
      >
        {/* 3+ Projects badge */}
        <div style={{
          position: "absolute", top: -12, left: -20, zIndex: 2,
          background: "rgba(10,22,40,0.95)", border: "1px solid rgba(0,212,170,0.3)",
          borderRadius: 8, padding: "6px 14px",
          fontSize: "0.7rem", color: "#00d4aa", fontFamily: "monospace", fontWeight: 600,
        }}>3+ Projects</div>

        <div style={{
          width: "min(310px, 80vw)", aspectRatio: "0.75",
          background: "linear-gradient(145deg, #0d1e38, #0a1628)",
          border: "1px solid rgba(0,212,170,0.2)", borderRadius: 16,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end",
          padding: 28, position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(0,212,170,0.06), transparent 60%)" }} />

          {/* Circuit SVG */}
          <svg style={{ position: "absolute", top: 40, left: "50%", transform: "translateX(-50%)", width: "60%" }} viewBox="0 0 200 220" fill="none">
            <circle cx="100" cy="85" r="55" stroke="rgba(0,212,170,0.25)" strokeWidth="1.5"/>
            <path d="M65 110 Q60 135 70 155 Q85 175 100 178 Q115 175 130 155 Q140 135 135 110 Q125 90 100 88 Q75 90 65 110Z" stroke="rgba(0,212,170,0.6)" strokeWidth="1.5" fill="rgba(0,212,170,0.03)"/>
            <line x1="100" y1="88" x2="100" y2="52" stroke="rgba(0,212,170,0.4)" strokeWidth="1"/>
            <line x1="100" y1="52" x2="132" y2="52" stroke="rgba(0,212,170,0.4)" strokeWidth="1"/>
            <circle cx="132" cy="52" r="3" fill="#00d4aa" opacity="0.8"/>
            <line x1="100" y1="68" x2="142" y2="43" stroke="rgba(0,212,170,0.3)" strokeWidth="1"/>
            <circle cx="142" cy="43" r="2.5" fill="#00d4aa" opacity="0.6"/>
            <line x1="100" y1="78" x2="146" y2="58" stroke="rgba(0,212,170,0.3)" strokeWidth="1"/>
            <circle cx="146" cy="58" r="2.5" fill="#00d4aa" opacity="0.6"/>
            <line x1="100" y1="90" x2="150" y2="80" stroke="rgba(0,212,170,0.25)" strokeWidth="1"/>
            <circle cx="150" cy="80" r="2" fill="#00d4aa" opacity="0.5"/>
            <path d="M65 178 Q55 185 50 200" stroke="rgba(0,212,170,0.4)" strokeWidth="1.5" fill="none"/>
            <path d="M135 178 Q145 185 150 200" stroke="rgba(0,212,170,0.4)" strokeWidth="1.5" fill="none"/>
            <path d="M50 200 Q75 196 100 196 Q125 196 150 200" stroke="rgba(0,212,170,0.4)" strokeWidth="1.5" fill="none"/>
          </svg>

          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "0.1em", color: "#e2e8f0", marginBottom: 4 }}>HARSHIT TIWARI</div>
            <div style={{ fontSize: "0.68rem", color: "#00d4aa", letterSpacing: "0.12em", fontWeight: 500 }}>/ SOFTWARE DEVELOPER</div>
          </div>
        </div>

        {/* MERN badge */}
        <div style={{
          position: "absolute", right: -16, top: "50%", transform: "translateY(-50%)",
          background: "rgba(10,22,40,0.95)", border: "1px solid rgba(0,212,170,0.3)",
          borderRadius: 6, padding: "5px 12px",
          fontSize: "0.7rem", color: "#00d4aa", fontFamily: "monospace", fontWeight: 600,
        }}>MERN ⚡</div>

        {/* Full Stack badge */}
        <div style={{
          position: "absolute", bottom: -10, right: 0,
          background: "rgba(10,22,40,0.95)", border: "1px solid rgba(0,212,170,0.3)",
          borderRadius: 6, padding: "5px 12px",
          fontSize: "0.7rem", color: "#00d4aa", fontFamily: "monospace", fontWeight: 600,
        }}>&lt; Full Stack /&gt;</div>
      </motion.div>

      {/* Scroll down */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{
          position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          color: "#4a5568", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase",
        }}>
        <span>Scroll down</span>
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ fontSize: "1.1rem" }}>↓</motion.span>
      </motion.div>

      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}

        .hero-section {
          min-height: calc(100vh - 64px);
          display: grid;
          grid-template-columns: 1fr 420px;
          align-items: center;
          padding: 60px 5vw;
          gap: 40px;
          position: relative;
          overflow: hidden;
        }

        .hero-card-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        @media (max-width: 900px) {
          .hero-section {
            grid-template-columns: 1fr;
            padding: 40px 5vw 60px;
            text-align: center;
            justify-items: center;
          }
          .hero-card-wrapper {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 30px 5vw 50px;
          }
        }
      `}</style>
    </section>
  );
}