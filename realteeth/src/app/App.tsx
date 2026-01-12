import WeatherPage from '../pages/weather/weather';
import Notify from '../widgets/ui/notify';
import QuertProvider from './provider/QuertProvider';

function App() {
  return (
    <QuertProvider>
      <WeatherPage />
      <Notify />
    </QuertProvider>
  );
}

export default App;
