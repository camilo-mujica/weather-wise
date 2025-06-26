'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import { Period, useForecast } from './hooks/useForecast';
import SearchBar from './components/SearchBar';

export default function WeatherApp() {
  const [address, setAddress] = useState('');
  const debouncedAddress = useDebouncedValue(address, 500);
  const [units, setUnits] = useState<'us' | 'si'>('us');
  const { forecast, isLoading, isError, error } = useForecast(debouncedAddress, units);
  const [addressHistory, setAddressHistory] = useState<string[]>([]);

  const periods = forecast?.periods ?? [];

  const groupedPeriods: { day: Period; night: Period }[] = [];

  for (let i = 0; i < periods.length; i += 2) {
    if (i + 1 < periods.length) {
      groupedPeriods.push({
        day: periods[i],
        night: periods[i + 1],
      });
    } else {
      break;
    }
  }

  // Load address history from localStorage on mount
  useEffect(() => {
    const storedHistory = localStorage.getItem('addressHistory');
    if (storedHistory) {
      setAddressHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    if (forecast?.address && !addressHistory.includes(forecast.address)) {
      setAddressHistory((prev) => [...prev, forecast.address]);
      localStorage.setItem('addressHistory', JSON.stringify([...addressHistory, forecast.address]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forecast?.address]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-slate-800 text-center">7-Day Weather Forecast</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-12">
          <SearchBar
            value={address}
            setValue={setAddress}
            error={isError}
            placeholder="Enter your address or city... e.g. '4600 Silver Hill Rd, Washington, DC 20233'"
          />

          {/* Temperature Toggle */}
          <button
            onClick={() => setUnits(units === 'si' ? 'us' : 'si')}
            className="h-12 px-4 text-sm font-medium bg-slate-100 text-slate-700 rounded-lg border border-slate-300 hover:bg-slate-200 transition cursor-pointer"
            title={`Change to ${units === 'si' ? 'US' : 'SI'} units`}
          >
            °{units === 'si' ? 'C' : 'F'}
          </button>
        </div>

        {/* Weather Forecast Grid */}
        {forecast && !isLoading && !isError && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-slate-600" />
              <h2 className="text-xl font-semibold text-slate-900">
                Weather forecast for {debouncedAddress}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groupedPeriods.map((data, index) => (
                <WeatherCard
                  key={`data-${data.day.number}`}
                  day={data.day}
                  night={data.night}
                  isToday={index === 0}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!forecast && !isLoading && !isError && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Search for Weather Forecast
            </h3>
            <p className="text-slate-600 max-w-md mx-auto">
              Enter your address or city name above to get a detailed 7-day weather forecast
            </p>
            {addressHistory.length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-slate-800 mb-3">Recent Searches</h4>
                <ul className="flex flex-wrap gap-2">
                  {addressHistory.map((addr, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => setAddress(addr)}
                        className="px-3 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 rounded-full text-sm transition shadow-sm cursor-pointer"
                      >
                        {addr}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mb-4" />
            <p className="text-slate-700 text-lg font-medium">
              Getting weather forecast for {debouncedAddress}...
            </p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-red-600 text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Error fetching weather data</h3>
            <p className="max-w-md mx-auto">
              {error instanceof Error ? error.message : 'An unexpected error occurred'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
