import { Notification } from "../../constants";
import { StickyHeader } from "./shared/StickyHeader";
import { NotificationItem } from "./notifications/NotificationItem";

interface NotificationsViewProps {
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  openGame: (tag: string) => void;
}

export function NotificationsView({ notifications, unreadCount, markAllRead, openGame }: NotificationsViewProps) {
  return (
    <div>
      <StickyHeader
        title="Уведомления"
        right={
          unreadCount > 0 ? (
            <button onClick={markAllRead} className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors">
              Прочитать все
            </button>
          ) : null
        }
      />
      {notifications.map((n) => (
        <NotificationItem
          key={n.id}
          notification={n}
          onClick={() => n.game && openGame(n.game)}
        />
      ))}
    </div>
  );
}
