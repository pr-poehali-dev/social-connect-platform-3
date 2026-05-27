import { Post, InitialAvatar, PostCard } from "../../constants";

interface ProfileViewProps {
  posts: Post[];
  openGame: (tag: string) => void;
  handleLike: (id: number) => void;
  handleRepost: (id: number, comment: string) => void;
  handleSave: (id: number) => void;
}

export function ProfileView({ posts, openGame, handleLike, handleRepost, handleSave }: ProfileViewProps) {
  return (
    <div>
      <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5">
        <h1 className="font-semibold text-white">Профиль</h1>
      </div>

      <div className="h-28 bg-gradient-to-br from-violet-900/40 via-zinc-900 to-cyan-900/30" />

      <div className="px-6 pb-8">
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

        <div className="flex gap-6 mb-6">
          <div>
            <span className="font-bold text-white">0</span>
            <span className="text-zinc-500 text-sm ml-1">подписок</span>
          </div>
          <div>
            <span className="font-bold text-white">0</span>
            <span className="text-zinc-500 text-sm ml-1">подписчиков</span>
          </div>
        </div>

        <div className="border-t border-white/5 pt-5">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Ваши посты</h3>
          {posts.filter((p) => p.handle === "you").length === 0 ? (
            <p className="text-sm text-zinc-600">Вы ещё ничего не публиковали</p>
          ) : (
            posts.filter((p) => p.handle === "you").map((post) => (
              <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} onTagClick={openGame} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
