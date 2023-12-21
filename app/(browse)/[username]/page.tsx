import StreamPlayer from "@/components/stream-player";
import {isBlockByUser} from "@/lib/block-service";
import {isFollowingUser} from "@/lib/follow-service";
import {getUserByUsername} from "@/lib/user-service";
import {notFound} from "next/navigation";
import React from "react";

type Props = {
  params: {
    username: string;
  };
};

async function UsernamePage({params: {username}}: Props) {
  const user = await getUserByUsername(username);

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockByUser(user.id);

  if (isBlocked) {
    return notFound();
  }

  return (
    <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />
  );
}

export default UsernamePage;
