import { useState } from "react";
import {
  Post,
  Notification,
  Review,
  Tab,
  GAMES,
  INITIAL_POSTS,
  NOTIFICATIONS,
  INITIAL_REVIEWS,
} from "./index/constants";
import { LeftSidebar, RightSidebar } from "./index/Sidebar";
import { MainContent } from "./index/MainContent";
import { AchievementToast } from "./index/AchievementToast";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPostText, setNewPostText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [followedGames, setFollowedGames] = useState<Set<string>>(new Set());
  const [catalogGenres, setCatalogGenres] = useState<Set<string>>(new Set());
  const [catalogPlatforms, setCatalogPlatforms] = useState<Set<string>>(new Set());
  const [catalogSort, setCatalogSort] = useState<"rating" | "userScore" | "year" | "players">("userScore");
  const [catalogSearch, setCatalogSearch] = useState("");
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHover, setReviewHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [gameSubTab, setGameSubTab] = useState<"posts" | "reviews">("posts");
  const [achievementToast, setAchievementToast] = useState<{ medal: "🥇" | "🥈" | "🥉"; game: string; place: number; isNew: boolean } | null>(null);

  const getGameReviews = (game: string) => reviews.filter((r) => r.game === game);
  const getGameUserScore = (game: string) => {
    const list = getGameReviews(game);
    if (list.length === 0) return null;
    return (list.reduce((a, r) => a + r.rating, 0) / list.length).toFixed(1);
  };

  const computeTop3 = (list: Review[]): string[] => {
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
      const text =
        beforeIdx === -1
          ? `Ваш отзыв вывел «${game}» в зал славы — ${place}-е место по оценкам игроков!`
          : `Ваш отзыв поднял «${game}» на ${place}-е место в зале славы!`;
      const newNotif: Notification = {
        id: Date.now() + 1,
        type: "achievement",
        user: "Зал славы",
        text,
        time: "только что",
        read: false,
        medal: medals[afterIdx],
        game,
      };
      setNotifications((prev) => [newNotif, ...prev]);
      setAchievementToast({ medal: medals[afterIdx], game, place, isNew: beforeIdx === -1 });
      setTimeout(() => setAchievementToast(null), 5000);
    }
  };

  const likeReview = (id: number) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 } : r
      )
    );
  };

  const toggleSetItem = (set: Set<string>, item: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    if (next.has(item)) next.delete(item); else next.add(item);
    setter(next);
  };

  const resetFilters = () => {
    setCatalogGenres(new Set());
    setCatalogPlatforms(new Set());
    setCatalogSearch("");
  };

  const topUserScoreGames = Object.values(GAMES)
    .map((g) => {
      const list = reviews.filter((r) => r.game === g.title);
      const avg = list.length ? list.reduce((s, r) => s + r.rating, 0) / list.length : 0;
      return { title: g.title, avg, count: list.length };
    })
    .filter((g) => g.count > 0)
    .sort((a, b) => (b.avg !== a.avg ? b.avg - a.avg : b.count - a.count))
    .slice(0, 3)
    .map((g) => g.title);

  const getMedal = (title: string): { emoji: string; label: string; color: string } | null => {
    const idx = topUserScoreGames.indexOf(title);
    if (idx === 0) return { emoji: "🥇", label: "#1 по оценкам", color: "from-amber-500/90 to-yellow-600/90 border-amber-400/50" };
    if (idx === 1) return { emoji: "🥈", label: "#2 по оценкам", color: "from-zinc-300/90 to-zinc-500/90 border-zinc-300/50" };
    if (idx === 2) return { emoji: "🥉", label: "#3 по оценкам", color: "from-orange-600/90 to-amber-800/90 border-orange-500/50" };
    return null;
  };

  const filteredGames = Object.values(GAMES)
    .filter((g) => {
      if (catalogSearch && !g.title.toLowerCase().includes(catalogSearch.toLowerCase()) && !g.studio.toLowerCase().includes(catalogSearch.toLowerCase())) return false;
      if (catalogGenres.size > 0 && !g.genres.some((gn) => catalogGenres.has(gn))) return false;
      if (catalogPlatforms.size > 0 && !g.platforms.some((p) => catalogPlatforms.has(p))) return false;
      return true;
    })
    .sort((a, b) => {
      if (catalogSort === "rating") return parseInt(b.rating) - parseInt(a.rating);
      if (catalogSort === "year") return parseInt(b.year) - parseInt(a.year);
      if (catalogSort === "userScore") {
        const scoreA = reviews.filter((r) => r.game === a.title);
        const scoreB = reviews.filter((r) => r.game === b.title);
        const avgA = scoreA.length ? scoreA.reduce((s, r) => s + r.rating, 0) / scoreA.length : 0;
        const avgB = scoreB.length ? scoreB.reduce((s, r) => s + r.rating, 0) / scoreB.length : 0;
        if (avgB !== avgA) return avgB - avgA;
        return scoreB.length - scoreA.length;
      }
      const num = (s: string) => parseFloat(s.replace(/[^\d.]/g, ""));
      return num(b.players) - num(a.players);
    });

  const openGame = (tag: string) => {
    if (GAMES[tag]) {
      setSelectedGame(tag);
      setActiveTab("game");
    }
  };

  const toggleFollowGame = (tag: string) => {
    setFollowedGames((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag); else next.add(tag);
      return next;
    });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLike = (id: number) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p)));
  };

  const handleRepost = (id: number, comment: string) => {
    const original = posts.find((p) => p.id === id);
    if (!original) return;
    const newPost: Post = {
      id: Date.now(),
      author: "Вы",
      handle: "you",
      time: "сейчас",
      text: comment || "Поделился постом",
      likes: 0,
      reposts: 0,
      comments: 0,
      liked: false,
      reposted: false,
      saved: false,
      repostOf: { author: original.author, handle: original.handle, text: original.text },
    };
    setPosts((prev) => [newPost, ...prev.map((p) => (p.id === id ? { ...p, reposted: true } : p))]);
  };

  const handleSave = (id: number) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p)));
  };

  const handlePublish = () => {
    if (!newPostText.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      author: "Вы",
      handle: "you",
      time: "сейчас",
      text: newPostText,
      likes: 0,
      reposts: 0,
      comments: 0,
      liked: false,
      reposted: false,
      saved: false,
    };
    setPosts((prev) => [newPost, ...prev]);
    setNewPostText("");
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const navItems: { id: Tab; icon: string; label: string; badge?: number }[] = [
    { id: "feed", icon: "Gamepad2", label: "Лента" },
    { id: "catalog", icon: "LayoutGrid", label: "Каталог игр" },
    { id: "search", icon: "Search", label: "Поиск" },
    { id: "notifications", icon: "Bell", label: "Уведомления", badge: unreadCount },
    { id: "messages", icon: "Mail", label: "Сообщения" },
    { id: "saved", icon: "Bookmark", label: "Сохранённое" },
    { id: "trends", icon: "TrendingUp", label: "Тренды" },
    { id: "profile", icon: "User", label: "Профиль" },
  ];

  const filteredPosts = searchQuery
    ? posts.filter(
        (p) =>
          p.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.tag && p.tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : posts;

  const savedPosts = posts.filter((p) => p.saved);

  return (
    <div className="min-h-screen bg-zinc-950 font-golos text-zinc-100">
      <div className="max-w-screen-xl mx-auto flex">

        <LeftSidebar activeTab={activeTab} setActiveTab={setActiveTab} navItems={navItems} />

        <MainContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          posts={posts}
          filteredPosts={filteredPosts}
          savedPosts={savedPosts}
          newPostText={newPostText}
          setNewPostText={setNewPostText}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notifications={notifications}
          unreadCount={unreadCount}
          selectedGame={selectedGame}
          followedGames={followedGames}
          catalogGenres={catalogGenres}
          setCatalogGenres={setCatalogGenres}
          catalogPlatforms={catalogPlatforms}
          setCatalogPlatforms={setCatalogPlatforms}
          catalogSort={catalogSort}
          setCatalogSort={setCatalogSort}
          catalogSearch={catalogSearch}
          setCatalogSearch={setCatalogSearch}
          reviews={reviews}
          reviewRating={reviewRating}
          setReviewRating={setReviewRating}
          reviewHover={reviewHover}
          setReviewHover={setReviewHover}
          reviewText={reviewText}
          setReviewText={setReviewText}
          gameSubTab={gameSubTab}
          setGameSubTab={setGameSubTab}
          filteredGames={filteredGames}
          getGameUserScore={getGameUserScore}
          getGameReviews={getGameReviews}
          topUserScoreGames={topUserScoreGames}
          getMedal={getMedal}
          openGame={openGame}
          toggleFollowGame={toggleFollowGame}
          toggleSetItem={toggleSetItem}
          resetFilters={resetFilters}
          handleLike={handleLike}
          handleRepost={handleRepost}
          handleSave={handleSave}
          handlePublish={handlePublish}
          markAllRead={markAllRead}
          submitReview={submitReview}
          likeReview={likeReview}
        />

        <RightSidebar setActiveTab={setActiveTab} openGame={openGame} setSearchQuery={setSearchQuery} />
      </div>

      <AchievementToast toast={achievementToast} openGame={openGame} setAchievementToast={setAchievementToast} />
    </div>
  );
}
