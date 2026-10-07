// ============================================================
//  Wedding settings — edit these to update the whole invitation
// ============================================================

// Wedding date in ISO format: YYYY-MM-DD (drives the big date block,
// the prose date, and the countdown timer)
export const WEDDING_DATE = '2026-10-25'

// Venue coordinates (lat, lon).
export const LOCATION_COORDS = { lat: 40.596889, lon: 72.794098 }

// Embedded map — OpenStreetMap renders keyless with real streets + a pin.
// (Google/2GIS both require a paid API key to embed a live map.)
export const LOCATION_MAP_URL =
  'https://2gis.kg/bishkek/geo/70030076150333958/72.794098,40.596889'

// "Open in Google Maps" button target (opens the native app/site for navigation).
export const LOCATION_GOOGLE_URL =
  'https://2gis.kg/bishkek/geo/70030076150333958/72.794098,40.596889'

// Address title shown above the map (\n becomes a line break)
export const LOCATION_TITLE = 'Адрес: "Улица Сулейманова, 191"'

// Program of the day (label + time). Edit / add / remove freely.
export const STAGES = [
  { label: 'Для женщин:\n(без тугуна)', time: '13:00', side: 'right' },
  // { label: 'Друзья жениха', time: '13:00', side: 'left' },
  // { label: 'Фуршет\nманзил: Исхака Раззакова, 23\n“Орто Азия”', time: '16:00', side: 'right' },
]

// Cyrillic month names, indexed 1..12
const MONTHS = [
  '',
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
]

// Derived date parts used across the UI.
export function getWeddingDateParts() {
  const [year, month, day] = WEDDING_DATE.split('-').map(Number)
  const pad = (n) => String(n).padStart(2, '0')
  return {
    iso: WEDDING_DATE,
    day, // 7
    monthName: MONTHS[month], // июль
    dateDay: pad(day), // 07
    dateMonth: pad(month), // 07
    dateYear: String(year).slice(-2), // 25
  }
}
