import React from "react";
import { RiChat1Line } from "react-icons/ri";
import { Card } from "@/components/ui/card";

function UserComments() {
  return (
    <div className="container mx-auto w-full max-w-full">
      <Card className="bg-background w-full rounded-xl border shadow-sm">
        <div className="flex min-h-[300px] w-full flex-col items-center justify-center p-8 text-center">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="bg-muted/10 rounded-full p-6 transition-colors">
              <RiChat1Line className="text-muted-foreground h-12 w-12" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">
                No comments yet
              </h2>
              <p className="text-muted-foreground mx-auto max-w-md text-base">
                When this user comments on posts or answers, they&apos;ll appear
                here.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default UserComments;
