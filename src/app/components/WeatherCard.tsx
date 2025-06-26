import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Period } from '../hooks/useForecast';

interface WeatherCardProps {
  day: Period;
  night: Period;
  isToday?: boolean;
}

export default function WeatherCard({ day, night, isToday }: WeatherCardProps) {
  const [isDay, setIsDay] = useState(true);
  const isNight = !isDay;
  const period = isDay ? day : night;

  const formattedTime = new Date(period.startTime).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className={`overflow-hidden relative transition-all duration-200 hover:shadow-md hover:-translate-y-1 rounded-xl p-6 text-center border
        ${isToday ? 'shadow-md border-indigo-300' : ''}
        ${
          isDay
            ? 'bg-white border-slate-200 hover:border-slate-300'
            : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-white'
        }
      `}
    >
      <div className="absolute flex justify-end mb-2 -top-1 -right-2">
        <button
          onClick={() => setIsDay((prev) => !prev)}
          className={`p-2 rounded-full border transition-colors cursor-pointer ${isDay ? 'bg-slate-100 border-slate-200 hover:bg-slate-200' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}
          title={isDay ? 'Switch to Night' : 'Switch to Day'}
        >
          {isDay ? (
            <Moon className="w-5 h-5 text-slate-700" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-400" />
          )}
        </button>
      </div>
      {/* Title and Date */}
      <div className="mb-4">
        <h3
          className={`font-semibold text-lg ${
            isDay ? (isToday ? 'text-indigo-800' : 'text-slate-800') : 'text-white'
          }`}
        >
          {period.name}
        </h3>
        <p className={`text-sm ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
          {formattedTime}
        </p>
      </div>
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <img
          src={period.icon}
          alt={period.shortForecast.replace(/\.$/, '')}
          className={`w-14 h-14 rounded-full ${
            isNight ? 'bg-slate-800' : 'bg-slate-100'
          } shadow-sm`}
        />
      </div>
      {/* Temperature */}
      <div className={`text-4xl font-bold ${isNight ? 'text-white' : 'text-slate-900'} mb-2`}>
        {period.temperature}°{period.temperatureUnit}
      </div>
      {/* Condition */}
      <p
        className={`text-sm mb-2 line-clamp-2 ${isNight ? 'text-slate-300' : 'text-slate-700'}`}
        title={period.detailedForecast}
      >
        {period.shortForecast}
      </p>
      {/* Additional Info */}
      <div className={`text-xs space-y-1 mt-2 ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
        <p>💧 Precip: {period.probabilityOfPrecipitation?.value ?? 0}%</p>
        <p>
          🌬 Wind: {period.windSpeed} {period.windDirection}
        </p>
      </div>
    </div>
  );
}
