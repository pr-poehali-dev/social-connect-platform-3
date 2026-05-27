import Icon from "@/components/ui/icon";
import { Post, Review, GAMES, ALL_GENRES, ALL_PLATFORMS, GameInfo } from "../constants";

interface CatalogViewProps {
  posts: Post[];
  reviews: Review[];
  followedGames: Set<string>;
  catalogGenres: Set<string>;
  setCatalogGenres: (s: Set<string>) => void;
  catalogPlatforms: Set<string>;
  setCatalogPlatforms: (s: Set<string>) => void;
  catalogSort: "rating" | "userScore" | "year" | "players";
  setCatalogSort: (s: "rating" | "userScore" | "year" | "players") => void;
  catalogSearch: string;
  setCatalogSearch: (v: string) => void;
  filteredGames: GameInfo[];
  getGameUserScore: (game: string) => string | null;
  getMedal: (title: string) => { emoji: string; label: string; color: string } | null;
  openGame: (tag: string) => void;
  toggleSetItem: (set: Set<string>, item: string, setter: (s: Set<string>) => void) => void;
  resetFilters: () => void;
}

export function CatalogView({
  posts,
  followedGames,
  catalogGenres,
  setCatalogGenres,
  catalogPlatforms,
  setCatalogPlatforms,
  catalogSort,
  setCatalogSort,
  catalogSearch,
  setCatalogSearch,
  filteredGames,
  getGameUserScore,
  getMedal,
  openGame,
  toggleSetItem,
  resetFilters,
}: CatalogViewProps) {
  return (
    <div>
      <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 border-b border-white/5">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-white">Каталог игр</h1>
            <p className="text-xs text-zinc-500 mt-0.5">{filteredGames.length} из {Object.keys(GAMES).length} игр</p>
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

      {/* Сетка игр */}
      {filteredGames.length === 0 ? (
        <div className="px-6 py-20 text-center">
          <div className="w-16 h-16 bg-white/5 border border-white/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon name="SearchX" size={28} className="text-zinc-500" />
          </div>
          <h2 className="font-medium text-white mb-1">Ничего не найдено</h2>
          <p className="text-sm text-zinc-500 mb-4">Попробуйте изменить фильтры</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-500 transition-colors"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredGames.map((g) => {
            const isFollowed = followedGames.has(g.title);
            const gamePostCount = posts.filter((p) => p.tag === g.title).length;
            const medal = getMedal(g.title);
            return (
              <button
                key={g.title}
                onClick={() => openGame(g.title)}
                className={`group text-left bg-white/[0.02] border rounded-2xl overflow-hidden transition-all relative ${
                  medal
                    ? "border-amber-500/30 hover:border-amber-400/60 hover:bg-white/[0.04] shadow-[0_0_24px_-12px_rgba(245,158,11,0.35)]"
                    : "border-white/8 hover:border-violet-500/40 hover:bg-white/[0.04]"
                }`}
              >
                <div className={`h-32 bg-gradient-to-br ${g.cover} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.06),transparent_50%)]" />
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/40 backdrop-blur-sm rounded-md text-xs font-bold text-white border border-white/10">
                    {g.rating}
                  </div>
                  {medal && (
                    <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r ${medal.color} backdrop-blur-sm rounded-md text-[10px] font-bold text-white border shadow-lg`}>
                      <span className="text-sm leading-none">{medal.emoji}</span>
                      <span>{medal.label}</span>
                    </div>
                  )}
                  {isFollowed && !medal && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-violet-600/90 backdrop-blur-sm rounded-md text-[10px] font-medium text-white">
                      Отслеживается
                    </div>
                  )}
                  {isFollowed && medal && (
                    <div className="absolute bottom-3 right-3 w-5 h-5 bg-violet-600/90 backdrop-blur-sm rounded-md flex items-center justify-center">
                      <Icon name="Check" size={12} className="text-white" />
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-bold text-white tracking-tight truncate group-hover:text-violet-200 transition-colors">
                      {g.title}
                    </h3>
                    <p className="text-xs text-zinc-300/80 truncate">{g.studio} · {g.year}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {g.genres.slice(0, 3).map((gn) => (
                      <span key={gn} className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20">
                        {gn}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-3 line-clamp-2">{g.description}</p>
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <div className="flex items-center gap-3">
                      {getGameUserScore(g.title) && (
                        <span className="flex items-center gap-1 text-amber-400">
                          <Icon name="Star" size={11} className="fill-current" />
                          {getGameUserScore(g.title)}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Icon name="Users" size={11} />
                        {g.players.split(" ")[0]}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="MessageCircle" size={11} />
                        {gamePostCount}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {g.platforms.slice(0, 3).map((p) => (
                        <span key={p} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
