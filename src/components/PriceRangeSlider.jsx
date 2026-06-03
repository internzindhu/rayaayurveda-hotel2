import { useState, useRef, useCallback, useEffect } from "react";

function fmt(val, max) {
  if (val >= 1000) return `${Math.round(val / 1000)}K${val >= max ? "+" : ""}`;
  return String(val) + (val >= max ? "+" : "");
}

export default function PriceRangeSlider({ min = 0, max = 10000, low, high, currency = "USD", onChange }) {
  const [localLow, setLocalLow] = useState(low ?? min);
  const [localHigh, setLocalHigh] = useState(high ?? max);
  const trackRef = useRef(null);
  const dragging = useRef(null);

  useEffect(() => { setLocalLow(low ?? min); }, [low, min]);
  useEffect(() => { setLocalHigh(high ?? max); }, [high, max]);

  const snap = useCallback((val) => Math.round(val / 10) * 10, []);

  const getVal = useCallback((e) => {
    const rect = trackRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return snap(min + ratio * (max - min));
  }, [min, max, snap]);

  const onMove = useCallback((e) => {
    if (!dragging.current) return;
    const val = getVal(e);
    if (dragging.current === "low") setLocalLow(Math.min(val, localHigh - 10));
    else setLocalHigh(Math.max(val, localLow + 10));
  }, [localLow, localHigh, getVal]);

  const onUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = null;
    onChange?.([localLow, localHigh]);
  }, [localLow, localHigh, onChange]);

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [onMove, onUp]);

  const pct = (val) => ((val - min) / (max - min)) * 100;
  const lowPct = pct(localLow);
  const highPct = pct(localHigh);
  const tooltipPct = (lowPct + highPct) / 2;

  const label = localLow <= min && localHigh >= max
    ? "Any price"
    : `${currency} ${fmt(localLow, max)} – ${currency} ${fmt(localHigh, max)}`;

  return (
    <div className="relative w-full pt-8 pb-1 select-none">
      {/* Tooltip */}
      <div
        className="absolute top-0 -translate-x-1/2 bg-white border border-[#E0D4C8] rounded-lg px-3 py-1 text-xs text-[#181818] shadow-sm whitespace-nowrap pointer-events-none z-10"
        style={{ left: `clamp(40px, ${tooltipPct}%, calc(100% - 40px))`, fontFamily: "Lato, sans-serif" }}
      >
        {label}
      </div>

      {/* Track */}
      <div ref={trackRef} className="relative h-[3px] w-full bg-[#E0D4C8] rounded-full">
        {/* Active fill */}
        <div
          className="absolute h-full bg-[#5E17EB] rounded-full"
          style={{ left: `${lowPct}%`, right: `${100 - highPct}%` }}
        />

        {/* Low handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#5E17EB] shadow cursor-grab active:cursor-grabbing"
          style={{ left: `${lowPct}%` }}
          onMouseDown={(e) => { e.preventDefault(); dragging.current = "low"; }}
          onTouchStart={() => { dragging.current = "low"; }}
        />

        {/* High handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#5E17EB] shadow cursor-grab active:cursor-grabbing"
          style={{ left: `${highPct}%` }}
          onMouseDown={(e) => { e.preventDefault(); dragging.current = "high"; }}
          onTouchStart={() => { dragging.current = "high"; }}
        />
      </div>
    </div>
  );
}
