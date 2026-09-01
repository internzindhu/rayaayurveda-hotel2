import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { cn } from "../lib/utils";

const DEFAULT_CENTER = [7.8731, 80.7718]; // Sri Lanka — sane fallback while markers load
const DEFAULT_ZOOM = 7;
const SINGLE_PIN_ZOOM = 13;

function toCoord(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

// Fits the map to whatever markers are currently on it — re-runs when the
// filtered hotel set changes (e.g. filters applied on the directory page).
function FitBounds({ points }) {
  const map = useMap();

  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], SINGLE_PIN_ZOOM);
      return;
    }
    map.fitBounds(points, { padding: [40, 40], maxZoom: 13 });
  }, [map, points]);

  return null;
}

export default function HotelMap({ hotels = [], cluster = true, className = "", emptyMessage = null }) {
  const points = useMemo(() => {
    return hotels
      .map((hotel) => {
        const lat = toCoord(hotel.latitude);
        const lng = toCoord(hotel.longitude);
        if (lat === null || lng === null) return null;
        return { ...hotel, lat, lng };
      })
      .filter(Boolean);
  }, [hotels]);

  const boundsPoints = useMemo(() => points.map((p) => [p.lat, p.lng]), [points]);

  if (points.length === 0) {
    if (!emptyMessage) return null;
    return (
      <div
        className={cn(
          "h-[420px] w-full rounded-xl border border-dashed border-[#D5CFC9] bg-[#FFF8F2] flex items-center justify-center px-8 text-center",
          className
        )}
      >
        <p className="text-sm text-[#8C8C8C]" style={{ fontFamily: "Lato, sans-serif" }}>
          {emptyMessage}
        </p>
      </div>
    );
  }

  const initialCenter = points.length === 1 ? [points[0].lat, points[0].lng] : DEFAULT_CENTER;
  const initialZoom = points.length === 1 ? SINGLE_PIN_ZOOM : DEFAULT_ZOOM;

  const markers = points.map((hotel) => (
    <Marker key={hotel.id} position={[hotel.lat, hotel.lng]}>
      <Popup>
        <div className="min-w-[160px]">
          <p
            className="text-sm text-[#181818] mb-2"
            style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
          >
            {hotel.name}
          </p>
          <Link
            to={`/book-hotel/${hotel.slug ?? hotel.id}`}
            className="text-[#5E17EB] text-xs uppercase tracking-[0.08em] hover:underline"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            View retreat →
          </Link>
        </div>
      </Popup>
    </Marker>
  ));

  return (
    <div className={cn("h-[420px] w-full rounded-xl overflow-hidden shadow-sm border border-[#F0EBE4]", className)}>
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={boundsPoints} />
        {cluster ? (
          <MarkerClusterGroup chunkedLoading>{markers}</MarkerClusterGroup>
        ) : (
          markers
        )}
      </MapContainer>
    </div>
  );
}
