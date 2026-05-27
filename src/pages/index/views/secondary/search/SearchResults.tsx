import { Post, PostCard } from "../../../constants";
import { EmptyState } from "../shared/EmptyState";

interface SearchResultsProps {
  searchQuery: string;
  filteredPosts: Post[];
  openGame: (tag: string) => void;
  handleLike: (id: number) => void;
  handleRepost: (id: number, comment: string) => void;
  handleSave: (id: number) => void;
}

export function SearchResults({
  searchQuery,
  filteredPosts,
  openGame,
  handleLike,
  handleRepost,
  handleSave,
}: SearchResultsProps) {
  return (
    <div>
      <div className="px-6 py-3 border-b border-white/5">
        <span className="text-xs text-zinc-500">
          По запросу «{searchQuery}»: {filteredPosts.length}
        </span>
      </div>
      {filteredPosts.length === 0 ? (
        <EmptyState icon="SearchX" title="" description="Ничего не найдено" compact />
      ) : (
        filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} onTagClick={openGame} />
        ))
      )}
    </div>
  );
}
