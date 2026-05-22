import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => setHov(!!e.target.closest("a,button,[data-hover]"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 99999,
        pointerEvents: "none",
        width: hov ? 36 : 14,
        height: hov ? 36 : 14,
        borderRadius: "50%",
        background: hov ? "transparent" : "rgba(100,255,218,0.85)",
        border: hov ? "1.5px solid rgba(100,255,218,0.8)" : "none",
        transform: `translate(${pos.x - (hov ? 18 : 7)}px, ${pos.y - (hov ? 18 : 7)}px)`,
        transition: "width 0.18s ease, height 0.18s ease, background 0.18s ease, border 0.18s ease",
        mixBlendMode: "difference",
      }}
    />
  );
}
