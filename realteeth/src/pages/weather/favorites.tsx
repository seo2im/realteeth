import type { FavoriteLocation } from '../../entities/favorite/model/type';
import FavoriteLocationCard from '../../widgets/ui/favoriteLocationCard';

function Favorites({
  favorites,
  deleteFavoriteLocation,
  setAddress,
}: {
  favorites: FavoriteLocation[];
  deleteFavoriteLocation: (id: string) => void;
  setAddress: (address: string) => void;
}) {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-xl">
      <h2 className="text-xl md:text-2xl mb-4 md:mb-6">즐겨찾기</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {favorites.map((location: FavoriteLocation) => (
          <FavoriteLocationCard
            key={location.id}
            {...location}
            deleteFavoriteLocation={deleteFavoriteLocation}
            onClick={setAddress}
          />
        ))}
      </div>
    </div>
  );
}
export default Favorites;
