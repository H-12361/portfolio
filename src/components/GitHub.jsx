import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { personalInfo } from "../data";
import { SectionLabel } from "./About";

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ width = "100%", height = 16, radius = 4 }) {
  return (
    <div style={{
      width, height, borderRadius: radius,
      background: "rgba(255,255,255,0.07)",
      animation: "shimmer 1.4s infinite",
    }} />
  );
}

// ── Dot Tooltip Popup ─────────────────────────────────────────────────────────
function DotTooltip({ tooltip, onClose }) {
  if (!tooltip) return null;
  const { x, y, date, count, level, monthStats } = tooltip;

  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const d = new Date(date);
  const formatted = `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
  const dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][d.getDay()];

  // Month summary
  const month = d.getMonth();
  const mStats = monthStats?.[month];

  return (
    <AnimatePresence>
      <motion.div
        key={date}
        initial={{ opacity: 0, scale: 0.88, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88 }}
        transition={{ duration: 0.18 }}
        style={{
          position: "fixed",
          left: Math.min(x + 14, window.innerWidth - 220),
          top: y - 10,
          zIndex: 9999,
          background: "#161b22",
          border: "1px solid rgba(100,255,218,0.25)",
          borderRadius: 10,
          padding: "12px 16px",
          minWidth: 190,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          pointerEvents: "none",
        }}
      >
        {/* Date */}
        <p style={{ color: "#ccd6f6", fontWeight: 600, fontSize: "0.82rem", marginBottom: 6 }}>
          {dayName}, {formatted}
        </p>

        {/* Count */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{
            width: 12, height: 12, borderRadius: 2, flexShrink: 0,
            background: ["#161b22","#0f3d2e","#006d32","#26a641","#39d353"][Math.min(level,4)],
            border: level === 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
          }} />
          <span style={{ color: count > 0 ? "#64ffda" : "#495670", fontSize: "0.8rem", fontWeight: 600 }}>
            {count === 0 ? "No contributions" : `${count} contribution${count !== 1 ? "s" : ""}`}
          </span>
        </div>

        {/* Month summary divider */}
        {mStats && (
          <>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginBottom: 8 }} />
            <p style={{ color: "#495670", fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
              {monthNames[month]} summary
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <div>
                <p style={{ color: "#8892b0", fontSize: "0.7rem" }}>Total</p>
                <p style={{ color: "#64ffda", fontWeight: 700, fontSize: "0.9rem" }}>{mStats.total}</p>
              </div>
              <div>
                <p style={{ color: "#8892b0", fontSize: "0.7rem" }}>Active days</p>
                <p style={{ color: "#64ffda", fontWeight: 700, fontSize: "0.9rem" }}>{mStats.activeDays}</p>
              </div>
              <div>
                <p style={{ color: "#8892b0", fontSize: "0.7rem" }}>Best day</p>
                <p style={{ color: "#64ffda", fontWeight: 700, fontSize: "0.9rem" }}>{mStats.best}</p>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ── Contribution Graph ────────────────────────────────────────────────────────
function ContributionGraph({ inView, grid, weekDates, rawContribs, loading }) {
  const [tooltip, setTooltip] = useState(null);
  const colors = ["#161b22","#0f3d2e","#006d32","#26a641","#39d353"];

  // Build month-wise stats from rawContribs
  const monthStats = {};
  if (rawContribs) {
    rawContribs.forEach(({ date, count }) => {
      const m = new Date(date).getMonth();
      if (!monthStats[m]) monthStats[m] = { total: 0, activeDays: 0, best: 0 };
      monthStats[m].total += count;
      if (count > 0) monthStats[m].activeDays++;
      if (count > monthStats[m].best) monthStats[m].best = count;
    });
  }

  // Month labels from weekDates
  const monthLabels = [];
  if (weekDates && weekDates.length > 0) {
    let lastMonth = -1;
    weekDates.forEach((week, wi) => {
      const dateStr = week[0];
      if (dateStr) {
        const m = new Date(dateStr).getMonth();
        if (m !== lastMonth) {
          const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
          monthLabels.push({ index: wi, label: monthNames[m] });
          lastMonth = m;
        }
      }
    });
  }

  const dayLabels = ["","Mon","","Wed","","Fri",""];

  const handleMouseEnter = useCallback((e, val, wi, di, weekDates) => {
    if (!weekDates?.[wi]?.[di]) return;
    const date = weekDates[wi][di];
    const rect = e.currentTarget.getBoundingClientRect();

    // Find count from rawContribs
    const entry = rawContribs?.find(c => c.date === date);
    setTooltip({
      x: rect.right,
      y: rect.top,
      date,
      count: entry?.count ?? (val > 0 ? val : 0),
      level: val,
      monthStats,
    });
  }, [rawContribs, monthStats]);

  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  if (loading) {
    return (
      <div style={{ overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 3, marginTop: 20 }}>
          {Array.from({ length: 52 }, (_, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {Array.from({ length: 7 }, (_, di) => (
                <div key={di} style={{
                  width: 11, height: 11, borderRadius: 2,
                  background: "#161b22",
                  border: "1px solid rgba(255,255,255,0.04)",
                  animation: "shimmer 1.4s infinite",
                  animationDelay: `${(wi * 7 + di) * 0.003}s`,
                }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!grid || grid.length === 0) return null;

  return (
    <>
      <DotTooltip tooltip={tooltip} onClose={() => setTooltip(null)} />
      <div style={{ overflowX: "auto" }}>
        {/* Month labels */}
        <div style={{ display: "flex", paddingLeft: 30, marginBottom: 4, position: "relative", height: 16 }}>
          {monthLabels.map(({ index, label }) => (
            <span key={label + index} style={{
              position: "absolute",
              left: 30 + index * 14,
              color: "#495670", fontSize: 11,
            }}>{label}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 4 }}>
          {/* Day labels */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingTop: 2, marginRight: 4 }}>
            {dayLabels.map((l, i) => (
              <div key={i} style={{ height: 11, fontSize: 10, color: "#495670", lineHeight: "11px", width: 24, textAlign: "right" }}>{l}</div>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: "flex", gap: 3 }}>
            {grid.map((week, w) => (
              <div key={w} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {week.map((val, d) => (
                  <motion.div
                    key={d}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: (w * 7 + d) * 0.0012 + 0.15, duration: 0.18 }}
                    onMouseEnter={e => handleMouseEnter(e, val, w, d, weekDates)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      width: 11, height: 11, borderRadius: 2,
                      background: colors[Math.min(val, 4)],
                      border: val === 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      cursor: "crosshair",
                      transition: "transform 0.1s",
                    }}
                    whileHover={{ scale: 1.5, zIndex: 10 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, justifyContent: "flex-end" }}>
          <span style={{ color: "#495670", fontSize: 11 }}>Less</span>
          {colors.map((c, i) => (
            <div key={i} style={{
              width: 11, height: 11, borderRadius: 2, background: c,
              border: i === 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }} />
          ))}
          <span style={{ color: "#495670", fontSize: 11 }}>More</span>
        </div>
      </div>
    </>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function GitHub() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const username = personalInfo.githubUsername;
  const currentYear = new Date().getFullYear();
  const availableYears = [currentYear, currentYear - 1, currentYear - 2];

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [contribData, setContribData] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [contribLoading, setContribLoading] = useState(true);

  // ── Fetch profile + repos ───────────────────────────────────────────────────
  useEffect(() => {
    async function fetchProfile() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ]);
        if (userRes.ok) setProfile(await userRes.json());
        if (reposRes.ok) setRepos(await reposRes.json());
      } catch {}
      finally { setProfileLoading(false); }
    }
    fetchProfile();
  }, [username]);

  // ── Fetch contributions for year ────────────────────────────────────────────
  useEffect(() => {
    setContribLoading(true);
    setContribData(null);

    async function fetchContributions() {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${selectedYear}`);
        if (!res.ok) throw new Error();
        const json = await res.json();
        const contributions = json.contributions || [];
        const total = contributions.reduce((s, d) => s + d.count, 0);

        const yearContribs = contributions.filter(d => d.date.startsWith(`${selectedYear}`));

        const firstDate = new Date(yearContribs[0]?.date || `${selectedYear}-01-01`);
        const startPadded = new Date(firstDate);
        startPadded.setDate(firstDate.getDate() - firstDate.getDay());

        const lastDate = new Date(yearContribs[yearContribs.length - 1]?.date || `${selectedYear}-12-31`);
        const endPadded = new Date(lastDate);
        endPadded.setDate(lastDate.getDate() + (6 - lastDate.getDay()));

        const levelMap = {};
        yearContribs.forEach(d => { levelMap[d.date] = d.level; });

        const weeks = [];
        const weekDates = [];
        let cur = new Date(startPadded);
        while (cur <= endPadded) {
          const week = [], wdates = [];
          for (let d = 0; d < 7; d++) {
            const iso = cur.toISOString().split("T")[0];
            week.push(levelMap[iso] ?? 0);
            wdates.push(iso);
            cur.setDate(cur.getDate() + 1);
          }
          weeks.push(week);
          weekDates.push(wdates);
        }

        setContribData({ total, grid: weeks, weekDates, rawContribs: yearContribs });
      } catch {
        // Sparse fallback
        const seed = (w, d, y) => {
          const x = Math.sin(w * 7.3 + d * 3.1 + y * 1.7) * 43758.5453;
          return x - Math.floor(x);
        };
        const grid = Array.from({ length: 52 }, (_, w) =>
          Array.from({ length: 7 }, (_, d) => {
            const r = seed(w, d, selectedYear);
            if (r > 0.92) return 4;
            if (r > 0.82) return 3;
            if (r > 0.70) return 2;
            if (r > 0.58) return 1;
            return 0;
          })
        );
        setContribData({ total: null, grid, weekDates: null, rawContribs: null });
      } finally {
        setContribLoading(false);
      }
    }
    fetchContributions();
  }, [username, selectedYear]);

  // ── Derived stats ───────────────────────────────────────────────────────────
  const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
  const langCount = {};
  repos.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
  const topLangs = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([l]) => l).join(", ");
  const topRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3);

  const stats = [
    { label: "Public Repos", value: profileLoading ? null : `${profile?.public_repos ?? "—"}` },
    { label: "Followers",    value: profileLoading ? null : `${profile?.followers ?? "—"}` },
    { label: "Top Languages",value: profileLoading ? null : (topLangs || "—") },
    { label: "Total Stars",  value: profileLoading ? null : `${totalStars}` },
  ];

  return (
    <section id="github" ref={ref} style={{ padding: "100px 5vw" }}>
      <style>{`
        @keyframes shimmer { 0%,100%{opacity:.45} 50%{opacity:.9} }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <SectionLabel>open source</SectionLabel>
        <h2 style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: "clamp(2rem,5vw,3.5rem)",
          fontWeight: 800, color: "#ccd6f6",
          letterSpacing: "-0.03em", marginBottom: "0.75rem",
        }}>
          GitHub Activity
        </h2>
        <p style={{ color: "#8892b0", marginBottom: "2.5rem", fontSize: "1rem" }}>
          Consistent contributions — shipping code every week.
        </p>

        {/* ── Contribution Graph Card ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            background: "#0d1117",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14, padding: "2rem", marginBottom: 20,
          }}
        >
          {/* ── Header ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: 12 }}>

            {/* Avatar + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {profileLoading ? (
                <Skeleton width={32} height={32} radius={50} />
              ) : profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={username}
                  style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid #30363d" }} />
              ) : (
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#21262d", border: "1px solid #30363d", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>👤</div>
              )}
              <div>
                {profileLoading
                  ? <><Skeleton width={100} height={13} radius={3} /><div style={{ marginTop: 5 }}><Skeleton width={70} height={10} radius={3} /></div></>
                  : <>
                      <p style={{ color: "#ccd6f6", fontWeight: 600, fontSize: "0.9rem" }}>{profile?.name || username}</p>
                      <p style={{ color: "#495670", fontSize: "0.75rem" }}>{profile?.bio || personalInfo.title}</p>
                    </>
                }
              </div>
            </div>

            {/* Right: year buttons + View Profile + Download Resume */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>

              {/* Year selector */}
              <div style={{ display: "flex", gap: 5 }}>
                {availableYears.map(year => (
                  <button key={year} onClick={() => setSelectedYear(year)} style={{
                    padding: "5px 12px", borderRadius: 6,
                    border: selectedYear === year ? "1px solid rgba(100,255,218,0.5)" : "1px solid rgba(255,255,255,0.1)",
                    background: selectedYear === year ? "rgba(100,255,218,0.12)" : "transparent",
                    color: selectedYear === year ? "#64ffda" : "#495670",
                    fontSize: "0.78rem", fontWeight: selectedYear === year ? 600 : 400,
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { if (selectedYear !== year) e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
                  onMouseLeave={e => { if (selectedYear !== year) e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                  >{year}</button>
                ))}
              </div>

              {/* View Profile */}
              <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  color: "#64ffda", border: "1px solid rgba(100,255,218,0.25)",
                  padding: "6px 14px", borderRadius: 6,
                  fontSize: "0.8rem", fontWeight: 600, textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(100,255,218,0.07)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                GitHub ↗
              </a>


            </div>
          </div>

          {/* Contributions count */}
          {!contribLoading && contribData?.total != null && (
            <p style={{ color: "#8892b0", fontSize: "0.82rem", marginBottom: "1rem" }}>
              <span style={{ color: "#ccd6f6", fontWeight: 600 }}>{contribData.total}</span> contributions in {selectedYear}
            </p>
          )}

          {/* Graph */}
          <ContributionGraph
            inView={inView}
            grid={contribData?.grid || null}
            weekDates={contribData?.weekDates || null}
            rawContribs={contribData?.rawContribs || null}
            loading={contribLoading}
          />
        </motion.div>

        {/* ── Stats ───────────────────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 20 }}>
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
              style={{ background: "var(--bg-card)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: "1.25rem" }}
            >
              <p style={{ color: "#495670", fontSize: "0.73rem", marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>{s.label}</p>
              {s.value === null
                ? <Skeleton width="55%" height={18} radius={3} />
                : <p style={{ color: "#64ffda", fontWeight: 700, fontSize: "1.05rem" }}>{s.value}</p>
              }
            </motion.div>
          ))}
        </div>

        {/* ── Top Repos ────────────────────────────────────────────────────── */}
        {!profileLoading && topRepos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <p style={{ color: "#495670", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
              Top Repositories
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
              {topRepos.map(repo => (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                  style={{
                    background: "var(--bg-card)", border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 10, padding: "1rem 1.2rem",
                    textDecoration: "none", display: "block", transition: "border-color 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(100,255,218,0.3)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
                >
                  <p style={{ color: "#64ffda", fontWeight: 600, fontSize: "0.88rem", marginBottom: 6 }}>{repo.name}</p>
                  <p style={{ color: "#8892b0", fontSize: "0.78rem", marginBottom: 10, lineHeight: 1.5, minHeight: 34 }}>
                    {repo.description || "No description"}
                  </p>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    {repo.language && (
                      <span style={{ color: "#495670", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f1e05a", display: "inline-block" }} />
                        {repo.language}
                      </span>
                    )}
                    <span style={{ color: "#495670", fontSize: "0.75rem" }}>⭐ {repo.stargazers_count}</span>
                    <span style={{ color: "#495670", fontSize: "0.75rem" }}>🍴 {repo.forks_count}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
