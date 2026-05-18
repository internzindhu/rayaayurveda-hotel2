const BASE = import.meta.env.VITE_WELLNESS_API_URL ?? "http://localhost:3005";

function buildQuery(params = {}) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") q.set(k, String(v));
  }
  return q.toString();
}

export async function fetchWellnessHotels(params = {}) {
  const qs = buildQuery(params);
  const res = await fetch(`${BASE}/api/hotels${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error(`Hotels API error ${res.status}`);
  return res.json(); // { success, data: Hotel[], meta }
}

export async function fetchLookups() {
  const res = await fetch(`${BASE}/api/lookups`);
  if (!res.ok) throw new Error(`Lookups API error ${res.status}`);
  return res.json(); // { facilities: [{id,name}], activities: [...], ... }
}
