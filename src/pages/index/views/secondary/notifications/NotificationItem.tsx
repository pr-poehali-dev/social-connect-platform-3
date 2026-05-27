import Icon from "@/components/ui/icon";
import { Notification } from "../../../constants";

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
}

const ICON_BY_TYPE: Record<string, string> = {
  like: "Heart",
  comment: "MessageCircle",
  follow: "UserPlus",
  repost: "Repeat2",
};

const COLOR_BY_TYPE: Record<string, string> = {
  like: "bg-rose-500/15 text-rose-400",
  comment: "bg-cyan-500/15 text-cyan-400",
  follow: "bg-emerald-500/15 text-emerald-400",
  repost: "bg-amber-500/15 text-amber-400",
};

export function NotificationItem({ notification: n, onClick }: NotificationItemProps) {
  const isAchievement = n.type === "achievement";

  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-4 px-6 py-4 border-b border-white/5 transition-colors ${
        isAchievement
          ? "bg-gradient-to-r from-amber-500/10 to-transparent border-l-2 border-l-amber-500/60 cursor-pointer hover:from-amber-500/15"
          : !n.read
            ? "bg-violet-500/5"
            : "hover:bg-white/[0.02]"
      }`}
    >
      {isAchievement ? (
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30 text-lg leading-none">
          {n.medal}
        </div>
      ) : (
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${COLOR_BY_TYPE[n.type] ?? ""}`}>
          <Icon name={ICON_BY_TYPE[n.type] ?? "Bell"} size={14} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-zinc-200">
          <span className={`font-medium ${isAchievement ? "text-amber-300" : "text-white"}`}>{n.user}</span>{" "}
          <span className="text-zinc-300">{n.text}</span>
        </p>
        <span className="text-xs text-zinc-600">{n.time}</span>
      </div>
      {!n.read && (
        <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${isAchievement ? "bg-amber-400" : "bg-violet-400"}`} />
      )}
    </div>
  );
}
