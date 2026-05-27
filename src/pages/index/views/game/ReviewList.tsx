import Icon from "@/components/ui/icon";
import { Review, GameInfo, InitialAvatar } from "../../constants";

interface ReviewListProps {
  game: GameInfo;
  reviews: Review[];
  likeReview: (id: number) => void;
}

export function ReviewList({ game, reviews, likeReview }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="px-6 py-16 text-center">
        <div className="w-16 h-16 bg-white/5 border border-white/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Icon name="Star" size={28} className="text-zinc-500" />
        </div>
        <h2 className="font-medium text-white mb-1">Пока без отзывов</h2>
        <p className="text-sm text-zinc-500">Будьте первым, кто оценит {game.title}</p>
      </div>
    );
  }

  return (
    <>
      {reviews.map((r) => (
        <article key={r.id} className="px-6 py-5 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
          <div className="flex gap-4">
            <InitialAvatar name={r.author} />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="font-semibold text-white text-sm">{r.author}</span>
                <span className="text-zinc-600 text-xs">·</span>
                <span className="text-zinc-500 text-xs">{r.time}</span>
                <div className="ml-auto flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 rounded-md px-2 py-0.5">
                  <Icon name="Star" size={11} className="text-amber-400 fill-current" />
                  <span className="text-amber-400 text-xs font-bold">{r.rating}/10</span>
                </div>
              </div>

              {/* Полоска оценки */}
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full ${
                      i < r.rating
                        ? r.rating >= 8
                          ? "bg-emerald-500"
                          : r.rating >= 5
                            ? "bg-amber-500"
                            : "bg-rose-500"
                        : "bg-white/8"
                    }`}
                  />
                ))}
              </div>

              <p className="text-zinc-200 text-sm leading-relaxed mb-3">{r.text}</p>

              <div className="flex items-center gap-5">
                <button
                  onClick={() => likeReview(r.id)}
                  className={`flex items-center gap-1.5 text-xs transition-colors ${
                    r.liked ? "text-rose-400" : "text-zinc-500 hover:text-rose-400"
                  }`}
                >
                  <Icon name="Heart" size={14} className={r.liked ? "fill-current" : ""} />
                  <span>{r.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-cyan-400 transition-colors">
                  <Icon name="MessageCircle" size={14} />
                  <span>Ответить</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
}
