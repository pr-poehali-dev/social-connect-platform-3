import { useState } from "react";
import { Tab } from "./index/constants";
import { LeftSidebar, RightSidebar } from "./index/Sidebar";
import { MainContent } from "./index/MainContent";
import { AchievementToast } from "./index/AchievementToast";
import { usePosts } from "./index/hooks/usePosts";
import { useReviews, AchievementEvent } from "./index/hooks/useReviews";
import { useCatalog } from "./index/hooks/useCatalog";
import { useGameNavigation } from "./index/hooks/useGameNavigation";
import { useNotifications } from "./index/hooks/useNotifications";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const [searchQuery, setSearchQuery] = useState("");
  const [achievementToast, setAchievementToast] = useState<AchievementEvent | null>(null);

  const postsHook = usePosts(searchQuery);
  const notificationsHook = useNotifications();
  const navigationHook = useGameNavigation(setActiveTab);

  const reviewsHook = useReviews((e) => {
    notificationsHook.pushAchievement(e.medal, e.game, e.place, e.isNew);
    setAchievementToast(e);
    setTimeout(() => setAchievementToast(null), 5000);
  });

  const catalogHook = useCatalog(reviewsHook.reviews);

  const navItems: { id: Tab; icon: string; label: string; badge?: number }[] = [
    { id: "feed", icon: "Gamepad2", label: "Лента" },
    { id: "catalog", icon: "LayoutGrid", label: "Каталог игр" },
    { id: "search", icon: "Search", label: "Поиск" },
    { id: "notifications", icon: "Bell", label: "Уведомления", badge: notificationsHook.unreadCount },
    { id: "messages", icon: "Mail", label: "Сообщения" },
    { id: "saved", icon: "Bookmark", label: "Сохранённое" },
    { id: "trends", icon: "TrendingUp", label: "Тренды" },
    { id: "profile", icon: "User", label: "Профиль" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 font-golos text-zinc-100">
      <div className="max-w-screen-xl mx-auto flex">

        <LeftSidebar activeTab={activeTab} setActiveTab={setActiveTab} navItems={navItems} />

        <MainContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          posts={postsHook.posts}
          filteredPosts={postsHook.filteredPosts}
          savedPosts={postsHook.savedPosts}
          newPostText={postsHook.newPostText}
          setNewPostText={postsHook.setNewPostText}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notifications={notificationsHook.notifications}
          unreadCount={notificationsHook.unreadCount}
          selectedGame={navigationHook.selectedGame}
          followedGames={navigationHook.followedGames}
          catalogGenres={catalogHook.catalogGenres}
          setCatalogGenres={catalogHook.setCatalogGenres}
          catalogPlatforms={catalogHook.catalogPlatforms}
          setCatalogPlatforms={catalogHook.setCatalogPlatforms}
          catalogSort={catalogHook.catalogSort}
          setCatalogSort={catalogHook.setCatalogSort}
          catalogSearch={catalogHook.catalogSearch}
          setCatalogSearch={catalogHook.setCatalogSearch}
          reviews={reviewsHook.reviews}
          reviewRating={reviewsHook.reviewRating}
          setReviewRating={reviewsHook.setReviewRating}
          reviewHover={reviewsHook.reviewHover}
          setReviewHover={reviewsHook.setReviewHover}
          reviewText={reviewsHook.reviewText}
          setReviewText={reviewsHook.setReviewText}
          gameSubTab={navigationHook.gameSubTab}
          setGameSubTab={navigationHook.setGameSubTab}
          filteredGames={catalogHook.filteredGames}
          getGameUserScore={reviewsHook.getGameUserScore}
          getGameReviews={reviewsHook.getGameReviews}
          topUserScoreGames={reviewsHook.topUserScoreGames}
          getMedal={reviewsHook.getMedal}
          openGame={navigationHook.openGame}
          toggleFollowGame={navigationHook.toggleFollowGame}
          toggleSetItem={catalogHook.toggleSetItem}
          resetFilters={catalogHook.resetFilters}
          handleLike={postsHook.handleLike}
          handleRepost={postsHook.handleRepost}
          handleSave={postsHook.handleSave}
          handlePublish={postsHook.handlePublish}
          markAllRead={notificationsHook.markAllRead}
          submitReview={reviewsHook.submitReview}
          likeReview={reviewsHook.likeReview}
        />

        <RightSidebar setActiveTab={setActiveTab} openGame={navigationHook.openGame} setSearchQuery={setSearchQuery} />
      </div>

      <AchievementToast toast={achievementToast} openGame={navigationHook.openGame} setAchievementToast={setAchievementToast} />
    </div>
  );
}
