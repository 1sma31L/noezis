"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { NotificationCard } from "@/components/pages/notifications/NotificationCard";

export interface mockNotificationsProps {
  id: number;
  type: "answer" | "upvote" | "comment" | "question";
  user: {
    name: string;
    username: string;
    image: string;
    isVerified: boolean;
  };
  content: string;
  questionTitle?: string;
  comment?: string;
  time: string;
  read: boolean;
}

// Mock data for demonstration
const mockNotifications: mockNotificationsProps[] = [
  {
    id: 1,
    type: "answer",
    user: {
      name: "John Doe",
      username: "johndoe",
      image: "https://github.com/shadcn.png",
      isVerified: true,
    },
    content: "answered your question about React hooks",
    questionTitle: "How do React hooks work?",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "upvote",
    user: {
      name: "Jane Smith",
      username: "janesmith",
      image: "https://github.com/shadcn.png",
      isVerified: false,
    },
    content: "upvoted your answer about TypeScript interfaces",
    time: "5 hours ago",
    read: true,
  },
  {
    id: 3,
    type: "comment",
    user: {
      name: "Alex Johnson",
      username: "alexj",
      image: "https://github.com/shadcn.png",
      isVerified: true,
    },
    content: "commented on your answer about Next.js routing",
    comment: "This is really helpful, thanks for the detailed explanation!",
    time: "1 day ago",
    read: false,
  },
  {
    id: 4,
    type: "question",
    user: {
      name: "Sarah Wilson",
      username: "sarahw",
      image: "https://github.com/shadcn.png",
      isVerified: false,
    },
    content: "asked a question you might be interested in",
    questionTitle: "Best practices for state management in React",
    time: "2 days ago",
    read: true,
  },
];

function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-3 py-4 sm:gap-6 sm:px-4 sm:py-8">
      <div className="flex items-center justify-between px-2">
        <div className="space-y-0.5 sm:space-y-1">
          <h1 className="text-xl font-bold sm:text-2xl">Notifications</h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Stay updated with your latest activities
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-[10px] sm:h-9 sm:text-xs"
          onClick={markAllAsRead}
        >
          Mark all as read
        </Button>
      </div>
      <div className="flex flex-col gap-2 sm:gap-4">
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    </main>
  );
}

export default Notifications;
