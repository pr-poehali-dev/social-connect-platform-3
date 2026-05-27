import { GAMES } from "../data/games";

export function TagBadge({ tag, onClick }: { tag: string; onClick?: () => void }) {
  const isGame = !!GAMES[tag];
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      disabled={!isGame || !onClick}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-2 ${
        isGame && onClick ? "hover:bg-violet-500/20 hover:border-violet-500/40 cursor-pointer transition-colors" : ""
      }`}
    >
      {isGame && <span className="text-[10px]">🎮</span>}
      {tag}
    </button>
  );
}
