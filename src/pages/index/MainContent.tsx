import { Tab, GAMES } from "./constants";
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
import { usePosts } from "./hooks/usePosts";
import { useReviews } from "./hooks/useReviews";
import { useCatalog } from "./hooks/useCatalog";
import { useGameNavigation } from "./hooks/useGameNavigation";
import { useNotifications } from "./hooks/useNotifications";

interface MainContentProps {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  postsBundle: ReturnType<typeof usePosts>;
  reviewsBundle: ReturnType<typeof useReviews>;
  catalogBundle: ReturnType<typeof useCatalog>;
  navigationBundle: ReturnType<typeof useGameNavigation>;
  notificationsBundle: ReturnType<typeof useNotifications>;
}

export function MainContent({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  postsBundle,
  reviewsBundle,
  catalogBundle,
  navigationBundle,
  notificationsBundle,
}: MainContentProps) {
  const { posts, filteredPosts, savedPosts, newPostText, setNewPostText, handleLike, handleRepost, handleSave, handlePublish } = postsBundle;
  const { reviews, reviewRating, setReviewRating, reviewHover, setReviewHover, reviewText, setReviewText, getGameReviews, getGameUserScore, topUserScoreGames, getMedal, submitReview, likeReview } = reviewsBundle;
  const { catalogGenres, setCatalogGenres, catalogPlatforms, setCatalogPlatforms, catalogSort, setCatalogSort, catalogSearch, setCatalogSearch, filteredGames, toggleSetItem, resetFilters } = catalogBundle;
  const { selectedGame, followedGames, gameSubTab, setGameSubTab, openGame, toggleFollowGame } = navigationBundle;
  const { notifications, unreadCount, markAllRead } = notificationsBundle;

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
