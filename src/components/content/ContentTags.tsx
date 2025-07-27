import React from "react";
import { Badge } from "../ui/badge";
import type { PostWithAuthor } from "@/lib/types/post";

function ContentTags({ tags }: { tags: PostWithAuthor["tags"] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {tags?.map((tag) => (
        <Badge
          key={tag}
          className="bg-accent text-muted-foreground text-[9px] md:text-xs"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}

export default ContentTags;
