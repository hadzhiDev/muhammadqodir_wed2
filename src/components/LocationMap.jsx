import RevealText from './RevealText'
import { LOCATION_GOOGLE_URL, LOCATION_TITLE, LOCATION_COORDS } from '../lib/config'

// Keyless OpenStreetMap embed — real streets + a pin, no API key required.
// A small bounding box around the venue keeps it zoomed in on the location.
const { lat, lon } = LOCATION_COORDS
const bbox = [lon - 0.004, lat - 0.0025, lon + 0.004, lat + 0.0025].join('%2C')
const OSM_EMBED_URL =
  `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}` +
  `&layer=mapnik&marker=${lat}%2C${lon}`

export default function LocationMap() {
  return (
    <>
      <RevealText
        as="div"
        gradient
        className="text-center font-display text-[clamp(1.35rem,6vw,1.75rem)] font-semibold leading-[1.25] tracking-[0.015em]"
        text={LOCATION_TITLE}
      />

      <div className="mx-auto my-[40px] w-full max-w-[440px] overflow-hidden rounded-[16px] shadow-[0_10px_30px_-8px_rgba(120,100,60,0.35)] ring-1 ring-black/5">
        {/* The map is display-only; tapping it opens 2GIS for navigation. */}
        <a
          href={LOCATION_GOOGLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Открыть карту в 2GIS"
          className="relative block h-[clamp(260px,72vw,360px)] w-full"
        >
          <iframe
            title="Карта — место проведения"
            src={OSM_EMBED_URL}
            className="pointer-events-none h-full w-full border-0"
            loading="lazy"
          />
        </a>

        <a
          href={LOCATION_GOOGLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border-t border-gold/20 bg-[#FFFDF4] py-4 font-body text-[15px] font-medium tracking-[0.08em] text-graphite transition-colors hover:bg-[#f3ecd7]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
              fill="#b0873f"
            />
          </svg>
          Открыть в 2GIS
        </a>
      </div>
      </>
  )
}