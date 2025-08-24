"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import {
  MessageCircle,
  Reply,
  Trash2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useSession } from "@/lib/hooks/useSession";

interface CommentSectionProps {
  contentType: "post" | "question" | "answer" | "quickTake";
  contentId: string;
}

interface CommentAuthor {
  user: {
    id: string;
    name: string;
    image?: string | null;
  };
  username: string;
}

interface CommentType {
  id: string;
  authorId: string;
  contentType: "post" | "question" | "answer" | "quickTake";
  contentId: string;
  content: string;
  createdAt: string | Date;
  author: CommentAuthor;
  replies?: CommentType[];
}

interface CommentProps {
  comment: CommentType;
  onReply?: (commentId: string) => void;
  level?: number;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

function Comment({ comment, level = 0 }: CommentProps) {
  const session = useSession();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const utils = api.useUtils();
  const deleteComment = api.content.deleteComment.useMutation({
    onSuccess: () => {
      utils.content.getComments.invalidate();
    },
  });

  const createComment = api.content.createComment.useMutation({
    onSuccess: () => {
      utils.content.getComments.invalidate();
      setReplyContent("");
      setShowReplyForm(false);
    },
  });

  const handleReply = () => {
    if (!replyContent.trim()) return;

    createComment.mutate({
      contentType: comment.contentType,
      contentId: comment.contentId,
      content: replyContent,
      parentCommentId: comment.id,
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this comment?")) {
      deleteComment.mutate({ commentId: comment.id });
    }
  };

  const isOwner = session?.data?.user?.id === comment.authorId;

  const getIndentationClasses = () => {
    if (level === 0) return "space-y-4";

    // Reddit-style: consistent indentation for all reply levels
    return `space-y-4 ml-4 border-l-2 border-muted-foreground/20 pl-3`;
  };

  return (
    <div className={getIndentationClasses()}>
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment.author?.user?.image ?? undefined} />
              <AvatarFallback>
                {comment.author?.user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">
                  {comment.author?.user?.name}
                </span>
                <span className="text-muted-foreground">
                  @{comment.author?.username}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </span>
                {comment.replies && comment.replies.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="text-muted-foreground hover:text-foreground h-auto p-1 text-xs"
                  >
                    {isCollapsed ? (
                      <ChevronRight className="h-3 w-3" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    )}
                    <span className="ml-1">
                      {comment.replies.length} repl
                      {comment.replies.length === 1 ? "y" : "ies"}
                    </span>
                  </Button>
                )}
              </div>

              <p className="text-sm leading-relaxed">{comment.content}</p>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="h-auto p-1 text-xs"
                >
                  <Reply className="mr-1 h-3 w-3" />
                  Reply
                </Button>

                {isOwner && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    className="h-auto p-1 text-xs text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </div>

          {showReplyForm && session?.data && (
            <div className="mt-4 space-y-2">
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[50px] resize-none"
                rows={2}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleReply}
                  disabled={!replyContent.trim() || createComment.isPending}
                >
                  Reply
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowReplyForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Render replies - Reddit style: all at same level when not collapsed */}
      {!isCollapsed &&
        comment.replies?.map((reply: CommentType) => (
          <Comment
            key={reply.id}
            comment={{
              ...reply,
              contentType: comment.contentType,
              contentId: comment.contentId,
            }}
            level={level + 1}
          />
        ))}
    </div>
  );
}

export default function CommentSection({
  contentType,
  contentId,
}: CommentSectionProps) {
  const session = useSession();
  const [newComment, setNewComment] = useState("");

  const { data: comments, isLoading } = api.content.getComments.useQuery({
    contentType,
    contentId,
  });

  const utils = api.useUtils();
  const createComment = api.content.createComment.useMutation({
    onSuccess: () => {
      utils.content.getComments.invalidate();
      setNewComment("");
    },
  });

  const handleSubmit = () => {
    if (!newComment.trim()) return;

    createComment.mutate({
      contentType,
      contentId,
      content: newComment,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center gap-2">
          <div className="bg-muted/50 h-5 w-5 rounded" />
          <div className="bg-muted/50 h-6 w-32 rounded" />
        </div>

        {/* Comment form skeleton */}
        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-muted/50 h-8 w-8 rounded-full" />
            <div className="bg-muted/50 h-4 w-24 rounded" />
          </div>
          <div className="space-y-3">
            <div className="bg-muted/30 h-20 w-full rounded-md" />
            <div className="flex justify-end">
              <div className="bg-muted/50 h-9 w-28 rounded-md" />
            </div>
          </div>
        </div>

        {/* Comments skeleton */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-card rounded-lg border p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="bg-muted/50 h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-muted/50 h-3 w-20 rounded" />
                    <div className="bg-muted/30 h-3 w-16 rounded" />
                    <div className="bg-muted/30 h-3 w-12 rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="bg-muted/30 h-4 w-full rounded" />
                    <div className="bg-muted/30 h-4 w-3/4 rounded" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <div className="bg-muted/30 h-6 w-12 rounded" />
                    <div className="bg-muted/30 h-6 w-12 rounded" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        <h3 className="text-lg font-semibold">
          Comments ({comments?.length ?? 0})
        </h3>
      </div>

      {/* Add comment form */}
      {session?.data && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session.data.user?.image ?? undefined} />
                <AvatarFallback>
                  {session.data.user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">
                {session.data.user?.name}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[60px] resize-none"
              rows={2}
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={!newComment.trim() || createComment.isPending}
              >
                {createComment.isPending ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comments list */}
      <div className="space-y-4">
        {comments?.length === 0 ? (
          <div className="text-muted-foreground py-8 text-center">
            <MessageCircle className="mx-auto mb-3 h-12 w-12 opacity-50" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments?.map((commentItem) => (
            <Comment
              key={commentItem.id}
              comment={{ ...commentItem, contentType, contentId }}
            />
          ))
        )}
      </div>
    </div>
  );
}
