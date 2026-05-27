import Icon from "@/components/ui/icon";

export function MessagesView() {
  return (
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
  );
}
