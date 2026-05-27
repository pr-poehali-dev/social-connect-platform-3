import Icon from "@/components/ui/icon";
import { GameInfo, Post, Review } from "../../constants";

interface GameStatsProps {
  game: GameInfo;
  selectedGame: string;
  gamePosts: Post[];
  isFollowed: boolean;
  getGameUserScore: (game: string) => string | null;
  getGameReviews: (game: string) => Review[];
  toggleFollowGame: (tag: string) => void;
}

export function GameStats({
  game,
  selectedGame,
  gamePosts,
  isFollowed,
  getGameUserScore,
  getGameReviews,
  toggleFollowGame,
}: GameStatsProps) {
  return (
    <div className="px-6 py-5 border-b border-white/5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-6">
          <div>
            <div className="text-2xl font-bold text-white">{game.rating}<span className="text-sm text-zinc-500">/100</span></div>
            <div className="text-xs text-zinc-500 mt-0.5">Metacritic</div>
          </div>
          <div className="border-l border-white/10 pl-6">
            <div className="text-2xl font-bold text-amber-400 flex items-center gap-1">
              {getGameUserScore(selectedGame) || "—"}
              {getGameUserScore(selectedGame) && <Icon name="Star" size={16} className="fill-current" />}
            </div>
            <div className="text-xs text-zinc-500 mt-0.5">Оценка игроков · {getGameReviews(selectedGame).length}</div>
          </div>
          <div className="border-l border-white/10 pl-6">
            <div className="text-2xl font-bold text-white">{gamePosts.length}</div>
            <div className="text-xs text-zinc-500 mt-0.5">постов</div>
          </div>
        </div>
        <button
          onClick={() => toggleFollowGame(selectedGame)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isFollowed
              ? "bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10"
              : "bg-violet-600 text-white hover:bg-violet-500"
          }`}
        >
          {isFollowed ? "Отслеживается" : "Отслеживать"}
        </button>
      </div>
      <p className="text-sm text-zinc-400 leading-relaxed">{game.description}</p>
    </div>
  );
}
