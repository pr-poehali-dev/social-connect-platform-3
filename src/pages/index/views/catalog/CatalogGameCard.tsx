import Icon from "@/components/ui/icon";
import { GameInfo } from "../../constants";

interface CatalogGameCardProps {
  game: GameInfo;
  isFollowed: boolean;
  gamePostCount: number;
  medal: { emoji: string; label: string; color: string } | null;
  userScore: string | null;
  openGame: (tag: string) => void;
}

export function CatalogGameCard({
  game,
  isFollowed,
  gamePostCount,
  medal,
  userScore,
  openGame,
}: CatalogGameCardProps) {
  const g = game;
  return (
    <button
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
            {userScore && (
              <span className="flex items-center gap-1 text-amber-400">
                <Icon name="Star" size={11} className="fill-current" />
                {userScore}
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
}
