import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Post } from "../../types";

interface RepostModalProps {
  post: Post;
  onClose: () => void;
  onSubmit: (comment: string) => void;
}

export function RepostModal({ post, onClose, onSubmit }: RepostModalProps) {
  const [comment, setComment] = useState("");

  const preview = post.text.slice(0, 120) + (post.text.length > 120 ? "…" : "");

  const handleSubmit = () => {
    onSubmit(comment);
    setComment("");
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
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
          <p className="text-zinc-400 text-sm">{preview}</p>
        </div>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Добавьте комментарий (необязательно)…"
          className="resize-none bg-white/5 border-white/10 text-zinc-200 placeholder:text-zinc-600 focus:border-violet-500/50 mb-4 text-sm"
          rows={3}
        />
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition-colors"
          >
            Поделиться
          </button>
        </div>
      </div>
    </div>
  );
}
