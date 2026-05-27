import { useState } from "react";
import { Notification } from "../types";
import { NOTIFICATIONS } from "../data/social";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const pushAchievement = (medal: "🥇" | "🥈" | "🥉", game: string, place: number, isNew: boolean) => {
    const text = isNew
      ? `Ваш отзыв вывел «${game}» в зал славы — ${place}-е место по оценкам игроков!`
      : `Ваш отзыв поднял «${game}» на ${place}-е место в зале славы!`;
    const newNotif: Notification = {
      id: Date.now() + 1,
      type: "achievement",
      user: "Зал славы",
      text,
      time: "только что",
      read: false,
      medal,
      game,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  return {
    notifications,
    unreadCount,
    markAllRead,
    pushAchievement,
  };
}
