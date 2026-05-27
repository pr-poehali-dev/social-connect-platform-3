import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Post } from "../types";
import { InitialAvatar } from "./InitialAvatar";
import { TagBadge } from "./TagBadge";
import { PostAuthor } from "./post/PostAuthor";
import { RepostQuote } from "./post/RepostQuote";
import { PostActions } from "./post/PostActions";
import { RepostModal } from "./post/RepostModal";

interface PostCardProps {
  post: Post;
  onLike: (id: number) => void;
  onRepost: (id: number, comment: string) => void;
  onSave: (id: number) => void;
  onTagClick?: (tag: string) => void;
}

export function PostCard({ post, onLike, onRepost, onSave, onTagClick }: PostCardProps) {
  const [showRepostModal, setShowRepostModal] = useState(false);

  return (
    <article className="border-b border-white/5 px-6 py-5 hover:bg-white/[0.02] transition-colors duration-150">
      {post.repostOf && (
        <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-3 ml-14">
          <Icon name="Repeat2" size={12} />
          <span>{post.author} поделился</span>
        </div>
      )}
      <div className="flex gap-4">
        <InitialAvatar name={post.author} />
        <div className="flex-1 min-w-0">
          <PostAuthor author={post.author} handle={post.handle} time={post.time} />

          {post.tag && <TagBadge tag={post.tag} onClick={onTagClick ? () => onTagClick(post.tag!) : undefined} />}

          {post.repostOf && (
            <RepostQuote
              author={post.repostOf.author}
              handle={post.repostOf.handle}
              text={post.repostOf.text}
            />
          )}

          <p className="text-zinc-200 text-sm leading-relaxed mb-4">{post.text}</p>

          <PostActions
            post={post}
            onLike={onLike}
            onSave={onSave}
            onRepostClick={() => setShowRepostModal(true)}
          />
        </div>
      </div>

      {showRepostModal && (
        <RepostModal
          post={post}
          onClose={() => setShowRepostModal(false)}
          onSubmit={(comment) => {
            onRepost(post.id, comment);
            setShowRepostModal(false);
          }}
        />
      )}
    </article>
  );
}
