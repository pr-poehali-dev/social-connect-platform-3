import Icon from "@/components/ui/icon";
import { Textarea } from "@/components/ui/textarea";
import { GameInfo } from "../../constants";

interface ReviewFormProps {
  game: GameInfo;
  selectedGame: string;
  reviewRating: number;
  setReviewRating: (n: number) => void;
  reviewHover: number;
  setReviewHover: (n: number) => void;
  reviewText: string;
  setReviewText: (v: string) => void;
  submitReview: (game: string) => void;
}

export function ReviewForm({
  game,
  selectedGame,
  reviewRating,
  setReviewRating,
  reviewHover,
  setReviewHover,
  reviewText,
  setReviewText,
  submitReview,
}: ReviewFormProps) {
  return (
    <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02]">
      <h3 className="text-sm font-semibold text-white mb-3">Оцените игру</h3>
      <div className="flex items-center gap-1 mb-3">
        {[1,2,3,4,5,6,7,8,9,10].map((n) => (
          <button
            key={n}
            onMouseEnter={() => setReviewHover(n)}
            onMouseLeave={() => setReviewHover(0)}
            onClick={() => setReviewRating(n)}
            className="transition-transform hover:scale-110"
          >
            <Icon
              name="Star"
              size={22}
              className={
                n <= (reviewHover || reviewRating)
                  ? "text-amber-400 fill-current"
                  : "text-zinc-700"
              }
            />
          </button>
        ))}
        {(reviewHover || reviewRating) > 0 && (
          <span className="ml-3 text-sm font-bold text-amber-400">{reviewHover || reviewRating}/10</span>
        )}
      </div>
      <Textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder={`Расскажите, что думаете о ${game.title}…`}
        className="resize-none bg-white/5 border-white/10 text-zinc-200 placeholder:text-zinc-600 focus:border-violet-500/50 mb-3 text-sm"
        rows={3}
      />
      <div className="flex justify-end">
        <button
          onClick={() => submitReview(selectedGame)}
          disabled={reviewRating === 0 || !reviewText.trim()}
          className="px-4 py-1.5 bg-violet-600 text-white text-sm rounded-lg disabled:opacity-30 hover:bg-violet-500 transition-colors font-medium"
        >
          Опубликовать отзыв
        </button>
      </div>
    </div>
  );
}
