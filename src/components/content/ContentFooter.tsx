import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  RiThumbUpFill,
  RiThumbUpLine,
  RiThumbDownFill,
  RiThumbDownLine,
  RiMessage2Line,
  RiShareLine,
  RiBookmarkFill,
  RiBookmarkLine,
  RiMoreLine,
  RiTwitterXFill,
  RiFacebookFill,
  RiLinkedinFill,
  RiFileCopyLine,
  RiFlagLine,
} from "react-icons/ri";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner";
import Link from "next/link";
import useReaction from "@/lib/hooks/useReaction";
import type { ContentType } from "@/lib/store/reaction";

const typeToUrlMapping = {
  post: "posts",
  quickTake: "quicktakes",
  question: "questions",
  answer: "answers",
};

function ContentFooter({
  id,
  title,
  type,
  comments = 0,
}: {
  id: string;
  title: string;
  type: ContentType;
  comments?: number;
}) {
  const { isUpvoted, isDownvoted, toggleReaction, reactionCounts } =
    useReaction(id, type);

  const [isSaved, setIsSaved] = useState(false);
  return (
    <div className="flex w-full flex-row items-center justify-between gap-2">
      <div className="flex flex-row items-center justify-start gap-2 md:gap-4">
        {/* Voting */}
        <div className="bg-muted/50 flex h-8 flex-row items-center justify-start gap-2 rounded-full px-2">
          <Button
            variant="ghost"
            size="sm"
            className={`text-muted-foreground hover:text-foreground flex flex-row items-center justify-start gap-2 ${
              isUpvoted ? "text-primary hover:text-primary" : ""
            }`}
            onClick={() => {
              toggleReaction("like");
            }}
          >
            {isUpvoted ? (
              <RiThumbUpFill className="text-primary" />
            ) : (
              <RiThumbUpLine />
            )}
            <span className="text-[9px] md:text-xs">
              {reactionCounts?.likes}
            </span>
          </Button>
          <Separator orientation="vertical" />
          <Button
            variant="ghost"
            size="sm"
            className={`text-muted-foreground hover:text-foreground ${
              isDownvoted ? "text-destructive hover:text-destructive" : ""
            }`}
            onClick={() => {
              toggleReaction("dislike");
            }}
          >
            {isDownvoted ? (
              <RiThumbDownFill className="text-destructive" />
            ) : (
              <RiThumbDownLine />
            )}
            <span className="text-[9px] md:text-xs">
              {reactionCounts?.dislikes}
            </span>
          </Button>
        </div>

        {/* Comments */}
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
          asChild
        >
          <Link href={`/${typeToUrlMapping[type]}/${id}`}>
            <RiMessage2Line />
            <p className="text-[9px] md:text-xs">{comments}</p>
          </Link>
        </Button>

        {/* Shares */}
        {/* Share */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hidden md:flex"
            >
              <RiShareLine />
              <p className="text-[9px] md:text-xs">0</p>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className="w-56">
            <DropdownMenuLabel>Share Post</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                const url = `${window.location.origin}/posts/${id}`;
                window.open(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
                  "_blank",
                );

                // sharePost({ postId: id });
              }}
            >
              <RiTwitterXFill className="mr-2" /> Twitter
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const url = `${window.location.origin}/posts/${id}`;
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                  "_blank",
                );
                // sharePost({ postId: id });
              }}
            >
              <RiFacebookFill className="mr-2" /> Facebook
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const url = `${window.location.origin}/posts/${id}`;
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
                  "_blank",
                );
                // sharePost({ postId: id });
              }}
            >
              <RiLinkedinFill className="mr-2" /> LinkedIn
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                const url = `${window.location.origin}/posts/${id}`;
                void navigator.clipboard.writeText(url);
                toast.success("Link copied to clipboard");
                // sharePost({ postId: id });
              }}
            >
              <RiFileCopyLine className="mr-2" /> Copy Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Save + Settings */}
      <div className="flex flex-row items-center justify-start gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => setIsSaved(!isSaved)}
        >
          {isSaved ? (
            <RiBookmarkFill className="text-yellow-500" />
          ) : (
            <RiBookmarkLine className="text-muted-foreground" />
          )}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <RiMoreLine />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className="w-56">
            <DropdownMenuLabel>More Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                void navigator.clipboard.writeText(id);
                toast.success("Content ID copied to clipboard");
              }}
            >
              <RiFileCopyLine className="mr-2" /> Copy Content ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RiFlagLine className="mr-2" /> Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default ContentFooter;
