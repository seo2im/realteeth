import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { WeatherUiData } from '@entities/uiData/model/weather.type';
import { Spinner } from '@shared/ui/spinner/spinner';

export function DailyWeather({
  weather,
  isLoading,
}: {
  weather?: WeatherUiData['weather'];
  isLoading: boolean;
}) {
  const hourlyData =
    weather?.hourly.time.map((time, index) => ({
      time: time.slice(11, 16),
      temp: weather.hourly.temperature_2m[index],
    })) || [];
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-xl">
      <h2 className="text-xl md:text-2xl mb-4 md:mb-6">시간별 기온</h2>
      <div className="w-full" style={{ height: '280px' }}>
        {!weather || isLoading ? (
          <div className="h-75 flex justify-center items-center">
            <Spinner size="lg" />
          </div>
        ) : (
          <ResponsiveContainer initialDimension={{ width: 1, height: 1 }}>
            <LineChart data={hourlyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="time"
                stroke="rgba(255,255,255,0.7)"
                tick={{ fill: 'rgba(255,255,255,0.9)', fontSize: 11 }}
                interval={2}
              />
              <YAxis
                stroke="rgba(255,255,255,0.7)"
                tick={{ fill: 'rgba(255,255,255,0.9)', fontSize: 12 }}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#1e40af',
                  padding: '8px 12px',
                }}
                itemStyle={{
                  color: '#1e40af',
                }}
                formatter={(value: number | undefined) => [`${value}°C`, '기온']}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#ffffff"
                strokeWidth={3}
                dot={{ fill: '#ffffff', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
