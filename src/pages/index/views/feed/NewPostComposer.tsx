import { Textarea } from "@/components/ui/textarea";
import { InitialAvatar } from "../../constants";
import { ComposerToolbar } from "./ComposerToolbar";

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
          <ComposerToolbar newPostText={newPostText} handlePublish={handlePublish} />
        </div>
      </div>
    </div>
  );
}
