import Icon from "@/components/ui/icon";
import { Post } from "../../types";

interface PostActionsProps {
  post: Post;
  onLike: (id: number) => void;
  onSave: (id: number) => void;
  onRepostClick: () => void;
}

export function PostActions({ post, onLike, onSave, onRepostClick }: PostActionsProps) {
  const likeCount = (post.likes + (post.liked ? 1 : 0)).toLocaleString("ru");
  const repostCount = (post.reposts + (post.reposted ? 1 : 0)).toLocaleString("ru");
  const commentCount = post.comments.toLocaleString("ru");

  return (
    <div className="flex items-center gap-5">
      <button
        onClick={() => onLike(post.id)}
        className={`flex items-center gap-1.5 text-xs transition-all duration-150 group ${
          post.liked ? "text-rose-400" : "text-zinc-500 hover:text-rose-400"
        }`}
      >
        <Icon name="Heart" size={15} className={post.liked ? "fill-current" : "group-hover:scale-110 transition-transform"} />
        <span>{likeCount}</span>
      </button>

      <button
        onClick={onRepostClick}
        className={`flex items-center gap-1.5 text-xs transition-colors duration-150 ${
          post.reposted ? "text-emerald-400" : "text-zinc-500 hover:text-emerald-400"
        }`}
      >
        <Icon name="Repeat2" size={15} />
        <span>{repostCount}</span>
      </button>

      <button className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-cyan-400 transition-colors duration-150">
        <Icon name="MessageCircle" size={15} />
        <span>{commentCount}</span>
      </button>

      <button
        onClick={() => onSave(post.id)}
        className={`flex items-center gap-1.5 text-xs ml-auto transition-colors duration-150 ${
          post.saved ? "text-amber-400" : "text-zinc-500 hover:text-amber-400"
        }`}
      >
        <Icon name="Bookmark" size={15} className={post.saved ? "fill-current" : ""} />
      </button>

      <button className="text-zinc-500 hover:text-zinc-300 transition-colors duration-150">
        <Icon name="Share" size={15} />
      </button>
    </div>
  );
}
