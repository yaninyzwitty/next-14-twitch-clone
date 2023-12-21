import {UserButton} from "@clerk/nextjs";
import Results, {ResultsSkeleton} from "./_components/results";
import {Suspense} from "react";

export default function Home() {
  return (
    <div className=" p-8 h-full max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
