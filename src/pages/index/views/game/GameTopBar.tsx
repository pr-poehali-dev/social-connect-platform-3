import Icon from "@/components/ui/icon";
import { Tab, GameInfo, Post } from "../../constants";

interface GameTopBarProps {
  setActiveTab: (t: Tab) => void;
  game: GameInfo;
  gamePosts: Post[];
}

export function GameTopBar({ setActiveTab, game, gamePosts }: GameTopBarProps) {
  return (
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
  );
}
