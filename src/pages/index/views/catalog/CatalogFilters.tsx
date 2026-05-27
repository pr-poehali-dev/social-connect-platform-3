import Icon from "@/components/ui/icon";
import { GAMES, ALL_GENRES, ALL_PLATFORMS } from "../../constants";

interface CatalogFiltersProps {
  filteredCount: number;
  catalogGenres: Set<string>;
  setCatalogGenres: (s: Set<string>) => void;
  catalogPlatforms: Set<string>;
  setCatalogPlatforms: (s: Set<string>) => void;
  catalogSort: "rating" | "userScore" | "year" | "players";
  setCatalogSort: (s: "rating" | "userScore" | "year" | "players") => void;
  catalogSearch: string;
  setCatalogSearch: (v: string) => void;
  toggleSetItem: (set: Set<string>, item: string, setter: (s: Set<string>) => void) => void;
  resetFilters: () => void;
}

export function CatalogFilters({
  filteredCount,
  catalogGenres,
  setCatalogGenres,
  catalogPlatforms,
  setCatalogPlatforms,
  catalogSort,
  setCatalogSort,
  catalogSearch,
  setCatalogSearch,
  toggleSetItem,
  resetFilters,
}: CatalogFiltersProps) {
  return (
    <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 border-b border-white/5">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-white">Каталог игр</h1>
          <p className="text-xs text-zinc-500 mt-0.5">{filteredCount} из {Object.keys(GAMES).length} игр</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={catalogSort}
            onChange={(e) => setCatalogSort(e.target.value as "rating" | "userScore" | "year" | "players")}
            className="bg-white/5 border border-white/10 rounded-lg text-sm text-zinc-300 px-3 py-1.5 focus:outline-none focus:border-violet-500/50 cursor-pointer"
          >
            <option value="userScore">★ Топ по оценкам игроков</option>
            <option value="rating">По рейтингу Metacritic</option>
            <option value="year">По году выхода</option>
            <option value="players">По числу игроков</option>
          </select>
        </div>
      </div>

      {/* Поиск */}
      <div className="px-6 pb-3">
        <div className="relative">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={catalogSearch}
            onChange={(e) => setCatalogSearch(e.target.value)}
            placeholder="Название игры или студия…"
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/8 rounded-lg text-sm focus:outline-none focus:border-violet-500/50 transition-colors text-zinc-100 placeholder:text-zinc-600"
          />
        </div>
      </div>

      {/* Фильтры по жанрам */}
      <div className="px-6 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mr-1">Жанры</span>
          {ALL_GENRES.map((g) => {
            const active = catalogGenres.has(g);
            return (
              <button
                key={g}
                onClick={() => toggleSetItem(catalogGenres, g, setCatalogGenres)}
                className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                  active
                    ? "bg-violet-600 border-violet-500 text-white"
                    : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* Фильтры по платформам */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mr-1">Платформы</span>
          {ALL_PLATFORMS.map((p) => {
            const active = catalogPlatforms.has(p);
            return (
              <button
                key={p}
                onClick={() => toggleSetItem(catalogPlatforms, p, setCatalogPlatforms)}
                className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                  active
                    ? "bg-cyan-600 border-cyan-500 text-white"
                    : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
                }`}
              >
                {p}
              </button>
            );
          })}
          {(catalogGenres.size > 0 || catalogPlatforms.size > 0 || catalogSearch) && (
            <button
              onClick={resetFilters}
              className="text-xs px-2.5 py-1 text-zinc-500 hover:text-rose-400 transition-colors ml-1"
            >
              × Сбросить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
