import Icon from "@/components/ui/icon";
import { Textarea } from "@/components/ui/textarea";
import { InitialAvatar } from "../../constants";

interface NewPostComposerProps {
  newPostText: string;
  setNewPostText: (v: string) => void;
  handlePublish: () => void;
}

export function NewPostComposer({ newPostText, setNewPostText, handlePublish }: NewPostComposerProps) {
  return (
    <div className="px-6 py-5 border-b border-white/5">
      <div className="flex gap-4">
        <InitialAvatar name="ВЫ" />
        <div className="flex-1">
          <Textarea
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            placeholder="Что происходит в игровом мире?"
            className="resize-none border-0 border-b border-white/10 rounded-none focus:border-violet-500/50 focus-visible:ring-0 px-0 text-zinc-100 placeholder:text-zinc-600 text-sm mb-3 bg-transparent"
            rows={3}
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
                <Icon name="Image" size={18} />
              </button>
              <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
                <Icon name="Hash" size={18} />
              </button>
              <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
                <Icon name="Smile" size={18} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              {newPostText.length > 0 && (
                <span className={`text-xs ${newPostText.length > 240 ? "text-rose-400" : "text-zinc-500"}`}>
                  {280 - newPostText.length}
                </span>
              )}
              <button
                onClick={handlePublish}
                disabled={!newPostText.trim() || newPostText.length > 280}
                className="px-4 py-1.5 bg-violet-600 text-white text-sm rounded-lg disabled:opacity-30 hover:bg-violet-500 transition-colors font-medium"
              >
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
