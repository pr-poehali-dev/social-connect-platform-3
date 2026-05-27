import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Textarea } from "@/components/ui/textarea";

export interface Post {
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

export interface Notification {
  id: number;
  type: "like" | "comment" | "follow" | "repost" | "achievement";
  user: string;
  text: string;
  time: string;
  read: boolean;
  medal?: "🥇" | "🥈" | "🥉";
  game?: string;
}

export const INITIAL_POSTS: Post[] = [
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

export const NOTIFICATIONS: Notification[] = [
  { id: 1, type: "like", user: "PixelViper", text: "оценил ваш пост про Elden Ring", time: "5м", read: false },
  { id: 2, type: "follow", user: "SpeedrunQueen", text: "подписалась на вас", time: "12м", read: false },
  { id: 3, type: "comment", user: "LootGoblin", text: "прокомментировал ваш пост", time: "30м", read: false },
  { id: 4, type: "repost", user: "RetroFrame", text: "поделился вашим постом", time: "1ч", read: true },
  { id: 5, type: "like", user: "NightOwl_GG", text: "оценил ваш комментарий", time: "3ч", read: true },
  { id: 6, type: "follow", user: "GlitchHunter", text: "подписался на вас", time: "5ч", read: true },
];

export const TRENDS = [
  { tag: "EldenRing", posts: "48.2к постов", hot: true },
  { tag: "Silksong", posts: "31.7к постов", hot: true },
  { tag: "DiabloIV", posts: "19.4к постов", hot: false },
  { tag: "BaldursGate3", posts: "15.1к постов", hot: false },
  { tag: "Speedrun", posts: "9.8к постов", hot: false },
  { tag: "Инди", posts: "7.3к постов", hot: false },
];

export const SUGGESTIONS = [
  { name: "GlitchHunter", handle: "glitchhunter", bio: "Нахожу баги. Это искусство." },
  { name: "PixelViper", handle: "pixelviper", bio: "Обзоры · RPG · Lore" },
  { name: "SpeedrunQueen", handle: "speedrunq", bio: "WR × 14 · Any% маньяк" },
];

export interface GameInfo {
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

export const GAMES: Record<string, GameInfo> = {
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

export const ALL_GENRES = ["RPG", "Open World", "Action", "Инди", "Shooter", "Симулятор", "Стратегия"];
export const ALL_PLATFORMS = ["PC", "PS5", "Xbox", "Switch", "Mac", "Mobile"];

export type Tab = "feed" | "profile" | "search" | "notifications" | "messages" | "saved" | "trends" | "game" | "catalog";

export function InitialAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
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

export function TagBadge({ tag, onClick }: { tag: string; onClick?: () => void }) {
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

export function PostCard({
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

export interface Review {
  id: number;
  game: string;
  author: string;
  rating: number;
  text: string;
  time: string;
  likes: number;
  liked?: boolean;
}

export const INITIAL_REVIEWS: Review[] = [
  { id: 1, game: "Elden Ring", author: "NightOwl_GG", rating: 10, text: "Шедевр. Каждый угол карты создан вручную — это видно. Бои сложные, но честные. Просто 10 из 10.", time: "2 дня назад", likes: 248 },
  { id: 2, game: "Elden Ring", author: "PixelViper", rating: 9, text: "Боссы — это искусство. Но иногда баланс хромает: Маления слишком сильна по сравнению с остальными.", time: "5 дней назад", likes: 87 },
  { id: 3, game: "Baldur's Gate 3", author: "LootGoblin", rating: 10, text: "180 часов — и ни секунды не пожалел. Larian создали новый стандарт для RPG.", time: "1 день назад", likes: 312 },
  { id: 4, game: "Cyberpunk 2077", author: "GlitchHunter", rating: 8, text: "После всех патчей — отличная игра. Если бы такой релиз был в 2020, это была бы GOTY.", time: "3 дня назад", likes: 156 },
  { id: 5, game: "Hollow Knight", author: "RetroFrame", rating: 10, text: "Идеальная метроидвания. Атмосфера, музыка, дизайн уровней — всё на высочайшем уровне.", time: "неделю назад", likes: 421 },
  { id: 6, game: "Hades", author: "SpeedrunQueen", rating: 9, text: "Лучший рогалик. Сюжет, который раскрывается через геймплей — это гениально.", time: "4 дня назад", likes: 198 },
  { id: 7, game: "Stardew Valley", author: "RetroFrame", rating: 9, text: "Один человек сделал лучший симулятор фермы. Терапевтическая игра.", time: "2 недели назад", likes: 134 },
];
