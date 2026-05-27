import { StickyHeader } from "./shared/StickyHeader";
import { EmptyState } from "./shared/EmptyState";

export function MessagesView() {
  return (
    <div>
      <StickyHeader title="Сообщения" />
      <EmptyState
        icon="Mail"
        title="Прямые сообщения"
        description="Обсуждайте игры напрямую с другими геймерами"
        action={
          <button className="px-4 py-2 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-500 transition-colors">
            Написать сообщение
          </button>
        }
      />
    </div>
  );
}
