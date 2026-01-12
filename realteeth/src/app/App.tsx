import { WeatherPage } from '@pages/weather/weather';
import { Notify } from '@widgets/notification';
import { QuertProvider } from './provider/QuertProvider';

export function App() {
  return (
    <QuertProvider>
      <WeatherPage />
      <Notify />
    </QuertProvider>
  );
}
