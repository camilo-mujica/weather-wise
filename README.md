# Weather Wise

This project is a weather forecast application built with Next.js (App Router) and TypeScript. It allows users to search for any address, geocodes it using the US Census Geocoding API, and displays a 7-day weather forecast using the US National Weather Service API.

## Features

- **Next.js App Router** with TypeScript for modern, scalable React development.
- **ESLint** and **Prettier** for code quality and consistent formatting.
- **Tailwind CSS** for rapid, utility-first styling.
- **React Query** for efficient data fetching and caching.
- **Lucide Icons** for beautiful, open-source icons.
- **Jest** for unit testing of components and hooks.
- **TypeScript path aliases** for cleaner imports and better maintainability.
- **Custom API route** (`/api/geocode/route.ts`) to proxy geocoding requests and avoid CORS issues.
- **Component-based architecture** with reusable UI components and custom hooks.

## Project Structure

```
src/
  app/
    api/
      geocode/
        route.ts         # API route to proxy geocoding requests (avoids CORS)
    components/
      SearchBar.tsx      # Search input component
      WeatherCard.tsx    # Weather forecast display component
      SearchBar.test.tsx # Unit tests for SearchBar
      WeatherCard.test.tsx # Unit tests for WeatherCard
    hooks/
      useDebouncedValue.ts         # Debounce hook for search input
      useForecast.ts               # Custom hook to fetch and combine forecast data
      useDebouncedValue.test.ts    # Unit tests for debounce hook
  ...
```

## How It Works

- The user enters an address in the `SearchBar` component.
- The `useForecast` hook is triggered with the provided address. Inside this hook:
  - The address is sent to the `/api/geocode/route.ts` API route, which proxies the request to the US Census Geocoding API (to avoid CORS issues) and retrieves the latitude and longitude.
  - Using these coordinates, the hook fetches the weather grid point from the US National Weather Service API.
  - The hook then fetches the 7-day weather forecast for those coordinates and returns the combined data along with the resolved address.
- The `WeatherCard` component displays the 7-day forecast for the specified location.

## Technical Decisions

- **Next.js App Router**: Chosen for its modern routing and server-side capabilities.
- **TypeScript**: Ensures type safety and better developer experience.
- **React Query**: Handles complex data fetching, caching, and background updates.
- **Custom API Route**: The US Census Geocoding API does not support CORS, so a Next.js API route proxies requests to allow client-side usage.
- **Component & Hook Separation**: UI and logic are separated for reusability and testability.
- **Testing**: All components and hooks have unit tests using Jest.
- **Path Aliases**: Configured in `tsconfig.json` for cleaner imports.

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Testing

Run unit tests with:

```bash
npm run test
# or
yarn test
```

## Linting & Formatting

- Lint code: `npm run lint`
- Format code: `npm run format`

## Deployment

You can deploy this app easily on [Vercel](https://vercel.com/) or any platform that supports Next.js.

## API References

- [US Census Geocoding API](https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.pdf)
- [US National Weather Service API](https://www.weather.gov/documentation/services-web-api)

## Notes

- The app demonstrates technical design, component separation, custom hooks, and robust testing.
- All code is written with maintainability and scalability in mind.
- Please ensure you have a stable internet connection to access the public APIs.

## Bonuses

- **Unit System Switch:** Users can toggle between the US (imperial) and SI (metric) systems using the button next to the search bar. This updates all temperature and wind units in the forecast.
- **Day/Night Toggle:** In each WeatherCard, users can switch between the day and night forecast for the same day, allowing for a more detailed view of weather conditions.
- **Search History:** The application keeps a history of all addresses entered by the user. This list is always available, so users can quickly revisit previous locations and view their weather forecasts again. The history is persisted in localStorage for convenience across sessions.
