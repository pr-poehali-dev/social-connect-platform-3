import { Post, Review, Tab, GAMES } from "../constants";
import { GameHeader } from "./game/GameHeader";
import { GamePostsList } from "./game/GamePostsList";
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
        <GamePostsList
          game={game}
          gamePosts={gamePosts}
          openGame={openGame}
          handleLike={handleLike}
          handleRepost={handleRepost}
          handleSave={handleSave}
        />
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
