import React from "react";
import { CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  RiCheckboxCircleFill,
  RiFileTextFill,
  RiFlashlightFill,
  RiQuestionLine,
} from "react-icons/ri";
import { Badge } from "../ui/badge";
import { formatDistanceToNow } from "date-fns";

function ContentHeader({
  image,
  name,
  jobTitle,
  isVerified,
  createdAt,
  isAnswered,
  type,
}: {
  image: string;
  name: string;
  jobTitle: string;
  isVerified: boolean;
  createdAt: string;
  isAnswered?: boolean;
  type: "quickTake" | "post" | "question" | "answer";
}) {
  return (
    <CardHeader className="flex w-full flex-row items-center justify-start gap-2 md:gap-4">
      <Avatar className="h-8 w-8 md:h-10 md:w-10">
        <AvatarImage
          src={image ?? ""}
          alt={name ?? ""}
          className="object-cover"
        />
        <AvatarFallback className="bg-primary text-background">
          {name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex w-full flex-1 flex-col items-start justify-start gap-0">
        <p className="flex flex-row items-center justify-start gap-1 text-xs font-medium md:text-base">
          {name}
          {isVerified && (
            <RiCheckboxCircleFill
              style={{
                color: "#2a623d",
                display: "inline-block",
              }}
            />
          )}
        </p>
        {jobTitle && (
          <p className="text-muted-foreground text-[9px] md:text-xs">
            {jobTitle}
          </p>
        )}
      </div>
      <div className="flex flex-row items-center justify-start gap-2">
        {type === "quickTake" && (
          <Badge
            variant="outline"
            className="bg-accent text-accent-foreground rounded-full"
          >
            <RiFlashlightFill className="mr-1 inline-block" />
            Quick Take
          </Badge>
        )}
        {type === "post" && (
          <Badge
            variant="outline"
            className="bg-accent text-accent-foreground rounded-full"
          >
            <RiFileTextFill className="mr-1 inline-block" />
            Post
          </Badge>
        )}
        {type === "question" && (
          <Badge
            variant="outline"
            className={`rounded-full ${
              isAnswered
                ? "bg-green-500/10 text-green-500"
                : "bg-red-500/10 text-red-500"
            }`}
          >
            {isAnswered ? (
              <RiCheckboxCircleFill className="mr-1 inline-block" />
            ) : (
              <RiQuestionLine className="mr-1 inline-block" />
            )}
            Question
          </Badge>
        )}
        {type === "answer" && (
          <Badge
            variant="outline"
            className="rounded-full bg-green-500/10 text-green-500"
          >
            <RiCheckboxCircleFill className="mr-1 inline-block" />
            Answer
          </Badge>
        )}
        <p className="text-muted-foreground text-[9px] md:text-xs">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </p>
      </div>
    </CardHeader>
  );
}

export default ContentHeader;
