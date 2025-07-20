import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";

type QuestionPreviewCardProps = {
  question: {
    id: string;
    title: string;
    user: {
      name: string;
      image: string;
      username: string;
    };
    tags: string[];
    upvotes: number;
    answers: number;
  };
};

function QuestionPreviewCard({ question }: QuestionPreviewCardProps) {
  return (
    <Card
      key={question.id}
      className="hover:bg-muted/50 cursor-pointer p-4 transition-all duration-300"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={question.user.image} alt={question.user.name} />
              <AvatarFallback>{question.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{question.user.name}</span>
              <span className="text-muted-foreground text-xs">
                @{question.user.username}
              </span>
            </div>
          </div>
        </div>
        <Link href={`/questions/${question.id}`} className="group">
          <h2 className="text-lg font-semibold">{question.title}</h2>
        </Link>
        <div className="flex flex-wrap gap-2">
          {question.tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-muted-foreground flex items-center gap-4 text-sm">
          <span>{question.upvotes} upvotes</span>
          <span>{question.answers} answers</span>
        </div>
      </div>
    </Card>
  );
}

export default QuestionPreviewCard;
