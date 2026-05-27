import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Textarea } from "@/components/ui/textarea";

interface Post {
  id: number;
  author: string;
  handle: string;
  time: string;
  text: string;
  tag?: string;
  likes: number;
  reposts: number;
  comments: number;
  liked: boolean;
  reposted: boolean;
  saved: boolean;
  repostOf?: { author: string; handle: string; text: string };
}

interface Notification {
  id: number;
  type: "like" | "comment" | "follow" | "repost";
  user: string;
  text: string;
  time: string;
  read: boolean;
}

const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    author: "NightOwl_GG",
    handle: "nightowl",
    time: "3м",
    tag: "Elden Ring",
    text: "Наконец-то завалил Малении с первой попытки без флаконов. 47 часов на это ушло. Нет, я не плакал. Я просто немного всплакнул.",
    likes: 1842,
    reposts: 341,
    comments: 218,
    liked: false,
    reposted: false,
    saved: false,
  },
  {
    id: 2,
    author: "PixelViper",
    handle: "pixelviper",
    time: "18м",
    tag: "Cyberpunk 2077",
    text: "Cyberpunk 2.2 — это уже совсем другая игра. Помните, каким был релиз? Теперь это один из лучших open-world от первого лица. CDPR реабилитировались.",
    likes: 3109,
    reposts: 892,
    comments: 445,
    liked: true,
    reposted: false,
    saved: true,
  },
  {
    id: 3,
    author: "LootGoblin",
    handle: "lootgoblin",
    time: "45м",
    tag: "Diablo IV",
    text: "Blizzard анонсировали новый сезон в Diablo IV — Сезон Крови. Новый класс, 12 данжей, легендарные аффиксы переработаны. Дата выхода: 7 июня. Кто в деле?",
    likes: 724,
    reposts: 198,
    comments: 87,
    liked: false,
    reposted: false,
    saved: false,
  },
  {
    id: 4,
    author: "RetroFrame",
    handle: "retroframe",
    time: "2ч",
    tag: "Инди",
    text: "Hollow Knight: Silksong выйдет. Нет, правда. Я просто верю. Уже 6 лет верю. Это моя религия.",
    likes: 9471,
    reposts: 4122,
    comments: 1089,
    liked: false,
    reposted: false,
    saved: false,
  },
  {
    id: 5,
    author: "NightOwl_GG",
    handle: "nightowl",
    time: "4ч",
    tag: "Baldur's Gate 3",
    text: "Прошёл BG3 на четвёртый раз — теперь как Тёмный Дворянин. Игра совершенно другая. Larian сделали шедевр.",
    likes: 2301,
    reposts: 567,
    comments: 234,
    liked: false,
    reposted: false,
    saved: false,
    repostOf: {
      author: "PixelViper",
      handle: "pixelviper",
      text: "BG3 — единственная игра, где я пожалел, что не изучил D&D раньше. 180 часов за один присест.",
    },
  },
  {
    id: 6,
    author: "SpeedrunQueen",
    handle: "speedrunq",
    time: "6ч",
    tag: "Speedrun",
    text: "Новый WR в Super Mario 64 — 1:35:42. Сообщество не спит уже третью ночь подряд. Это всё ради 4 секунд. Я понимаю каждого из них.",
    likes: 5840,
    reposts: 1293,
    comments: 378,
    liked: false,
    reposted: false,
    saved: false,
  },
];

const NOTIFICATIONS: Notification[] = [
  { id: 1, type: "like", user: "PixelViper", text: "оценил ваш пост про Elden Ring", time: "5м", read: false },
  { id: 2, type: "follow", user: "SpeedrunQueen", text: "подписалась на вас", time: "12м", read: false },
  { id: 3, type: "comment", user: "LootGoblin", text: "прокомментировал ваш пост", time: "30м", read: false },
  { id: 4, type: "repost", user: "RetroFrame", text: "поделился вашим постом", time: "1ч", read: true },
  { id: 5, type: "like", user: "NightOwl_GG", text: "оценил ваш комментарий", time: "3ч", read: true },
  { id: 6, type: "follow", user: "GlitchHunter", text: "подписался на вас", time: "5ч", read: true },
];

const TRENDS = [
  { tag: "EldenRing", posts: "48.2к постов", hot: true },
  { tag: "Silksong", posts: "31.7к постов", hot: true },
  { tag: "DiabloIV", posts: "19.4к постов", hot: false },
  { tag: "BaldursGate3", posts: "15.1к постов", hot: false },
  { tag: "Speedrun", posts: "9.8к постов", hot: false },
  { tag: "Инди", posts: "7.3к постов", hot: false },
];

const SUGGESTIONS = [
  { name: "GlitchHunter", handle: "glitchhunter", bio: "Нахожу баги. Это искусство." },
  { name: "PixelViper", handle: "pixelviper", bio: "Обзоры · RPG · Lore" },
  { name: "SpeedrunQueen", handle: "speedrunq", bio: "WR × 14 · Any% маньяк" },
];

interface GameInfo {
  title: string;
  studio: string;
  year: string;
  genre: string;
  genres: string[];
  platforms: string[];
  rating: string;
  players: string;
  description: string;
  cover: string;
  accent: string;
}

const GAMES: Record<string, GameInfo> = {
  "Elden Ring": {
    title: "Elden Ring",
    studio: "FromSoftware",
    year: "2022",
    genre: "Souls-like · Open World",
    genres: ["RPG", "Open World"],
    platforms: ["PC", "PS5", "Xbox"],
    rating: "97",
    players: "24.8M игроков",
    description: "Открытый мир Междуземья, созданный Хидэтакой Миядзаки и Джорджем Мартином. Сражения, лор и боль — всё, что нужно.",
    cover: "from-amber-900/40 via-zinc-900 to-rose-900/30",
    accent: "amber",
  },
  "Cyberpunk 2077": {
    title: "Cyberpunk 2077",
    studio: "CD Projekt RED",
    year: "2020",
    genre: "RPG · Open World",
    genres: ["RPG", "Open World", "Shooter"],
    platforms: ["PC", "PS5", "Xbox"],
    rating: "86",
    players: "31.2M игроков",
    description: "Найт-Сити, импланты и сюжет о памяти. После патча 2.2 — одна из лучших RPG последних лет.",
    cover: "from-yellow-500/40 via-zinc-900 to-cyan-500/30",
    accent: "yellow",
  },
  "Diablo IV": {
    title: "Diablo IV",
    studio: "Blizzard",
    year: "2023",
    genre: "ARPG · Loot",
    genres: ["RPG", "Action"],
    platforms: ["PC", "PS5", "Xbox"],
    rating: "82",
    players: "12.5M игроков",
    description: "Тёмное фэнтези, классы, бесконечный гринд легендарок и сезонные приключения в Санктуарии.",
    cover: "from-red-900/50 via-zinc-900 to-orange-900/30",
    accent: "red",
  },
  "Baldur's Gate 3": {
    title: "Baldur's Gate 3",
    studio: "Larian Studios",
    year: "2023",
    genre: "CRPG · D&D",
    genres: ["RPG", "Стратегия"],
    platforms: ["PC", "PS5", "Mac"],
    rating: "96",
    players: "15.7M игроков",
    description: "Лучшая RPG десятилетия. D&D 5e, нелинейный сюжет и спутники, которых вы запомните навсегда.",
    cover: "from-emerald-900/50 via-zinc-900 to-violet-900/40",
    accent: "emerald",
  },
  "Hollow Knight": {
    title: "Hollow Knight",
    studio: "Team Cherry",
    year: "2017",
    genre: "Metroidvania · Инди",
    genres: ["Инди", "Action"],
    platforms: ["PC", "PS5", "Switch", "Xbox"],
    rating: "90",
    players: "5.8M игроков",
    description: "Атмосферная метроидвания о падшем королевстве жуков. Сложно, красиво, до слёз.",
    cover: "from-slate-700/50 via-zinc-900 to-cyan-900/30",
    accent: "slate",
  },
  "Stardew Valley": {
    title: "Stardew Valley",
    studio: "ConcernedApe",
    year: "2016",
    genre: "Симулятор · Инди",
    genres: ["Инди", "Симулятор"],
    platforms: ["PC", "PS5", "Switch", "Mobile"],
    rating: "89",
    players: "30.0M игроков",
    description: "Спокойная ферма, рыбалка, отношения и шахты. Один человек сделал лучший симулятор фермы.",
    cover: "from-lime-700/40 via-zinc-900 to-amber-700/30",
    accent: "lime",
  },
  "The Witcher 3": {
    title: "The Witcher 3",
    studio: "CD Projekt RED",
    year: "2015",
    genre: "RPG · Open World",
    genres: ["RPG", "Open World"],
    platforms: ["PC", "PS5", "Xbox", "Switch"],
    rating: "93",
    players: "50.0M игроков",
    description: "Геральт, Цири и Дикая Охота. Эталон сюжетной RPG с открытым миром.",
    cover: "from-zinc-700/50 via-zinc-900 to-red-900/30",
    accent: "zinc",
  },
  "Hades": {
    title: "Hades",
    studio: "Supergiant Games",
    year: "2020",
    genre: "Roguelike · Инди",
    genres: ["Инди", "Action"],
    platforms: ["PC", "PS5", "Switch", "Xbox"],
    rating: "93",
    players: "4.5M игроков",
    description: "Сын Аида сбегает из ада снова и снова. Лучший рогалик с сильным сюжетом.",
    cover: "from-orange-700/40 via-zinc-900 to-fuchsia-900/30",
    accent: "orange",
  },
};

const ALL_GENRES = ["RPG", "Open World", "Action", "Инди", "Shooter", "Симулятор", "Стратегия"];
const ALL_PLATFORMS = ["PC", "PS5", "Xbox", "Switch", "Mac", "Mobile"];

type Tab = "feed" | "profile" | "search" | "notifications" | "messages" | "saved" | "trends" | "game" | "catalog";

function InitialAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name.slice(0, 2).toUpperCase();
  const palette = [
    "bg-violet-900/60 text-violet-300",
    "bg-cyan-900/60 text-cyan-300",
    "bg-emerald-900/60 text-emerald-300",
    "bg-rose-900/60 text-rose-300",
    "bg-amber-900/60 text-amber-300",
    "bg-indigo-900/60 text-indigo-300",
  ];
  const color = palette[name.charCodeAt(0) % palette.length];
  const sizeClass = size === "sm" ? "w-8 h-8 text-xs" : size === "lg" ? "w-14 h-14 text-base" : "w-10 h-10 text-sm";
  return (
    <div className={`${sizeClass} ${color} rounded-xl flex items-center justify-center font-bold flex-shrink-0 border border-white/5`}>
      {initials}
    </div>
  );
}

function TagBadge({ tag, onClick }: { tag: string; onClick?: () => void }) {
  const isGame = !!GAMES[tag];
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      disabled={!isGame || !onClick}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-2 ${
        isGame && onClick ? "hover:bg-violet-500/20 hover:border-violet-500/40 cursor-pointer transition-colors" : ""
      }`}
    >
      {isGame && <span className="text-[10px]">🎮</span>}
      {tag}
    </button>
  );
}

function PostCard({
  post,
  onLike,
  onRepost,
  onSave,
  onTagClick,
}: {
  post: Post;
  onLike: (id: number) => void;
  onRepost: (id: number, comment: string) => void;
  onSave: (id: number) => void;
  onTagClick?: (tag: string) => void;
}) {
  const [showRepostModal, setShowRepostModal] = useState(false);
  const [repostComment, setRepostComment] = useState("");

  return (
    <article className="border-b border-white/5 px-6 py-5 hover:bg-white/[0.02] transition-colors duration-150">
      {post.repostOf && (
        <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-3 ml-14">
          <Icon name="Repeat2" size={12} />
          <span>{post.author} поделился</span>
        </div>
      )}
      <div className="flex gap-4">
        <InitialAvatar name={post.author} />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="font-semibold text-white text-sm">{post.author}</span>
            <span className="text-zinc-500 text-xs">@{post.handle}</span>
            <span className="text-zinc-600 text-xs ml-auto flex-shrink-0">{post.time}</span>
          </div>

          {post.tag && <TagBadge tag={post.tag} onClick={onTagClick ? () => onTagClick(post.tag!) : undefined} />}

          {post.repostOf && (
            <div className="border border-white/8 rounded-xl p-3 mb-3 bg-white/[0.03]">
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="font-medium text-zinc-300 text-xs">{post.repostOf.author}</span>
                <span className="text-zinc-500 text-xs">@{post.repostOf.handle}</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">{post.repostOf.text}</p>
            </div>
          )}

          <p className="text-zinc-200 text-sm leading-relaxed mb-4">{post.text}</p>

          <div className="flex items-center gap-5">
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center gap-1.5 text-xs transition-all duration-150 group ${
                post.liked ? "text-rose-400" : "text-zinc-500 hover:text-rose-400"
              }`}
            >
              <Icon name="Heart" size={15} className={post.liked ? "fill-current" : "group-hover:scale-110 transition-transform"} />
              <span>{(post.likes + (post.liked ? 1 : 0)).toLocaleString("ru")}</span>
            </button>

            <button
              onClick={() => setShowRepostModal(true)}
              className={`flex items-center gap-1.5 text-xs transition-colors duration-150 ${
                post.reposted ? "text-emerald-400" : "text-zinc-500 hover:text-emerald-400"
              }`}
            >
              <Icon name="Repeat2" size={15} />
              <span>{(post.reposts + (post.reposted ? 1 : 0)).toLocaleString("ru")}</span>
            </button>

            <button className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-cyan-400 transition-colors duration-150">
              <Icon name="MessageCircle" size={15} />
              <span>{post.comments.toLocaleString("ru")}</span>
            </button>

            <button
              onClick={() => onSave(post.id)}
              className={`flex items-center gap-1.5 text-xs ml-auto transition-colors duration-150 ${
                post.saved ? "text-amber-400" : "text-zinc-500 hover:text-amber-400"
              }`}
            >
              <Icon name="Bookmark" size={15} className={post.saved ? "fill-current" : ""} />
            </button>

            <button className="text-zinc-500 hover:text-zinc-300 transition-colors duration-150">
              <Icon name="Share" size={15} />
            </button>
          </div>
        </div>
      </div>

      {showRepostModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowRepostModal(false)}
        >
          <div
            className="bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-semibold text-white mb-4">Поделиться постом</h3>
            <div className="border border-white/8 rounded-xl p-4 mb-4 bg-white/[0.03]">
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="font-medium text-zinc-300 text-xs">{post.author}</span>
                <span className="text-zinc-500 text-xs">@{post.handle}</span>
              </div>
              <p className="text-zinc-400 text-sm">{post.text.slice(0, 120)}{post.text.length > 120 ? "…" : ""}</p>
            </div>
            <Textarea
              value={repostComment}
              onChange={(e) => setRepostComment(e.target.value)}
              placeholder="Добавьте комментарий (необязательно)…"
              className="resize-none bg-white/5 border-white/10 text-zinc-200 placeholder:text-zinc-600 focus:border-violet-500/50 mb-4 text-sm"
              rows={3}
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowRepostModal(false)}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  onRepost(post.id, repostComment);
                  setShowRepostModal(false);
                  setRepostComment("");
                }}
                className="px-4 py-2 text-sm bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition-colors"
              >
                Поделиться
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

interface Review {
  id: number;
  game: string;
  author: string;
  rating: number;
  text: string;
  time: string;
  likes: number;
  liked?: boolean;
}

const INITIAL_REVIEWS: Review[] = [
  { id: 1, game: "Elden Ring", author: "NightOwl_GG", rating: 10, text: "Шедевр. Каждый угол карты создан вручную — это видно. Бои сложные, но честные. Просто 10 из 10.", time: "2 дня назад", likes: 248 },
  { id: 2, game: "Elden Ring", author: "PixelViper", rating: 9, text: "Боссы — это искусство. Но иногда баланс хромает: Маления слишком сильна по сравнению с остальными.", time: "5 дней назад", likes: 87 },
  { id: 3, game: "Baldur's Gate 3", author: "LootGoblin", rating: 10, text: "180 часов — и ни секунды не пожалел. Larian создали новый стандарт для RPG.", time: "1 день назад", likes: 312 },
  { id: 4, game: "Cyberpunk 2077", author: "GlitchHunter", rating: 8, text: "После всех патчей — отличная игра. Если бы такой релиз был в 2020, это была бы GOTY.", time: "3 дня назад", likes: 156 },
  { id: 5, game: "Hollow Knight", author: "RetroFrame", rating: 10, text: "Идеальная метроидвания. Атмосфера, музыка, дизайн уровней — всё на высочайшем уровне.", time: "неделю назад", likes: 421 },
  { id: 6, game: "Hades", author: "SpeedrunQueen", rating: 9, text: "Лучший рогалик. Сюжет, который раскрывается через геймплей — это гениально.", time: "4 дня назад", likes: 198 },
  { id: 7, game: "Stardew Valley", author: "RetroFrame", rating: 9, text: "Один человек сделал лучший симулятор фермы. Терапевтическая игра.", time: "2 недели назад", likes: 134 },
];

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
  const [catalogSort, setCatalogSort] = useState<"rating" | "year" | "players">("rating");
  const [catalogSearch, setCatalogSearch] = useState("");
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHover, setReviewHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [gameSubTab, setGameSubTab] = useState<"posts" | "reviews">("posts");

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
    setReviews((prev) => [newReview, ...prev]);
    setReviewRating(0);
    setReviewText("");
    setReviewHover(0);
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

        {/* Левая навигация */}
        <aside className="w-60 flex-shrink-0 sticky top-0 h-screen flex flex-col pt-6 px-4 border-r border-white/5">
          <div className="px-3 mb-8">
            <span className="text-xl font-bold tracking-tight text-white">pixel</span>
            <span className="text-xl font-bold text-violet-400">talk</span>
          </div>

          <nav className="flex-1 space-y-0.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  activeTab === item.id
                    ? "bg-violet-600 text-white"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
                {item.badge && item.badge > 0 ? (
                  <span className="ml-auto bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>

          <div className="pb-6 px-1">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
              <InitialAvatar name="ВЫ" size="sm" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">Вы</div>
                <div className="text-xs text-zinc-500 truncate">@you</div>
              </div>
              <Icon name="MoreHorizontal" size={16} className="text-zinc-500" />
            </div>
          </div>
        </aside>

        {/* Основной контент */}
        <main className="flex-1 min-w-0 border-r border-white/5">

          {/* Лента */}
          {activeTab === "feed" && (
            <div>
              <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5">
                <h1 className="font-semibold text-white">Лента</h1>
              </div>

              <div className="px-6 py-5 border-b border-white/5">
                <div className="flex gap-4">
                  <InitialAvatar name="ВЫ" />
                  <div className="flex-1">
                    <Textarea
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      placeholder="Что происходит в игровом мире?"
                      className="resize-none border-0 border-b border-white/10 rounded-none focus:border-violet-500/50 focus-visible:ring-0 px-0 text-zinc-100 placeholder:text-zinc-600 text-sm mb-3 bg-transparent"
                      rows={3}
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
                          <Icon name="Image" size={18} />
                        </button>
                        <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
                          <Icon name="Hash" size={18} />
                        </button>
                        <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
                          <Icon name="Smile" size={18} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        {newPostText.length > 0 && (
                          <span className={`text-xs ${newPostText.length > 240 ? "text-rose-400" : "text-zinc-500"}`}>
                            {280 - newPostText.length}
                          </span>
                        )}
                        <button
                          onClick={handlePublish}
                          disabled={!newPostText.trim() || newPostText.length > 280}
                          className="px-4 py-1.5 bg-violet-600 text-white text-sm rounded-lg disabled:opacity-30 hover:bg-violet-500 transition-colors font-medium"
                        >
                          Опубликовать
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {posts.map((post) => (
                <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} onTagClick={openGame} />
              ))}
            </div>
          )}

          {/* Поиск */}
          {activeTab === "search" && (
            <div>
              <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5">
                <div className="relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск по постам, играм, никам…"
                    className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/8 rounded-xl text-sm focus:outline-none focus:border-violet-500/50 transition-all text-zinc-100 placeholder:text-zinc-600"
                    autoFocus
                  />
                </div>
              </div>

              {searchQuery ? (
                <div>
                  <div className="px-6 py-3 border-b border-white/5">
                    <span className="text-xs text-zinc-500">
                      По запросу «{searchQuery}»: {filteredPosts.length}
                    </span>
                  </div>
                  {filteredPosts.length === 0 ? (
                    <div className="px-6 py-16 text-center">
                      <Icon name="SearchX" size={32} className="text-zinc-700 mx-auto mb-3" />
                      <p className="text-zinc-500 text-sm">Ничего не найдено</p>
                    </div>
                  ) : (
                    filteredPosts.map((post) => (
                      <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} onTagClick={openGame} />
                    ))
                  )}
                </div>
              ) : (
                <div>
                  <div className="px-6 py-5 border-b border-white/5">
                    <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Кого читать</h2>
                    <div className="space-y-4">
                      {SUGGESTIONS.map((s) => (
                        <div key={s.handle} className="flex items-center gap-3">
                          <InitialAvatar name={s.name} size="sm" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white">{s.name}</div>
                            <div className="text-xs text-zinc-500">@{s.handle} · {s.bio}</div>
                          </div>
                          <button className="px-3 py-1 border border-white/10 rounded-lg text-xs text-zinc-300 hover:bg-white/5 transition-colors font-medium">
                            Читать
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 py-5">
                    <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Популярные теги</h2>
                    <div className="flex flex-wrap gap-2">
                      {TRENDS.map((t) => (
                        <button
                          key={t.tag}
                          onClick={() => setSearchQuery("#" + t.tag)}
                          className="px-3 py-1.5 bg-white/5 border border-white/8 rounded-lg text-sm text-zinc-300 hover:bg-violet-600/20 hover:border-violet-500/30 hover:text-violet-300 transition-colors"
                        >
                          #{t.tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Уведомления */}
          {activeTab === "notifications" && (
            <div>
              <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <h1 className="font-semibold text-white">Уведомления</h1>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors">
                    Прочитать все
                  </button>
                )}
              </div>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-4 px-6 py-4 border-b border-white/5 transition-colors ${
                    !n.read ? "bg-violet-500/5" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    n.type === "like" ? "bg-rose-500/15 text-rose-400" :
                    n.type === "comment" ? "bg-cyan-500/15 text-cyan-400" :
                    n.type === "follow" ? "bg-emerald-500/15 text-emerald-400" :
                    "bg-amber-500/15 text-amber-400"
                  }`}>
                    <Icon
                      name={n.type === "like" ? "Heart" : n.type === "comment" ? "MessageCircle" : n.type === "follow" ? "UserPlus" : "Repeat2"}
                      size={14}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-200">
                      <span className="font-medium text-white">{n.user}</span>{" "}
                      <span className="text-zinc-400">{n.text}</span>
                    </p>
                    <span className="text-xs text-zinc-600">{n.time}</span>
                  </div>
                  {!n.read && (
                    <div className="w-2 h-2 bg-violet-400 rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Сообщения */}
          {activeTab === "messages" && (
            <div>
              <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5">
                <h1 className="font-semibold text-white">Сообщения</h1>
              </div>
              <div className="px-6 py-16 text-center">
                <div className="w-16 h-16 bg-white/5 border border-white/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" size={28} className="text-zinc-500" />
                </div>
                <h2 className="font-medium text-white mb-1">Прямые сообщения</h2>
                <p className="text-sm text-zinc-500 max-w-xs mx-auto mb-4">
                  Обсуждайте игры напрямую с другими геймерами
                </p>
                <button className="px-4 py-2 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-500 transition-colors">
                  Написать сообщение
                </button>
              </div>
            </div>
          )}

          {/* Сохранённое */}
          {activeTab === "saved" && (
            <div>
              <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5">
                <h1 className="font-semibold text-white">Сохранённое</h1>
              </div>
              {savedPosts.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <div className="w-16 h-16 bg-white/5 border border-white/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="Bookmark" size={28} className="text-zinc-500" />
                  </div>
                  <h2 className="font-medium text-white mb-1">Пока ничего нет</h2>
                  <p className="text-sm text-zinc-500">Сохраняйте интересные посты — они будут здесь</p>
                </div>
              ) : (
                savedPosts.map((post) => (
                  <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} onTagClick={openGame} />
                ))
              )}
            </div>
          )}

          {/* Тренды */}
          {activeTab === "trends" && (
            <div>
              <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5">
                <h1 className="font-semibold text-white">Популярные темы</h1>
              </div>
              {TRENDS.map((t, i) => (
                <div
                  key={t.tag}
                  onClick={() => { setSearchQuery("#" + t.tag); setActiveTab("search"); }}
                  className="flex items-center gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/[0.03] cursor-pointer transition-colors group"
                >
                  <span className="text-zinc-700 font-bold text-lg w-8 text-right">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">#{t.tag}</span>
                      {t.hot && (
                        <span className="text-xs bg-rose-500/15 text-rose-400 border border-rose-500/20 rounded px-1.5 py-0.5">
                          🔥 горячее
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">{t.posts}</div>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                </div>
              ))}
            </div>
          )}

          {/* Профиль */}
          {activeTab === "profile" && (
            <div>
              <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5">
                <h1 className="font-semibold text-white">Профиль</h1>
              </div>

              <div className="h-28 bg-gradient-to-br from-violet-900/40 via-zinc-900 to-cyan-900/30" />

              <div className="px-6 pb-8">
                <div className="flex items-end justify-between -mt-7 mb-4">
                  <div className="w-16 h-16 bg-zinc-900 rounded-2xl border-2 border-zinc-900 shadow-lg flex items-center justify-center">
                    <InitialAvatar name="ВЫ" size="lg" />
                  </div>
                  <button className="px-4 py-1.5 border border-white/10 rounded-lg text-sm text-zinc-300 hover:bg-white/5 transition-colors font-medium mt-2">
                    Редактировать
                  </button>
                </div>

                <div className="mb-3">
                  <h2 className="text-lg font-bold text-white">Вы</h2>
                  <p className="text-zinc-500 text-sm">@you</p>
                </div>

                <p className="text-sm text-zinc-500 mb-5 leading-relaxed">
                  Расскажите о себе — любимые игры, жанры, платформы.
                </p>

                <div className="flex gap-6 mb-6">
                  <div>
                    <span className="font-bold text-white">0</span>
                    <span className="text-zinc-500 text-sm ml-1">подписок</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">0</span>
                    <span className="text-zinc-500 text-sm ml-1">подписчиков</span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-5">
                  <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Ваши посты</h3>
                  {posts.filter((p) => p.handle === "you").length === 0 ? (
                    <p className="text-sm text-zinc-600">Вы ещё ничего не публиковали</p>
                  ) : (
                    posts.filter((p) => p.handle === "you").map((post) => (
                      <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} onTagClick={openGame} />
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Каталог игр */}
          {activeTab === "catalog" && (
            <div>
              <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 border-b border-white/5">
                <div className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <h1 className="font-semibold text-white">Каталог игр</h1>
                    <p className="text-xs text-zinc-500 mt-0.5">{filteredGames.length} из {Object.keys(GAMES).length} игр</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={catalogSort}
                      onChange={(e) => setCatalogSort(e.target.value as "rating" | "year" | "players")}
                      className="bg-white/5 border border-white/10 rounded-lg text-sm text-zinc-300 px-3 py-1.5 focus:outline-none focus:border-violet-500/50 cursor-pointer"
                    >
                      <option value="rating">По рейтингу</option>
                      <option value="year">По году</option>
                      <option value="players">По игрокам</option>
                    </select>
                  </div>
                </div>

                {/* Поиск */}
                <div className="px-6 pb-3">
                  <div className="relative">
                    <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      value={catalogSearch}
                      onChange={(e) => setCatalogSearch(e.target.value)}
                      placeholder="Название игры или студия…"
                      className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/8 rounded-lg text-sm focus:outline-none focus:border-violet-500/50 transition-colors text-zinc-100 placeholder:text-zinc-600"
                    />
                  </div>
                </div>

                {/* Фильтры по жанрам */}
                <div className="px-6 pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mr-1">Жанры</span>
                    {ALL_GENRES.map((g) => {
                      const active = catalogGenres.has(g);
                      return (
                        <button
                          key={g}
                          onClick={() => toggleSetItem(catalogGenres, g, setCatalogGenres)}
                          className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                            active
                              ? "bg-violet-600 border-violet-500 text-white"
                              : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
                          }`}
                        >
                          {g}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Фильтры по платформам */}
                <div className="px-6 pb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mr-1">Платформы</span>
                    {ALL_PLATFORMS.map((p) => {
                      const active = catalogPlatforms.has(p);
                      return (
                        <button
                          key={p}
                          onClick={() => toggleSetItem(catalogPlatforms, p, setCatalogPlatforms)}
                          className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                            active
                              ? "bg-cyan-600 border-cyan-500 text-white"
                              : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                    {(catalogGenres.size > 0 || catalogPlatforms.size > 0 || catalogSearch) && (
                      <button
                        onClick={resetFilters}
                        className="text-xs px-2.5 py-1 text-zinc-500 hover:text-rose-400 transition-colors ml-1"
                      >
                        × Сбросить
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Сетка игр */}
              {filteredGames.length === 0 ? (
                <div className="px-6 py-20 text-center">
                  <div className="w-16 h-16 bg-white/5 border border-white/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="SearchX" size={28} className="text-zinc-500" />
                  </div>
                  <h2 className="font-medium text-white mb-1">Ничего не найдено</h2>
                  <p className="text-sm text-zinc-500 mb-4">Попробуйте изменить фильтры</p>
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-500 transition-colors"
                  >
                    Сбросить фильтры
                  </button>
                </div>
              ) : (
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredGames.map((g) => {
                    const isFollowed = followedGames.has(g.title);
                    const gamePostCount = posts.filter((p) => p.tag === g.title).length;
                    return (
                      <button
                        key={g.title}
                        onClick={() => openGame(g.title)}
                        className="group text-left bg-white/[0.02] border border-white/8 rounded-2xl overflow-hidden hover:border-violet-500/40 hover:bg-white/[0.04] transition-all"
                      >
                        <div className={`h-32 bg-gradient-to-br ${g.cover} relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.06),transparent_50%)]" />
                          <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/40 backdrop-blur-sm rounded-md text-xs font-bold text-white border border-white/10">
                            {g.rating}
                          </div>
                          {isFollowed && (
                            <div className="absolute top-3 left-3 px-2 py-0.5 bg-violet-600/90 backdrop-blur-sm rounded-md text-[10px] font-medium text-white">
                              Отслеживается
                            </div>
                          )}
                          <div className="absolute bottom-3 left-3 right-3">
                            <h3 className="text-lg font-bold text-white tracking-tight truncate group-hover:text-violet-200 transition-colors">
                              {g.title}
                            </h3>
                            <p className="text-xs text-zinc-300/80 truncate">{g.studio} · {g.year}</p>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {g.genres.slice(0, 3).map((gn) => (
                              <span key={gn} className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20">
                                {gn}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed mb-3 line-clamp-2">{g.description}</p>
                          <div className="flex items-center justify-between text-xs text-zinc-500">
                            <div className="flex items-center gap-3">
                              {getGameUserScore(g.title) && (
                                <span className="flex items-center gap-1 text-amber-400">
                                  <Icon name="Star" size={11} className="fill-current" />
                                  {getGameUserScore(g.title)}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Icon name="Users" size={11} />
                                {g.players.split(" ")[0]}
                              </span>
                              <span className="flex items-center gap-1">
                                <Icon name="MessageCircle" size={11} />
                                {gamePostCount}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              {g.platforms.slice(0, 3).map((p) => (
                                <span key={p} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Страница игры */}
          {activeTab === "game" && selectedGame && GAMES[selectedGame] && (() => {
            const game = GAMES[selectedGame];
            const gamePosts = posts.filter((p) => p.tag === selectedGame);
            const isFollowed = followedGames.has(selectedGame);
            return (
              <div>
                <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5 flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab("feed")}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <Icon name="ArrowLeft" size={18} />
                  </button>
                  <div>
                    <h1 className="font-semibold text-white">{game.title}</h1>
                    <p className="text-xs text-zinc-500">{gamePosts.length} постов</p>
                  </div>
                </div>

                {/* Обложка */}
                <div className={`h-44 bg-gradient-to-br ${game.cover} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
                  <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-zinc-300/70 mb-1">{game.genre}</div>
                      <h2 className="text-3xl font-bold text-white tracking-tight">{game.title}</h2>
                      <p className="text-sm text-zinc-300/80 mt-1">{game.studio} · {game.year}</p>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-5 border-b border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-6">
                      <div>
                        <div className="text-2xl font-bold text-white">{game.rating}<span className="text-sm text-zinc-500">/100</span></div>
                        <div className="text-xs text-zinc-500 mt-0.5">Metacritic</div>
                      </div>
                      <div className="border-l border-white/10 pl-6">
                        <div className="text-2xl font-bold text-amber-400 flex items-center gap-1">
                          {getGameUserScore(selectedGame) || "—"}
                          {getGameUserScore(selectedGame) && <Icon name="Star" size={16} className="fill-current" />}
                        </div>
                        <div className="text-xs text-zinc-500 mt-0.5">Оценка игроков · {getGameReviews(selectedGame).length}</div>
                      </div>
                      <div className="border-l border-white/10 pl-6">
                        <div className="text-2xl font-bold text-white">{gamePosts.length}</div>
                        <div className="text-xs text-zinc-500 mt-0.5">постов</div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFollowGame(selectedGame)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isFollowed
                          ? "bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10"
                          : "bg-violet-600 text-white hover:bg-violet-500"
                      }`}
                    >
                      {isFollowed ? "Отслеживается" : "Отслеживать"}
                    </button>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{game.description}</p>
                </div>

                {/* Табы внутри игры */}
                <div className="flex border-b border-white/5 px-6">
                  <button
                    onClick={() => setGameSubTab("posts")}
                    className={`px-4 py-3 text-sm font-medium transition-colors ${
                      gameSubTab === "posts" ? "text-white border-b-2 border-violet-500" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Посты <span className="text-zinc-600 ml-1">{gamePosts.length}</span>
                  </button>
                  <button
                    onClick={() => setGameSubTab("reviews")}
                    className={`px-4 py-3 text-sm font-medium transition-colors ${
                      gameSubTab === "reviews" ? "text-white border-b-2 border-violet-500" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Отзывы <span className="text-zinc-600 ml-1">{getGameReviews(selectedGame).length}</span>
                  </button>
                </div>

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
                    {/* Форма отзыва */}
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

                    {/* Список отзывов */}
                    {getGameReviews(selectedGame).length === 0 ? (
                      <div className="px-6 py-16 text-center">
                        <div className="w-16 h-16 bg-white/5 border border-white/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Icon name="Star" size={28} className="text-zinc-500" />
                        </div>
                        <h2 className="font-medium text-white mb-1">Пока без отзывов</h2>
                        <p className="text-sm text-zinc-500">Будьте первым, кто оценит {game.title}</p>
                      </div>
                    ) : (
                      getGameReviews(selectedGame).map((r) => (
                        <article key={r.id} className="px-6 py-5 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <div className="flex gap-4">
                            <InitialAvatar name={r.author} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline gap-2 mb-1.5">
                                <span className="font-semibold text-white text-sm">{r.author}</span>
                                <span className="text-zinc-600 text-xs">·</span>
                                <span className="text-zinc-500 text-xs">{r.time}</span>
                                <div className="ml-auto flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 rounded-md px-2 py-0.5">
                                  <Icon name="Star" size={11} className="text-amber-400 fill-current" />
                                  <span className="text-amber-400 text-xs font-bold">{r.rating}/10</span>
                                </div>
                              </div>

                              {/* Полоска оценки */}
                              <div className="flex items-center gap-1 mb-3">
                                {Array.from({ length: 10 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className={`h-1 flex-1 rounded-full ${
                                      i < r.rating
                                        ? r.rating >= 8
                                          ? "bg-emerald-500"
                                          : r.rating >= 5
                                            ? "bg-amber-500"
                                            : "bg-rose-500"
                                        : "bg-white/8"
                                    }`}
                                  />
                                ))}
                              </div>

                              <p className="text-zinc-200 text-sm leading-relaxed mb-3">{r.text}</p>

                              <div className="flex items-center gap-5">
                                <button
                                  onClick={() => likeReview(r.id)}
                                  className={`flex items-center gap-1.5 text-xs transition-colors ${
                                    r.liked ? "text-rose-400" : "text-zinc-500 hover:text-rose-400"
                                  }`}
                                >
                                  <Icon name="Heart" size={14} className={r.liked ? "fill-current" : ""} />
                                  <span>{r.likes}</span>
                                </button>
                                <button className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-cyan-400 transition-colors">
                                  <Icon name="MessageCircle" size={14} />
                                  <span>Ответить</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })()}
        </main>

        {/* Правая панель */}
        <aside className="w-72 flex-shrink-0 pl-6 pt-6 pr-4 hidden lg:block">
          <div className="mb-7">
            <div className="flex items-center justify-between mb-2 px-1">
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Игры в фокусе</h2>
              <button
                onClick={() => setActiveTab("catalog")}
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
              >
                Все →
              </button>
            </div>
            <div className="space-y-2">
              {Object.values(GAMES).slice(0, 3).map((g) => (
                <button
                  key={g.title}
                  onClick={() => openGame(g.title)}
                  className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 text-left transition-colors group"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${g.cover} flex-shrink-0 flex items-center justify-center text-xs font-bold text-white/80`}>
                    {g.title.slice(0, 1)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate group-hover:text-violet-300 transition-colors">{g.title}</div>
                    <div className="text-xs text-zinc-500 truncate">{g.rating}/100 · {g.genre.split(" · ")[0]}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-7">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-1">В тренде сейчас</h2>
            <div className="space-y-0.5">
              {TRENDS.slice(0, 4).map((t, i) => (
                <button
                  key={t.tag}
                  onClick={() => { setSearchQuery("#" + t.tag); setActiveTab("search"); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-left transition-colors group"
                >
                  <span className="text-zinc-700 text-xs font-medium w-4">{i + 1}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-zinc-200 group-hover:text-white">#{t.tag}</span>
                      {t.hot && <span className="text-xs">🔥</span>}
                    </div>
                    <div className="text-xs text-zinc-600">{t.posts}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-1">Кого читать</h2>
            <div className="space-y-0.5">
              {SUGGESTIONS.map((s) => (
                <div key={s.handle} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors">
                  <InitialAvatar name={s.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{s.name}</div>
                    <div className="text-xs text-zinc-500 truncate">{s.bio}</div>
                  </div>
                  <button className="text-xs border border-white/10 rounded-lg px-2.5 py-1 text-zinc-300 hover:bg-violet-600/20 hover:border-violet-500/30 hover:text-violet-300 transition-colors whitespace-nowrap">
                    Читать
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}