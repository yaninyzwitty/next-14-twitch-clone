"use client";

import React from "react";
import {Button} from "../ui/button";
import {useAuth} from "@clerk/nextjs";
import {Heart} from "lucide-react";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {unFollow, onFollow} from "@/actions/follow";
import {useTransition} from "react";
import {toast} from "sonner";
import {Skeleton} from "../ui/skeleton";

type Props = {
  hostIdentity: string;
  isHost: boolean;
  isFollowing: boolean;
};

function Actions({hostIdentity, isFollowing, isHost}: Props) {
  const {userId} = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`You are now following: ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const handleUnFollow = () => {
    startTransition(() => {
      unFollow(hostIdentity)
        .then((data) =>
          toast.success(`You have unfollowed: ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const toggleFollow = () => {
    if (!userId) {
      return router.push("/sign-in");
    }

    if (isHost) return;
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };
  return (
    <Button
      onClick={toggleFollow}
      disabled={isPending || isHost}
      variant={"primary"}
      size={"sm"}
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn(`h-4 w-4 mr-2`, isFollowing ? "fill-white" : "fill-none")}
      />

      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}

export default Actions;

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
