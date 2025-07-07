import type { mockNotificationsProps } from "@/app/(main)/notifications/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  RiCheckboxCircleFill,
  RiMessage2Line,
  RiThumbUpLine,
  RiQuestionLine,
  RiNotificationLine,
  RiTimeLine,
} from "react-icons/ri";

export function NotificationCard({
  notification,
}: {
  notification: mockNotificationsProps;
}) {
  const getNotificationIcon = () => {
    switch (notification.type) {
      case "answer":
        return <RiMessage2Line className="text-blue-500" />;
      case "upvote":
        return <RiThumbUpLine className="text-green-500" />;
      case "comment":
        return <RiMessage2Line className="text-purple-500" />;
      case "question":
        return <RiQuestionLine className="text-orange-500" />;
      default:
        return <RiNotificationLine className="text-gray-500" />;
    }
  };

  return (
    <Card
      className={`w-full transition-colors ${notification.read ? "opacity-80" : "bg-accent/5"}`}
    >
      <CardContent className="flex items-start gap-4 p-4">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={notification.user.image}
              alt={notification.user.name}
            />
            <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="bg-card absolute -right-1 -bottom-1 rounded-full p-0.5">
            {getNotificationIcon()}
          </div>
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {notification.user.name}
              {notification.user.isVerified && (
                <RiCheckboxCircleFill
                  className="ml-1 inline-block"
                  style={{ color: "#2a623d" }}
                />
              )}
            </span>
            <span className="text-muted-foreground text-sm">
              {notification.content}
            </span>
          </div>
          {(notification.type === "answer" ||
            notification.type === "question") && (
            <div className="bg-accent/10 rounded-md p-2 text-sm">
              {notification.questionTitle}
            </div>
          )}
          {notification.type === "comment" && (
            <div className="bg-accent/10 rounded-md p-2 text-sm">
              &quot;{notification.comment}&quot;
            </div>
          )}
          <div className="flex items-center gap-2 pt-1">
            <Badge variant="outline" className="gap-1 text-xs">
              <RiTimeLine className="h-3 w-3" />
              {notification.time}
            </Badge>
            {!notification.read && (
              <Badge className="bg-primary/10 text-primary text-xs">New</Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
