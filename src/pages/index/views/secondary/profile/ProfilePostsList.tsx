import { Post, PostCard } from "../../../constants";

interface ProfilePostsListProps {
  posts: Post[];
  openGame: (tag: string) => void;
  handleLike: (id: number) => void;
  handleRepost: (id: number, comment: string) => void;
  handleSave: (id: number) => void;
}

export function ProfilePostsList({ posts, openGame, handleLike, handleRepost, handleSave }: ProfilePostsListProps) {
  const userPosts = posts.filter((p) => p.handle === "you");

  return (
    <div className="border-t border-white/5 pt-5">
      <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Ваши посты</h3>
      {userPosts.length === 0 ? (
        <p className="text-sm text-zinc-600">Вы ещё ничего не публиковали</p>
      ) : (
        userPosts.map((post) => (
          <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} onTagClick={openGame} />
        ))
      )}
    </div>
  );
}
