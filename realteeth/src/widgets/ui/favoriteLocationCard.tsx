import { useEffect } from 'react';
import type { FavoriteLocation } from '../../entities/favorite/model/type';
import { useQuery } from '@tanstack/react-query';
import { getWeatherQuery } from '../../entities/weather/query';
import { generateWeatherParameter } from '../../entities/weather/api/api';
import type { MeteoResponse } from '../../entities/weather/model/type';
import useContextMenuStore from '../model/contextMenuStore';
import { ContextMenu } from '../../shared/ui/contextMenu/contextMenu';

type FavoriteLocationProps = FavoriteLocation & {
  onClick?: (address: string) => void;
  onDelete?: (id: string) => void;
  setFavoriteLocations?: (
    locations: FavoriteLocation[] | ((prev: FavoriteLocation[]) => FavoriteLocation[])
  ) => void;
  deleteFavoriteLocation?: (id: string) => void;
};
function FavoriteLocationCard({
  id,
  name,
  address,
  geocode,
  weather,
  setFavoriteLocations,
  deleteFavoriteLocation,
  onClick,
}: FavoriteLocationProps) {
  const { data } = useQuery<MeteoResponse>({
    ...getWeatherQuery(
      generateWeatherParameter({
        latitude: geocode.latitude,
        longitude: geocode.longitude,
      })
    ),
  });
  useEffect(() => {
    if (data && setFavoriteLocations) {
      setFavoriteLocations((prev: FavoriteLocation[]) =>
        prev.map((location) =>
          location.id === id
            ? {
                ...location,
                weather: {
                  current: {
                    temperature_2m: data.current.temperature_2m,
                  },
                  daily: {
                    temperature_2m_max: data.daily.temperature_2m_max,
                    temperature_2m_min: data.daily.temperature_2m_min,
                  },
                },
              }
            : location
        )
      );
    }
  }, [data, id, setFavoriteLocations]);
  const open = useContextMenuStore((state) => state.open);
  const x = useContextMenuStore((state) => state.x);
  const y = useContextMenuStore((state) => state.y);
  const contextMenuId = useContextMenuStore((state) => state.id);
  const close = useContextMenuStore((state) => state.close);

  return (
    <div
      key={id}
      className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-white/20 transition-all cursor-pointer border border-white/10 relative"
      onClick={() => onClick && onClick(address)}
    >
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-1 md:gap-2">
          <span className="text-xs md:text-sm font-medium line-clamp-1">{name}</span>
        </div>
        <button
          className="p-1 hover:bg-white/10 rounded-lg transition-all"
          aria-label="메뉴"
          onClick={(e) => {
            e.stopPropagation();
            const button = e.currentTarget;
            const card = button.closest('.relative');
            if (card) {
              const cardRect = card.getBoundingClientRect();
              const buttonRect = button.getBoundingClientRect();
              // 버튼 아래 왼쪽 정렬
              const relativeX = buttonRect.left - cardRect.left;
              const relativeY = buttonRect.bottom - cardRect.top;
              open({ x: relativeX, y: relativeY, id: id });
            }
          }}
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 text-white/70 shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>

      <div className="text-3xl md:text-4xl font-light mb-2 md:mb-3">
        {weather.current.temperature_2m}°
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-xs md:text-sm text-white/70">
        <span>최저 {weather.daily.temperature_2m_min[0]}°</span>
        <span>최고 {weather.daily.temperature_2m_max[0]}°</span>
      </div>
      {id === contextMenuId && (
        <ContextMenu position={{ x, y }} visible={true} onClose={close}>
          <div className="text-black" onClick={() => {}}>
            이름 변경하기
          </div>
          <div
            className="text-red-600"
            onClick={() => deleteFavoriteLocation && deleteFavoriteLocation(id)}
          >
            삭제하기
          </div>
        </ContextMenu>
      )}
    </div>
  );
}
export default FavoriteLocationCard;
