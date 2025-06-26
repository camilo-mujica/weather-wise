import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import WeatherCard from './WeatherCard';
import { Period } from '../hooks/useForecast';

const mockDay: Period = {
  number: 1,
  name: 'Today',
  startTime: '2025-06-26T06:00:00-04:00',
  endTime: '2025-06-26T18:00:00-04:00',
  isDaytime: true,
  icon: '/day-icon.svg',
  shortForecast: 'Sunny',
  detailedForecast: 'Clear and sunny throughout the day.',
  temperature: 25,
  temperatureUnit: 'C',
  probabilityOfPrecipitation: { unitCode: 'wmoUnit:percent', value: 10 },
  windSpeed: '10 km/h',
  windDirection: 'NE',
};

const mockNight: Period = {
  number: 2,
  name: 'Tonight',
  startTime: '2025-06-26T18:00:00-04:00',
  endTime: '2025-06-27T06:00:00-04:00',
  isDaytime: false,
  icon: '/night-icon.svg',
  shortForecast: 'Clear',
  detailedForecast: 'Clear skies at night.',
  temperature: 15,
  temperatureUnit: 'C',
  probabilityOfPrecipitation: { unitCode: 'wmoUnit:percent', value: 0 },
  windSpeed: '5 km/h',
  windDirection: 'N',
};

describe('WeatherCard', () => {
  it('renders day period by default', () => {
    render(<WeatherCard day={mockDay} night={mockNight} isToday={true} />);
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByText('25°C')).toBeInTheDocument();
    expect(screen.getByTitle('Switch to Night')).toBeInTheDocument();
    expect(screen.getByAltText('Sunny')).toBeInTheDocument();
  });

  it('renders night period when toggled', () => {
    render(<WeatherCard day={mockDay} night={mockNight} isToday={false} />);
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    expect(screen.getByText('Tonight')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
    expect(screen.getByText('15°C')).toBeInTheDocument();
    expect(screen.getByTitle('Switch to Day')).toBeInTheDocument();
    expect(screen.getByAltText('Clear')).toBeInTheDocument();
  });

  it('shows correct precipitation and wind info', () => {
    render(<WeatherCard day={mockDay} night={mockNight} />);
    expect(screen.getByText(/Precip: 10%/)).toBeInTheDocument();
    expect(screen.getByText(/Wind: 10 km\/h NE/)).toBeInTheDocument();
    // Switch to night
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/Precip: 0%/)).toBeInTheDocument();
    expect(screen.getByText(/Wind: 5 km\/h N/)).toBeInTheDocument();
  });

  it('truncates long shortForecast and shows detailedForecast as title', () => {
    const longForecast = 'Very long forecast that should be truncated.';
    render(
      <WeatherCard
        day={{ ...mockDay, shortForecast: longForecast, detailedForecast: 'Details here.' }}
        night={mockNight}
      />
    );
    expect(screen.getByText(longForecast)).toHaveAttribute('title', 'Details here.');
  });
});
