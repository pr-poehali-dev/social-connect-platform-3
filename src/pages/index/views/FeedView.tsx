import { Post, Review, Tab, PostCard } from "../constants";
import { FeedHeader } from "./feed/FeedHeader";
import { NewPostComposer } from "./feed/NewPostComposer";
import { HallOfFame } from "./feed/HallOfFame";

interface FeedViewProps {
  setActiveTab: (t: Tab) => void;
  posts: Post[];
  newPostText: string;
  setNewPostText: (v: string) => void;
  reviews: Review[];
  topUserScoreGames: string[];
  getGameUserScore: (game: string) => string | null;
  getMedal: (title: string) => { emoji: string; label: string; color: string } | null;
  openGame: (tag: string) => void;
  handleLike: (id: number) => void;
  handleRepost: (id: number, comment: string) => void;
  handleSave: (id: number) => void;
  handlePublish: () => void;
}

export function FeedView({
  setActiveTab,
  posts,
  newPostText,
  setNewPostText,
  reviews,
  topUserScoreGames,
  getGameUserScore,
  getMedal,
  openGame,
  handleLike,
  handleRepost,
  handleSave,
  handlePublish,
}: FeedViewProps) {
  return (
    <div>
      <FeedHeader />

      <NewPostComposer
        newPostText={newPostText}
        setNewPostText={setNewPostText}
        handlePublish={handlePublish}
      />

      <HallOfFame
        setActiveTab={setActiveTab}
        reviews={reviews}
        topUserScoreGames={topUserScoreGames}
        getGameUserScore={getGameUserScore}
        getMedal={getMedal}
        openGame={openGame}
      />

      {posts.map((post) => (
        <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} onTagClick={openGame} />
      ))}
    </div>
  );
}
