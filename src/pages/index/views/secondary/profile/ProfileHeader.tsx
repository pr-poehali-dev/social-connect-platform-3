import { InitialAvatar } from "../../../constants";

export function ProfileCover() {
  return <div className="h-28 bg-gradient-to-br from-violet-900/40 via-zinc-900 to-cyan-900/30" />;
}

export function ProfileIdentity() {
  return (
    <>
      <div className="flex items-end justify-between -mt-7 mb-4">
        <div className="w-16 h-16 bg-zinc-900 rounded-2xl border-2 border-zinc-900 shadow-lg flex items-center justify-center">
          <InitialAvatar name="ВЫ" size="lg" />
        </div>
        <button className="px-4 py-1.5 border border-white/10 rounded-lg text-sm text-zinc-300 hover:bg-white/5 transition-colors font-medium mt-2">
          Редактировать
        </button>
      </div>

      <div className="mb-3">
        <h2 className="text-lg font-bold text-white">Вы</h2>
        <p className="text-zinc-500 text-sm">@you</p>
      </div>

      <p className="text-sm text-zinc-500 mb-5 leading-relaxed">
        Расскажите о себе — любимые игры, жанры, платформы.
      </p>
    </>
  );
}
