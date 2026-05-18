const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3005";

export async function fetchWellnessHotels(params = {}) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      search.set(key, value.join(","));
    } else {
      search.set(key, String(value));
    }
  }
  const url = `${API_BASE}/api/hotels${search.toString() ? `?${search}` : ""}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Hotel fetch failed (${res.status}): ${text || res.statusText}`);
  }
  return res.json();
}

export async function fetchHotelById(id) {
  const res = await fetch(`${API_BASE}/api/hotels/${id}`);
  if (!res.ok) throw new Error(`Hotel ${id} fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchRelatedHotels(id) {
  const res = await fetch(`${API_BASE}/api/hotels/${id}/related`);
  if (!res.ok) throw new Error(`Related hotels fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchLookups() {
  const res = await fetch(`${API_BASE}/api/lookups`);
  if (!res.ok) throw new Error(`Lookups fetch failed: ${res.status}`);
  return res.json();
}