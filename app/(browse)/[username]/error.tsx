"use client";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function ErrorPage() {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground ">
      <p>Something went wrong</p>
      <Button variant={"secondary"} asChild>
        <Link href={"/"} prefetch={false}>
          Go Back Home
        </Link>
      </Button>
    </div>
  );
}

export default ErrorPage;
