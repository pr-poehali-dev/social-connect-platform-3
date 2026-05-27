import { Notification } from "../types";

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
