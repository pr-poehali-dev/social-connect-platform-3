import Icon from "@/components/ui/icon";
import { Post, Review, Tab, GAMES, PostCard } from "../constants";
import { GameHeader } from "./game/GameHeader";
import { ReviewForm } from "./game/ReviewForm";
import { ReviewList } from "./game/ReviewList";

interface GameViewProps {
  setActiveTab: (t: Tab) => void;
  posts: Post[];
  selectedGame: string;
  followedGames: Set<string>;
  reviewRating: number;
  setReviewRating: (n: number) => void;
  reviewHover: number;
  setReviewHover: (n: number) => void;
  reviewText: string;
  setReviewText: (v: string) => void;
  gameSubTab: "posts" | "reviews";
  setGameSubTab: (t: "posts" | "reviews") => void;
  getGameUserScore: (game: string) => string | null;
  getGameReviews: (game: string) => Review[];
  openGame: (tag: string) => void;
  toggleFollowGame: (tag: string) => void;
  handleLike: (id: number) => void;
  handleRepost: (id: number, comment: string) => void;
  handleSave: (id: number) => void;
  submitReview: (game: string) => void;
  likeReview: (id: number) => void;
}

export function GameView({
  setActiveTab,
  posts,
  selectedGame,
  followedGames,
  reviewRating,
  setReviewRating,
  reviewHover,
  setReviewHover,
  reviewText,
  setReviewText,
  gameSubTab,
  setGameSubTab,
  getGameUserScore,
  getGameReviews,
  openGame,
  toggleFollowGame,
  handleLike,
  handleRepost,
  handleSave,
  submitReview,
  likeReview,
}: GameViewProps) {
  const game = GAMES[selectedGame];
  const gamePosts = posts.filter((p) => p.tag === selectedGame);
  const isFollowed = followedGames.has(selectedGame);

  return (
    <div>
      <GameHeader
        setActiveTab={setActiveTab}
        game={game}
        gamePosts={gamePosts}
        isFollowed={isFollowed}
        selectedGame={selectedGame}
        gameSubTab={gameSubTab}
        setGameSubTab={setGameSubTab}
        getGameUserScore={getGameUserScore}
        getGameReviews={getGameReviews}
        toggleFollowGame={toggleFollowGame}
      />

      {gameSubTab === "posts" && (
        gamePosts.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="w-16 h-16 bg-white/5 border border-white/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Gamepad2" size={28} className="text-zinc-500" />
            </div>
            <h2 className="font-medium text-white mb-1">Пока тихо</h2>
            <p className="text-sm text-zinc-500">Будь первым, кто напишет про {game.title}</p>
          </div>
        ) : (
          gamePosts.map((post) => (
            <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} onTagClick={openGame} />
          ))
        )
      )}

      {gameSubTab === "reviews" && (
        <div>
          <ReviewForm
            game={game}
            selectedGame={selectedGame}
            reviewRating={reviewRating}
            setReviewRating={setReviewRating}
            reviewHover={reviewHover}
            setReviewHover={setReviewHover}
            reviewText={reviewText}
            setReviewText={setReviewText}
            submitReview={submitReview}
          />
          <ReviewList
            game={game}
            reviews={getGameReviews(selectedGame)}
            likeReview={likeReview}
          />
        </div>
      )}
    </div>
  );
}
