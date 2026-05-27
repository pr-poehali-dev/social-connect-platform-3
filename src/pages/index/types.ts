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

export type Tab = "feed" | "profile" | "search" | "notifications" | "messages" | "saved" | "trends" | "game" | "catalog";
