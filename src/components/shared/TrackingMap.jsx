import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { geocode } from '@/utils/geocoding';
import { Car } from 'lucide-react';

export default function TrackingMap({
  pickup,
  dropoff,
  distance,
  eta,
  riderName,
  driverName,
  className = '',
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const cabMarkerRef = useRef(null);

  const statusTextRef = useRef(null);
  const routeLabelRef = useRef(null);
  const etaTextRef = useRef(null);

  // Fallback estimates if not passed
  const displayDistance = distance || 10.5;
  const displayEta = eta || 25;

  const rName = riderName || 'Rider';
  const dName = driverName || 'Driver';

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const pickupCoords = geocode(pickup);
    const dropoffCoords = geocode(dropoff);

    const driverStartCoords = [pickupCoords[0] + 0.006, pickupCoords[1] - 0.006];

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
    });
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    const pickupIcon = L.divIcon({
      html: `<div class="flex items-center justify-center h-8 w-8 bg-emerald-500 text-white rounded-full border-2 border-white shadow-lg font-bold text-xs uppercase">${rName.charAt(0)}</div>`,
      className: 'custom-map-marker-pickup',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const dropoffIcon = L.divIcon({
      html: `<div class="flex items-center justify-center h-8 w-8 bg-blue-600 text-white rounded-full border-2 border-white shadow-lg font-bold text-xs">B</div>`,
      className: 'custom-map-marker-dropoff',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const cabIcon = L.divIcon({
      html: `
        <div class="flex items-center justify-center h-10 w-10 bg-amber-500 text-white rounded-full border-2 border-white shadow-xl animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
            <circle cx="7" cy="17" r="2"/>
            <path d="M9 17h6"/>
            <circle cx="17" cy="17" r="2"/>
          </svg>
        </div>
      `,
      className: 'custom-map-marker-cab',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    const driverStartIcon = L.divIcon({
      html: `<div class="flex items-center justify-center h-5 w-5 bg-amber-500/20 text-amber-600 rounded-full border border-amber-500 shadow-sm"><div class="h-2 w-2 bg-amber-500 rounded-full"></div></div>`,
      className: 'custom-map-marker-driver-start',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    L.marker(driverStartCoords, { icon: driverStartIcon }).addTo(map).bindTooltip(dName, {
      permanent: true,
      direction: 'top',
      className:
        'bg-amber-500 border-none text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md',
    });

    L.marker(pickupCoords, { icon: pickupIcon }).addTo(map).bindTooltip(rName, {
      permanent: true,
      direction: 'top',
      className:
        'bg-emerald-500 border-none text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md',
    });

    L.marker(dropoffCoords, { icon: dropoffIcon }).addTo(map).bindTooltip('Destination', {
      permanent: true,
      direction: 'top',
      className:
        'bg-blue-600 border-none text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md',
    });

    const cabMarker = L.marker(driverStartCoords, { icon: cabIcon }).addTo(map);
    cabMarkerRef.current = cabMarker;

    L.polyline([driverStartCoords, pickupCoords], {
      color: '#10b981',
      weight: 4,
      dashArray: '6, 6',
      opacity: 0.8,
    }).addTo(map);

    L.polyline([pickupCoords, dropoffCoords], {
      color: '#2563eb',
      weight: 4,
      dashArray: '6, 6',
      opacity: 0.8,
    }).addTo(map);

    const bounds = L.latLngBounds([driverStartCoords, pickupCoords, dropoffCoords]);
    map.fitBounds(bounds, { padding: [50, 50] });

    let progress = 0;
    const animateCab = () => {
      progress += 0.003;

      let lat, lng;

      // Phase 1 (0.0 to 0.4): Driver approaches Pickup
      if (progress < 0.4) {
        const t = progress / 0.4;
        lat = driverStartCoords[0] + (pickupCoords[0] - driverStartCoords[0]) * t;
        lng = driverStartCoords[1] + (pickupCoords[1] - driverStartCoords[1]) * t;

        const approachEta = Math.max(1, Math.round(5 * (1 - t)));
        if (statusTextRef.current) statusTextRef.current.innerText = 'Driver is approaching...';
        if (routeLabelRef.current) routeLabelRef.current.innerText = `${dName} → ${rName}`;
        if (etaTextRef.current) {
          etaTextRef.current.innerText = `${approachEta} mins`;
          etaTextRef.current.className = 'text-emerald-500 font-extrabold';
        }
      }
      // Phase 2 (0.4 to 1.0): Trip in progress (Pickup to Destination)
      else {
        const t = Math.min(1.0, (progress - 0.4) / 0.6);
        lat = pickupCoords[0] + (dropoffCoords[0] - pickupCoords[0]) * t;
        lng = pickupCoords[1] + (dropoffCoords[1] - pickupCoords[1]) * t;

        const tripEta = Math.max(0, Math.round(displayEta * (1 - t)));

        if (progress >= 1.0) {
          if (statusTextRef.current) statusTextRef.current.innerText = 'Arrived at Destination';
          if (routeLabelRef.current) routeLabelRef.current.innerText = 'Trip Completed';
          if (etaTextRef.current) {
            etaTextRef.current.innerText = 'Arrived';
            etaTextRef.current.className = 'text-blue-600 font-extrabold';
          }
          if (cabMarkerRef.current) {
            cabMarkerRef.current.setLatLng(dropoffCoords);
          }
          cancelAnimationFrame(animationFrameId);
          return;
        }

        if (statusTextRef.current) statusTextRef.current.innerText = 'Trip in progress...';
        if (routeLabelRef.current) routeLabelRef.current.innerText = `${rName} → Destination`;
        if (etaTextRef.current) {
          etaTextRef.current.innerText = `${tripEta} mins`;
          etaTextRef.current.className = 'text-blue-500 font-extrabold';
        }
      }

      if (cabMarkerRef.current) {
        cabMarkerRef.current.setLatLng([lat, lng]);
      }

      animationFrameId = requestAnimationFrame(animateCab);
    };

    let animationFrameId = requestAnimationFrame(animateCab);

    return () => {
      cancelAnimationFrame(animationFrameId);
      map.remove();
    };
  }, [pickup, dropoff, displayDistance, displayEta, rName, dName]);

  return (
    <div
      className={`border-outline-variant/30 bg-surface relative overflow-hidden rounded-3xl border shadow-md ${className}`}
    >
      <div ref={mapContainerRef} className='z-10 h-full min-h-[300px] w-full' />
      <div className='bg-surface/95 border-outline-variant/20 absolute top-4 right-4 z-20 flex max-w-[250px] flex-col gap-2 rounded-2xl border p-4 shadow-lg backdrop-blur-md'>
        <div className='flex items-center gap-2'>
          <div className='flex h-6 w-6 animate-pulse items-center justify-center rounded-full bg-amber-500/10 text-amber-600'>
            <Car className='h-3.5 w-3.5' />
          </div>
          <span ref={statusTextRef} className='text-on-surface text-xs font-black tracking-tight'>
            Driver is approaching...
          </span>
        </div>

        <div className='border-outline-variant/20 my-1 flex flex-col gap-1 border-t pt-1.5 text-xs'>
          <div className='flex justify-between'>
            <span className='text-outline font-semibold'>Active Leg:</span>
            <span ref={routeLabelRef} className='text-on-surface max-w-[125px] truncate font-bold'>
              Driver → Pickup (A)
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-outline font-semibold'>Total Distance:</span>
            <span className='text-on-surface font-bold'>{displayDistance} km</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-outline font-semibold'>Time Remaining:</span>
            <span ref={etaTextRef} className='font-extrabold text-emerald-500'>
              {displayEta} mins
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
