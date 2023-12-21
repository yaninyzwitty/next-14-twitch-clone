import React from "react";
import UserAvatar from "./user-avatar";
import Image from "next/image";
import {Skeleton} from "./ui/skeleton";
import LiveBadge from "./live-badge";

type Props = {
  src: string | null;
  fallback: string;
  isLive: boolean;
  username: string;
};

function Thubmnail({src, fallback, isLive, username}: Props) {
  let content;

  if (!src) {
    content = (
      <div className="bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md">
        <UserAvatar
          imageUrl={fallback}
          isLive={isLive}
          size={"lg"}
          showBadge
          username={username}
        />
      </div>
    );
  } else {
    content = (
      <Image
        src={src}
        fill
        alt="Thumbnail"
        className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
      />
    );
  }
  return (
    <div className="group aspect-video relative rounded-md cursor-pointer">
      <div className="rounded-md absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
      {content}
      {isLive && src && (
        <div className="absolute top-2 left-2 group-hover:-translate-y-2 translate-x-2 transition-transform">
          <LiveBadge />
        </div>
      )}
    </div>
  );
}

export default Thubmnail;

export const ThumbnailSkeleton = () => {
  return (
    <div className="group aspect-video relative rounded-xl cursor-pointer">
      <Skeleton className=" h-full w-full" />
    </div>
  );
};
