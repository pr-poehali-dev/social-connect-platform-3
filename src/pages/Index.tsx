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

  const postsBundle = usePosts(searchQuery);
  const notificationsBundle = useNotifications();
  const navigationBundle = useGameNavigation(setActiveTab);

  const reviewsBundle = useReviews((e) => {
    notificationsBundle.pushAchievement(e.medal, e.game, e.place, e.isNew);
    setAchievementToast(e);
    setTimeout(() => setAchievementToast(null), 5000);
  });

  const catalogBundle = useCatalog(reviewsBundle.reviews);

  const navItems: { id: Tab; icon: string; label: string; badge?: number }[] = [
    { id: "feed", icon: "Gamepad2", label: "Лента" },
    { id: "catalog", icon: "LayoutGrid", label: "Каталог игр" },
    { id: "search", icon: "Search", label: "Поиск" },
    { id: "notifications", icon: "Bell", label: "Уведомления", badge: notificationsBundle.unreadCount },
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
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          postsBundle={postsBundle}
          reviewsBundle={reviewsBundle}
          catalogBundle={catalogBundle}
          navigationBundle={navigationBundle}
          notificationsBundle={notificationsBundle}
        />

        <RightSidebar setActiveTab={setActiveTab} openGame={navigationBundle.openGame} setSearchQuery={setSearchQuery} />
      </div>

      <AchievementToast toast={achievementToast} openGame={navigationBundle.openGame} setAchievementToast={setAchievementToast} />
    </div>
  );
}
