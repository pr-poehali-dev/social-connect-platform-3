import Icon from "@/components/ui/icon";
import { Review, Tab, GAMES } from "../../constants";

interface HallOfFameProps {
  setActiveTab: (t: Tab) => void;
  reviews: Review[];
  topUserScoreGames: string[];
  getGameUserScore: (game: string) => string | null;
  getMedal: (title: string) => { emoji: string; label: string; color: string } | null;
  openGame: (tag: string) => void;
}

export function HallOfFame({
  setActiveTab,
  reviews,
  topUserScoreGames,
  getGameUserScore,
  getMedal,
  openGame,
}: HallOfFameProps) {
  if (topUserScoreGames.length === 0) return null;
  return (
    <div className="border-b border-white/5 bg-gradient-to-b from-amber-500/[0.04] to-transparent">
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Icon name="Trophy" size={15} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Зал славы</h2>
              <p className="text-[10px] text-zinc-500">Топ-3 по оценкам игроков</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab("catalog")}
            className="text-xs text-amber-400/80 hover:text-amber-300 transition-colors"
          >
            Весь каталог →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {topUserScoreGames.map((title) => {
            const g = GAMES[title];
            if (!g) return null;
            const medal = getMedal(title);
            const score = getGameUserScore(title);
            const reviewCount = reviews.filter((r) => r.game === title).length;
            return (
              <button
                key={title}
                onClick={() => openGame(title)}
                className="group text-left bg-white/[0.03] border border-amber-500/20 rounded-xl overflow-hidden hover:border-amber-400/50 hover:bg-white/[0.05] transition-all"
              >
                <div className={`h-20 bg-gradient-to-br ${g.cover} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_50%)]" />
                  {medal && (
                    <div className="absolute top-2 left-2 text-2xl drop-shadow-lg">{medal.emoji}</div>
                  )}
                  <div className="absolute bottom-1.5 right-2 flex items-center gap-0.5 bg-black/50 backdrop-blur-sm rounded-md px-1.5 py-0.5 border border-white/10">
                    <Icon name="Star" size={10} className="text-amber-400 fill-current" />
                    <span className="text-[11px] font-bold text-amber-400">{score}</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-xs font-bold text-white truncate group-hover:text-amber-200 transition-colors">
                    {g.title}
                  </h3>
                  <p className="text-[10px] text-zinc-500 truncate">{g.studio} · {reviewCount} отзыв.</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
