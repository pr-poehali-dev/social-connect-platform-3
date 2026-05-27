import { GameInfo } from "../../constants";

export function GameCover({ game }: { game: GameInfo }) {
  return (
    <div className={`h-44 bg-gradient-to-br ${game.cover} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
      <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-zinc-300/70 mb-1">{game.genre}</div>
          <h2 className="text-3xl font-bold text-white tracking-tight">{game.title}</h2>
          <p className="text-sm text-zinc-300/80 mt-1">{game.studio} · {game.year}</p>
        </div>
      </div>
    </div>
  );
}
