import { Post, Review } from "../../constants";

interface GameTabsProps {
  selectedGame: string;
  gamePosts: Post[];
  gameSubTab: "posts" | "reviews";
  setGameSubTab: (t: "posts" | "reviews") => void;
  getGameReviews: (game: string) => Review[];
}

export function GameTabs({ selectedGame, gamePosts, gameSubTab, setGameSubTab, getGameReviews }: GameTabsProps) {
  return (
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
  );
}
