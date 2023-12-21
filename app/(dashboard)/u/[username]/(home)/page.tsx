import StreamPlayer from "@/components/stream-player";
import {getUserByUsername} from "@/lib/user-service";
import {currentUser} from "@clerk/nextjs";

type Props = {
  params: {
    username: string;
  };
};

async function CreatorPage({params: {username}}: Props) {
  const externalUser = await currentUser();
  const user = await getUserByUsername(username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }
  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
}

export default CreatorPage;
