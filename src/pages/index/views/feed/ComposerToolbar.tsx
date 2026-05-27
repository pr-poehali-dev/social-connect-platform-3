import Icon from "@/components/ui/icon";

interface ComposerToolbarProps {
  newPostText: string;
  handlePublish: () => void;
}

const MAX_LENGTH = 280;
const WARN_LENGTH = 240;

export function ComposerToolbar({ newPostText, handlePublish }: ComposerToolbarProps) {
  const len = newPostText.length;
  const remaining = MAX_LENGTH - len;
  const disabled = !newPostText.trim() || len > MAX_LENGTH;

  return (
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
        {len > 0 && (
          <span className={`text-xs ${len > WARN_LENGTH ? "text-rose-400" : "text-zinc-500"}`}>
            {remaining}
          </span>
        )}
        <button
          onClick={handlePublish}
          disabled={disabled}
          className="px-4 py-1.5 bg-violet-600 text-white text-sm rounded-lg disabled:opacity-30 hover:bg-violet-500 transition-colors font-medium"
        >
          Опубликовать
        </button>
      </div>
    </div>
  );
}
