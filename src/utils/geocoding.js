/**
 * Deterministic geocoding for arbitrary location strings, centering results in the Jakarta metro area.
 * Bypasses network requirements and API keys, ensuring reliable and free maps for the prototype.
 */
export const geocode = (locationName, defaultCoords = [-6.2088, 106.8456]) => {
  if (!locationName) return defaultCoords;
  const normalized = locationName.toLowerCase().trim();

  // Known location matching
  if (
    normalized.includes('soekarno') ||
    normalized.includes('hatta') ||
    normalized.includes('airport') ||
    normalized.includes('cgk') ||
    normalized.includes('bandara')
  ) {
    return [-6.1256, 106.6559]; // Soekarno-Hatta International Airport
  }
  if (
    normalized.includes('grand indonesia') ||
    normalized.includes('plaza') ||
    normalized.includes('sudirman') ||
    normalized.includes('thamrin') ||
    normalized.includes('central')
  ) {
    return [-6.1950, 106.823]; // Central Business District
  }
  if (normalized.includes('monas') || normalized.includes('national monument')) {
    return [-6.1754, 106.8272]; // National Monument
  }
  if (normalized.includes('gambir')) {
    return [-6.1767, 106.8306]; // Gambir Railway Station
  }
  if (normalized.includes('kemang')) {
    return [-6.2737, 106.8206]; // South Jakarta (Kemang)
  }
  if (normalized.includes('ancol') || normalized.includes('dufan')) {
    return [-6.1262, 106.8402]; // North Jakarta (Ancol Beach)
  }
  if (normalized.includes('taman mini') || normalized.includes('tmii')) {
    return [-6.3024, 106.8952]; // East Jakarta (TMII)
  }
  if (normalized.includes('blok m')) {
    return [-6.2442, 106.7973]; // Blok M
  }
  if (normalized.includes('pondok indah') || normalized.includes('pim')) {
    return [-6.2697, 106.7823]; // Pondok Indah
  }
  if (normalized.includes('kelapa gading')) {
    return [-6.1568, 106.9086]; // Kelapa Gading
  }

  // Fallback: Hash location string to generate a deterministic coordinate inside Jakarta
  let hash1 = 0;
  let hash2 = 0;
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash1 = char + ((hash1 << 5) - hash1);
    hash2 = char + ((hash2 << 7) - hash2);
  }

  // Bounding box range for Jakarta:
  // Lat: -6.15 to -6.30
  // Lng: 106.75 to 106.90
  const latOffset = (Math.abs(hash1) % 150) / 1000; // 0 to 0.15
  const lngOffset = (Math.abs(hash2) % 150) / 1000; // 0 to 0.15

  const lat = -6.15 - latOffset;
  const lng = 106.75 + lngOffset;

  return [lat, lng];
};

export const LOCATIONS = [
  'Sudirman Central Business District (SCBD)',
  'Soekarno-Hatta International Airport (CGK)',
  'Grand Indonesia Mall, Jakarta',
  'Mega Kuningan Corporate Hub',
  'Gading Serpong, Tangerang',
  'Pondok Indah Residences',
  'Kemang Entertainment District',
  'Tanjung Priok Luxury Port',
  'National Monument (Monas)',
  'Gambir Railway Station',
  'Ancol Dreamland (Dufan)',
  'Taman Mini Indonesia Indah (TMII)',
  'Blok M Plaza',
  'Kelapa Gading Mall'
];
