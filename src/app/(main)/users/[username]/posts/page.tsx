"use client";
import React from "react";
import Post from "@/components/pages/home/Post";
import { useProfileByUsername } from "@/lib/hooks/useProfile";
import { use } from "react";

function UserPosts({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const { data: profile } = useProfileByUsername(username);

  const userInfo = {
    id: 1,
    name:
      profile?.user.name ??
      username.charAt(0).toUpperCase() + username.slice(1),
    username: profile?.username ?? username,
    image:
      profile?.user.image ??
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    job: "Tech Enthusiast",
    isVerified: profile?.isVerified ?? true,
  };

  const posts = [
    {
      user: userInfo,
      id: 1,
      title: "The Future of Technology",
      upvotes: 324,
      downvotes: 12,
      comments: 45,
      shares: 15,
      views: 2890,
      date: "2024-03-20",
      content: `Technology is rapidly evolving and shaping our future in unprecedented ways. From artificial intelligence to quantum computing, we're witnessing transformative changes across all sectors of society.

The integration of AI in our daily lives has already begun to show its impact. Smart homes, autonomous vehicles, and personalized digital experiences are just the beginning. The potential applications seem limitless.

As we move forward, it's crucial to consider both the opportunities and challenges these advancements bring. We must ensure that technological progress serves humanity's best interests while addressing concerns about privacy, security, and ethical implications.`,
      thumbnail:
        "https://images.hindustantimes.com/img/2022/05/16/1600x900/bm_1652705745405_1652705756503.png",
      tags: ["technology", "future", "innovation"],
    },
    {
      user: userInfo,
      id: 2,
      title: "Building Sustainable Tech Solutions",
      date: "2024-03-19",
      content: `Sustainability in technology is no longer optional - it's a necessity. As we develop new solutions, we must consider their environmental impact and long-term sustainability.

Green computing initiatives, energy-efficient data centers, and eco-friendly hardware design are becoming increasingly important. We need to focus on creating technology that not only solves problems but does so in an environmentally conscious way.

The tech industry has a unique opportunity to lead the way in sustainable innovation. By incorporating green practices into our development processes, we can create a more sustainable future for generations to come.`,
      thumbnail:
        "https://images.businessnewsdaily.com/app/uploads/2022/04/04082844/1554241953.jpeg",
      upvotes: 456,
      downvotes: 23,
      comments: 67,
      shares: 28,
      views: 3450,
      tags: ["sustainability", "technology", "innovation"],
    },
  ];
  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-start gap-4">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}

export default UserPosts;
