import { SUGGESTIONS, InitialAvatar } from "../../../constants";

export function SuggestionsList() {
  return (
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
  );
}
