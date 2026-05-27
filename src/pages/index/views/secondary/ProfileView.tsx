import { Post } from "../../constants";
import { StickyHeader } from "./shared/StickyHeader";
import { ProfileCover, ProfileIdentity } from "./profile/ProfileHeader";
import { ProfileStats } from "./profile/ProfileStats";
import { ProfilePostsList } from "./profile/ProfilePostsList";

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
      <StickyHeader title="Профиль" />
      <ProfileCover />
      <div className="px-6 pb-8">
        <ProfileIdentity />
        <ProfileStats follows={0} followers={0} />
        <ProfilePostsList
          posts={posts}
          openGame={openGame}
          handleLike={handleLike}
          handleRepost={handleRepost}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
}
