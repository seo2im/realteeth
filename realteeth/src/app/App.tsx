import WeatherPage from '../pages/weather/weather';
import QuertProvider from './provider/QuertProvider';

function App() {
  return (
    <QuertProvider>
      <WeatherPage />
    </QuertProvider>
  );
}

export default App;
