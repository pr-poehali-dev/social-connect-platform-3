import { Post, PostCard } from "../../constants";
import { StickyHeader } from "./shared/StickyHeader";
import { EmptyState } from "./shared/EmptyState";

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
      <StickyHeader title="Сохранённое" />
      {savedPosts.length === 0 ? (
        <EmptyState
          icon="Bookmark"
          title="Пока ничего нет"
          description="Сохраняйте интересные посты — они будут здесь"
        />
      ) : (
        savedPosts.map((post) => (
          <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} onTagClick={openGame} />
        ))
      )}
    </div>
  );
}
