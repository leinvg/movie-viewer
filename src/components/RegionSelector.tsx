// src/components/RegionSelector.tsx

'use client';

import { Region } from '@/store/appStore';
import useAppStore from '@/store/appStore';

const REGION_OPTIONS: { value: Region; label: string; country: string }[] = [
  { value: 'PE', label: '🇵🇪 Perú', country: 'Peru' },
  { value: 'BO', label: '🇧🇴 Bolivia', country: 'Bolivia' },
  { value: 'CL', label: '🇨🇱 Chile', country: 'Chile' },
  { value: 'CO', label: '🇨🇴 Colombia', country: 'Colombia' },
  { value: 'EC', label: '🇪🇨 Ecuador', country: 'Ecuador' },
];

export default function RegionSelector() {
  const { region, setRegion } = useAppStore();

  return (
    <select
      value={region}
      onChange={(e) => setRegion(e.target.value as Region)}
      className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition"
      aria-label="Seleccionar región"
    >
      {REGION_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
