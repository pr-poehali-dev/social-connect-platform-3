import { GAMES } from "../../constants";

type CatalogSort = "rating" | "userScore" | "year" | "players";

interface CatalogHeaderProps {
  filteredCount: number;
  catalogSort: CatalogSort;
  setCatalogSort: (s: CatalogSort) => void;
}

export function CatalogHeader({ filteredCount, catalogSort, setCatalogSort }: CatalogHeaderProps) {
  return (
    <div className="px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="font-semibold text-white">Каталог игр</h1>
        <p className="text-xs text-zinc-500 mt-0.5">{filteredCount} из {Object.keys(GAMES).length} игр</p>
      </div>
      <div className="flex items-center gap-2">
        <select
          value={catalogSort}
          onChange={(e) => setCatalogSort(e.target.value as CatalogSort)}
          className="bg-white/5 border border-white/10 rounded-lg text-sm text-zinc-300 px-3 py-1.5 focus:outline-none focus:border-violet-500/50 cursor-pointer"
        >
          <option value="userScore">★ Топ по оценкам игроков</option>
          <option value="rating">По рейтингу Metacritic</option>
          <option value="year">По году выхода</option>
          <option value="players">По числу игроков</option>
        </select>
      </div>
    </div>
  );
}
