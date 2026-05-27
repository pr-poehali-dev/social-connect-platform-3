import { Post, Notification, Review, Tab, GAMES, GameInfo } from "./constants";
import { FeedView } from "./views/FeedView";
import {
  SearchView,
  NotificationsView,
  MessagesView,
  SavedView,
  TrendsView,
  ProfileView,
} from "./views/SecondaryViews";
import { CatalogView } from "./views/CatalogView";
import { GameView } from "./views/GameView";

interface MainContentProps {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
  posts: Post[];
  filteredPosts: Post[];
  savedPosts: Post[];
  newPostText: string;
  setNewPostText: (v: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  notifications: Notification[];
  unreadCount: number;
  selectedGame: string | null;
  followedGames: Set<string>;
  catalogGenres: Set<string>;
  setCatalogGenres: (s: Set<string>) => void;
  catalogPlatforms: Set<string>;
  setCatalogPlatforms: (s: Set<string>) => void;
  catalogSort: "rating" | "userScore" | "year" | "players";
  setCatalogSort: (s: "rating" | "userScore" | "year" | "players") => void;
  catalogSearch: string;
  setCatalogSearch: (v: string) => void;
  reviews: Review[];
  reviewRating: number;
  setReviewRating: (n: number) => void;
  reviewHover: number;
  setReviewHover: (n: number) => void;
  reviewText: string;
  setReviewText: (v: string) => void;
  gameSubTab: "posts" | "reviews";
  setGameSubTab: (t: "posts" | "reviews") => void;
  filteredGames: GameInfo[];
  getGameUserScore: (game: string) => string | null;
  getGameReviews: (game: string) => Review[];
  topUserScoreGames: string[];
  getMedal: (title: string) => { emoji: string; label: string; color: string } | null;
  openGame: (tag: string) => void;
  toggleFollowGame: (tag: string) => void;
  toggleSetItem: (set: Set<string>, item: string, setter: (s: Set<string>) => void) => void;
  resetFilters: () => void;
  handleLike: (id: number) => void;
  handleRepost: (id: number, comment: string) => void;
  handleSave: (id: number) => void;
  handlePublish: () => void;
  markAllRead: () => void;
  submitReview: (game: string) => void;
  likeReview: (id: number) => void;
}

export function MainContent(props: MainContentProps) {
  const {
    activeTab,
    setActiveTab,
    posts,
    filteredPosts,
    savedPosts,
    newPostText,
    setNewPostText,
    searchQuery,
    setSearchQuery,
    notifications,
    unreadCount,
    selectedGame,
    followedGames,
    catalogGenres,
    setCatalogGenres,
    catalogPlatforms,
    setCatalogPlatforms,
    catalogSort,
    setCatalogSort,
    catalogSearch,
    setCatalogSearch,
    reviews,
    reviewRating,
    setReviewRating,
    reviewHover,
    setReviewHover,
    reviewText,
    setReviewText,
    gameSubTab,
    setGameSubTab,
    filteredGames,
    getGameUserScore,
    getGameReviews,
    topUserScoreGames,
    getMedal,
    openGame,
    toggleFollowGame,
    toggleSetItem,
    resetFilters,
    handleLike,
    handleRepost,
    handleSave,
    handlePublish,
    markAllRead,
    submitReview,
    likeReview,
  } = props;

  return (
    <main className="flex-1 min-w-0 border-r border-white/5">

      {/* Лента */}
      {activeTab === "feed" && (
        <FeedView
          setActiveTab={setActiveTab}
          posts={posts}
          newPostText={newPostText}
          setNewPostText={setNewPostText}
          reviews={reviews}
          topUserScoreGames={topUserScoreGames}
          getGameUserScore={getGameUserScore}
          getMedal={getMedal}
          openGame={openGame}
          handleLike={handleLike}
          handleRepost={handleRepost}
          handleSave={handleSave}
          handlePublish={handlePublish}
        />
      )}

      {/* Поиск */}
      {activeTab === "search" && (
        <SearchView
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredPosts={filteredPosts}
          openGame={openGame}
          handleLike={handleLike}
          handleRepost={handleRepost}
          handleSave={handleSave}
        />
      )}

      {/* Уведомления */}
      {activeTab === "notifications" && (
        <NotificationsView
          notifications={notifications}
          unreadCount={unreadCount}
          markAllRead={markAllRead}
          openGame={openGame}
        />
      )}

      {/* Сообщения */}
      {activeTab === "messages" && <MessagesView />}

      {/* Сохранённое */}
      {activeTab === "saved" && (
        <SavedView
          savedPosts={savedPosts}
          openGame={openGame}
          handleLike={handleLike}
          handleRepost={handleRepost}
          handleSave={handleSave}
        />
      )}

      {/* Тренды */}
      {activeTab === "trends" && (
        <TrendsView setSearchQuery={setSearchQuery} setActiveTab={setActiveTab} />
      )}

      {/* Профиль */}
      {activeTab === "profile" && (
        <ProfileView
          posts={posts}
          openGame={openGame}
          handleLike={handleLike}
          handleRepost={handleRepost}
          handleSave={handleSave}
        />
      )}

      {/* Каталог игр */}
      {activeTab === "catalog" && (
        <CatalogView
          posts={posts}
          reviews={reviews}
          followedGames={followedGames}
          catalogGenres={catalogGenres}
          setCatalogGenres={setCatalogGenres}
          catalogPlatforms={catalogPlatforms}
          setCatalogPlatforms={setCatalogPlatforms}
          catalogSort={catalogSort}
          setCatalogSort={setCatalogSort}
          catalogSearch={catalogSearch}
          setCatalogSearch={setCatalogSearch}
          filteredGames={filteredGames}
          getGameUserScore={getGameUserScore}
          getMedal={getMedal}
          openGame={openGame}
          toggleSetItem={toggleSetItem}
          resetFilters={resetFilters}
        />
      )}

      {/* Страница игры */}
      {activeTab === "game" && selectedGame && GAMES[selectedGame] && (
        <GameView
          setActiveTab={setActiveTab}
          posts={posts}
          selectedGame={selectedGame}
          followedGames={followedGames}
          reviewRating={reviewRating}
          setReviewRating={setReviewRating}
          reviewHover={reviewHover}
          setReviewHover={setReviewHover}
          reviewText={reviewText}
          setReviewText={setReviewText}
          gameSubTab={gameSubTab}
          setGameSubTab={setGameSubTab}
          getGameUserScore={getGameUserScore}
          getGameReviews={getGameReviews}
          openGame={openGame}
          toggleFollowGame={toggleFollowGame}
          handleLike={handleLike}
          handleRepost={handleRepost}
          handleSave={handleSave}
          submitReview={submitReview}
          likeReview={likeReview}
        />
      )}
    </main>
  );
}
