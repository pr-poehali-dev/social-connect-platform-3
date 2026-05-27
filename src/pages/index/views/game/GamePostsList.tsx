import Icon from "@/components/ui/icon";
import { Post, GameInfo, PostCard } from "../../constants";

interface GamePostsListProps {
  game: GameInfo;
  gamePosts: Post[];
  openGame: (tag: string) => void;
  handleLike: (id: number) => void;
  handleRepost: (id: number, comment: string) => void;
  handleSave: (id: number) => void;
}

export function GamePostsList({ game, gamePosts, openGame, handleLike, handleRepost, handleSave }: GamePostsListProps) {
  if (gamePosts.length === 0) {
    return (
      <div className="px-6 py-16 text-center">
        <div className="w-16 h-16 bg-white/5 border border-white/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Icon name="Gamepad2" size={28} className="text-zinc-500" />
        </div>
        <h2 className="font-medium text-white mb-1">Пока тихо</h2>
        <p className="text-sm text-zinc-500">Будь первым, кто напишет про {game.title}</p>
      </div>
    );
  }

  return (
    <>
      {gamePosts.map((post) => (
        <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} onTagClick={openGame} />
      ))}
    </>
  );
}
