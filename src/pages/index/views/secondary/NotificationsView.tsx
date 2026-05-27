import Icon from "@/components/ui/icon";
import { Notification } from "../../constants";

interface NotificationsViewProps {
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  openGame: (tag: string) => void;
}

export function NotificationsView({ notifications, unreadCount, markAllRead, openGame }: NotificationsViewProps) {
  return (
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
          onClick={() => n.game && openGame(n.game)}
          className={`flex items-start gap-4 px-6 py-4 border-b border-white/5 transition-colors ${
            n.type === "achievement"
              ? "bg-gradient-to-r from-amber-500/10 to-transparent border-l-2 border-l-amber-500/60 cursor-pointer hover:from-amber-500/15"
              : !n.read
                ? "bg-violet-500/5"
                : "hover:bg-white/[0.02]"
          }`}
        >
          {n.type === "achievement" ? (
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30 text-lg leading-none">
              {n.medal}
            </div>
          ) : (
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
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-zinc-200">
              <span className={`font-medium ${n.type === "achievement" ? "text-amber-300" : "text-white"}`}>{n.user}</span>{" "}
              <span className="text-zinc-300">{n.text}</span>
            </p>
            <span className="text-xs text-zinc-600">{n.time}</span>
          </div>
          {!n.read && (
            <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${n.type === "achievement" ? "bg-amber-400" : "bg-violet-400"}`} />
          )}
        </div>
      ))}
    </div>
  );
}
