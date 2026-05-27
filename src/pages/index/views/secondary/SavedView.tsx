import Icon from "@/components/ui/icon";
import { Post, PostCard } from "../../constants";

interface SavedViewProps {
  savedPosts: Post[];
  openGame: (tag: string) => void;
  handleLike: (id: number) => void;
  handleRepost: (id: number, comment: string) => void;
  handleSave: (id: number) => void;
}

export function SavedView({ savedPosts, openGame, handleLike, handleRepost, handleSave }: SavedViewProps) {
  return (
    <div>
      <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5">
        <h1 className="font-semibold text-white">Сохранённое</h1>
      </div>
      {savedPosts.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <div className="w-16 h-16 bg-white/5 border border-white/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon name="Bookmark" size={28} className="text-zinc-500" />
          </div>
          <h2 className="font-medium text-white mb-1">Пока ничего нет</h2>
          <p className="text-sm text-zinc-500">Сохраняйте интересные посты — они будут здесь</p>
        </div>
      ) : (
        savedPosts.map((post) => (
          <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} onTagClick={openGame} />
        ))
      )}
    </div>
  );
}
