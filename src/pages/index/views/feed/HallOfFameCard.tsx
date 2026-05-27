import Icon from "@/components/ui/icon";
import { GameInfo } from "../../constants";

interface HallOfFameCardProps {
  game: GameInfo;
  medal: { emoji: string; label: string; color: string } | null;
  score: string | null;
  reviewCount: number;
  openGame: (tag: string) => void;
}

export function HallOfFameCard({ game, medal, score, reviewCount, openGame }: HallOfFameCardProps) {
  return (
    <button
      onClick={() => openGame(game.title)}
      className="group text-left bg-white/[0.03] border border-amber-500/20 rounded-xl overflow-hidden hover:border-amber-400/50 hover:bg-white/[0.05] transition-all"
    >
      <div className={`h-20 bg-gradient-to-br ${game.cover} relative overflow-hidden`}>
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
          {game.title}
        </h3>
        <p className="text-[10px] text-zinc-500 truncate">{game.studio} · {reviewCount} отзыв.</p>
      </div>
    </button>
  );
}
