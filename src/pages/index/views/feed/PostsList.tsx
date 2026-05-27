import { Post, PostCard } from "../../constants";

interface PostsListProps {
  posts: Post[];
  openGame: (tag: string) => void;
  handleLike: (id: number) => void;
  handleRepost: (id: number, comment: string) => void;
  handleSave: (id: number) => void;
}

export function PostsList({ posts, openGame, handleLike, handleRepost, handleSave }: PostsListProps) {
  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={handleLike}
          onRepost={handleRepost}
          onSave={handleSave}
          onTagClick={openGame}
        />
      ))}
    </>
  );
}
