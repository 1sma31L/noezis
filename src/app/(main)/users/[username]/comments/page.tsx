import React from "react";
import { RiChat1Line } from "react-icons/ri";
import { Card } from "@/components/ui/card";

function UserComments() {
  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-start gap-4 py-4">
      <Card className="flex w-full flex-col items-center justify-center p-8 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="bg-muted/20 rounded-full p-4">
            <RiChat1Line className="text-muted-foreground h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">
              No comments yet
            </h2>
            <p className="text-muted-foreground text-sm">
              When this user comments on posts or answers, they&apos;ll appear
              here.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default UserComments;
