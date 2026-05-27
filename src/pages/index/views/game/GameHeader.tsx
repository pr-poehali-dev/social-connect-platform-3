import Icon from "@/components/ui/icon";
import { Post, Review, Tab, GameInfo } from "../../constants";

interface GameHeaderProps {
  setActiveTab: (t: Tab) => void;
  game: GameInfo;
  gamePosts: Post[];
  isFollowed: boolean;
  selectedGame: string;
  gameSubTab: "posts" | "reviews";
  setGameSubTab: (t: "posts" | "reviews") => void;
  getGameUserScore: (game: string) => string | null;
  getGameReviews: (game: string) => Review[];
  toggleFollowGame: (tag: string) => void;
}

export function GameHeader({
  setActiveTab,
  game,
  gamePosts,
  isFollowed,
  selectedGame,
  gameSubTab,
  setGameSubTab,
  getGameUserScore,
  getGameReviews,
  toggleFollowGame,
}: GameHeaderProps) {
  return (
    <>
      <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5 flex items-center gap-3">
        <button
          onClick={() => setActiveTab("feed")}
          className="text-zinc-400 hover:text-white transition-colors"
        >
          <Icon name="ArrowLeft" size={18} />
        </button>
        <div>
          <h1 className="font-semibold text-white">{game.title}</h1>
          <p className="text-xs text-zinc-500">{gamePosts.length} постов</p>
        </div>
      </div>

      {/* Обложка */}
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

      {/* Табы внутри игры */}
      <div className="flex border-b border-white/5 px-6">
        <button
          onClick={() => setGameSubTab("posts")}
          className={`px-4 py-3 text-sm font-medium transition-colors ${
            gameSubTab === "posts" ? "text-white border-b-2 border-violet-500" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Посты <span className="text-zinc-600 ml-1">{gamePosts.length}</span>
        </button>
        <button
          onClick={() => setGameSubTab("reviews")}
          className={`px-4 py-3 text-sm font-medium transition-colors ${
            gameSubTab === "reviews" ? "text-white border-b-2 border-violet-500" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Отзывы <span className="text-zinc-600 ml-1">{getGameReviews(selectedGame).length}</span>
        </button>
      </div>
    </>
  );
}
