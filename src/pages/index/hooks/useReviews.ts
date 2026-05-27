import { useState } from "react";
import { Review } from "../types";
import { INITIAL_REVIEWS } from "../data/reviews";
import { GAMES } from "../data/games";

function computeTop3(list: Review[]): string[] {
  return Object.values(GAMES)
    .map((g) => {
      const arr = list.filter((r) => r.game === g.title);
      const avg = arr.length ? arr.reduce((s, r) => s + r.rating, 0) / arr.length : 0;
      return { title: g.title, avg, count: arr.length };
    })
    .filter((g) => g.count > 0)
    .sort((a, b) => (b.avg !== a.avg ? b.avg - a.avg : b.count - a.count))
    .slice(0, 3)
    .map((g) => g.title);
}

export interface AchievementEvent {
  medal: "🥇" | "🥈" | "🥉";
  game: string;
  place: number;
  isNew: boolean;
}

export function useReviews(onAchievement: (e: AchievementEvent) => void) {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHover, setReviewHover] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const getGameReviews = (game: string) => reviews.filter((r) => r.game === game);

  const getGameUserScore = (game: string) => {
    const list = getGameReviews(game);
    if (list.length === 0) return null;
    return (list.reduce((a, r) => a + r.rating, 0) / list.length).toFixed(1);
  };

  const submitReview = (game: string) => {
    if (reviewRating === 0 || !reviewText.trim()) return;
    const newReview: Review = {
      id: Date.now(),
      game,
      author: "Вы",
      rating: reviewRating,
      text: reviewText.trim(),
      time: "только что",
      likes: 0,
    };

    const before = computeTop3(reviews);
    const after = computeTop3([newReview, ...reviews]);

    setReviews((prev) => [newReview, ...prev]);
    setReviewRating(0);
    setReviewText("");
    setReviewHover(0);

    const beforeIdx = before.indexOf(game);
    const afterIdx = after.indexOf(game);

    if (afterIdx !== -1 && (beforeIdx === -1 || afterIdx < beforeIdx)) {
      const medals: Array<"🥇" | "🥈" | "🥉"> = ["🥇", "🥈", "🥉"];
      const place = afterIdx + 1;
      onAchievement({ medal: medals[afterIdx], game, place, isNew: beforeIdx === -1 });
    }
  };

  const likeReview = (id: number) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 } : r
      )
    );
  };

  const topUserScoreGames = computeTop3(reviews);

  const getMedal = (title: string): { emoji: string; label: string; color: string } | null => {
    const idx = topUserScoreGames.indexOf(title);
    if (idx === 0) return { emoji: "🥇", label: "#1 по оценкам", color: "from-amber-500/90 to-yellow-600/90 border-amber-400/50" };
    if (idx === 1) return { emoji: "🥈", label: "#2 по оценкам", color: "from-zinc-300/90 to-zinc-500/90 border-zinc-300/50" };
    if (idx === 2) return { emoji: "🥉", label: "#3 по оценкам", color: "from-orange-600/90 to-amber-800/90 border-orange-500/50" };
    return null;
  };

  return {
    reviews,
    reviewRating,
    setReviewRating,
    reviewHover,
    setReviewHover,
    reviewText,
    setReviewText,
    getGameReviews,
    getGameUserScore,
    submitReview,
    likeReview,
    topUserScoreGames,
    getMedal,
  };
}
