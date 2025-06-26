import { useQuery } from '@tanstack/react-query';

export type Period = {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend?: string;
  probabilityOfPrecipitation?: {
    unitCode: string;
    value: number;
  };
  windSpeed?: string;
  windDirection?: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
};

type ForecastData = {
  periods: Period[];
  address: string;
};

export const useForecast = (address: string, units: 'us' | 'si' = 'si') => {
  const { data, isLoading, error, isError } = useQuery<ForecastData>({
    queryKey: ['forecast', address, units],
    queryFn: async () => {
      // Get coordinates from address
      const geoRes = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`);
      if (!geoRes.ok) throw new Error('Geocoding failed');
      const { result } = await geoRes.json();
      const coords = result?.addressMatches[0]?.coordinates;
      if (!coords) throw new Error('No coordinates found');

      // Use coordinates to get weather points
      const pointsRes = await fetch(`https://api.weather.gov/points/${coords.y},${coords.x}`);
      if (!pointsRes.ok) throw new Error('Weather points fetch failed');
      const { properties } = await pointsRes.json();
      const forecastUrl = properties.forecast;

      // Fetch the forecast data
      const forecastRes = await fetch(forecastUrl + `?units=${units}`);
      if (!forecastRes.ok) throw new Error('Forecast fetch failed');
      const forecastData = await forecastRes.json();

      return {
        periods: forecastData.properties.periods,
        address: result.input.address.address,
      };
    },
    enabled: !!address, // Only run query if address is provided
    refetchOnWindowFocus: false,
  });

  return {
    forecast: data,
    isLoading,
    error,
    isError,
  };
};
