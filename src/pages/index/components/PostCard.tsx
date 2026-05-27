import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Textarea } from "@/components/ui/textarea";
import { Post } from "../types";
import { InitialAvatar } from "./InitialAvatar";
import { TagBadge } from "./TagBadge";

export function PostCard({
  post,
  onLike,
  onRepost,
  onSave,
  onTagClick,
}: {
  post: Post;
  onLike: (id: number) => void;
  onRepost: (id: number, comment: string) => void;
  onSave: (id: number) => void;
  onTagClick?: (tag: string) => void;
}) {
  const [showRepostModal, setShowRepostModal] = useState(false);
  const [repostComment, setRepostComment] = useState("");

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
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="font-semibold text-white text-sm">{post.author}</span>
            <span className="text-zinc-500 text-xs">@{post.handle}</span>
            <span className="text-zinc-600 text-xs ml-auto flex-shrink-0">{post.time}</span>
          </div>

          {post.tag && <TagBadge tag={post.tag} onClick={onTagClick ? () => onTagClick(post.tag!) : undefined} />}

          {post.repostOf && (
            <div className="border border-white/8 rounded-xl p-3 mb-3 bg-white/[0.03]">
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="font-medium text-zinc-300 text-xs">{post.repostOf.author}</span>
                <span className="text-zinc-500 text-xs">@{post.repostOf.handle}</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">{post.repostOf.text}</p>
            </div>
          )}

          <p className="text-zinc-200 text-sm leading-relaxed mb-4">{post.text}</p>

          <div className="flex items-center gap-5">
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center gap-1.5 text-xs transition-all duration-150 group ${
                post.liked ? "text-rose-400" : "text-zinc-500 hover:text-rose-400"
              }`}
            >
              <Icon name="Heart" size={15} className={post.liked ? "fill-current" : "group-hover:scale-110 transition-transform"} />
              <span>{(post.likes + (post.liked ? 1 : 0)).toLocaleString("ru")}</span>
            </button>

            <button
              onClick={() => setShowRepostModal(true)}
              className={`flex items-center gap-1.5 text-xs transition-colors duration-150 ${
                post.reposted ? "text-emerald-400" : "text-zinc-500 hover:text-emerald-400"
              }`}
            >
              <Icon name="Repeat2" size={15} />
              <span>{(post.reposts + (post.reposted ? 1 : 0)).toLocaleString("ru")}</span>
            </button>

            <button className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-cyan-400 transition-colors duration-150">
              <Icon name="MessageCircle" size={15} />
              <span>{post.comments.toLocaleString("ru")}</span>
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
        </div>
      </div>

      {showRepostModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowRepostModal(false)}
        >
          <div
            className="bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-semibold text-white mb-4">Поделиться постом</h3>
            <div className="border border-white/8 rounded-xl p-4 mb-4 bg-white/[0.03]">
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="font-medium text-zinc-300 text-xs">{post.author}</span>
                <span className="text-zinc-500 text-xs">@{post.handle}</span>
              </div>
              <p className="text-zinc-400 text-sm">{post.text.slice(0, 120)}{post.text.length > 120 ? "…" : ""}</p>
            </div>
            <Textarea
              value={repostComment}
              onChange={(e) => setRepostComment(e.target.value)}
              placeholder="Добавьте комментарий (необязательно)…"
              className="resize-none bg-white/5 border-white/10 text-zinc-200 placeholder:text-zinc-600 focus:border-violet-500/50 mb-4 text-sm"
              rows={3}
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowRepostModal(false)}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  onRepost(post.id, repostComment);
                  setShowRepostModal(false);
                  setRepostComment("");
                }}
                className="px-4 py-2 text-sm bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition-colors"
              >
                Поделиться
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
