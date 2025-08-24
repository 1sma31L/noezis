import Post from "@/components/content/Post";
import Answer from "@/components/content/Answer";
import Question from "@/components/content/Question";
import QuickTake from "@/components/content/QuickTake";
import WhatDoYouThink from "@/components/pages/WhatDoYouThink";
import React from "react";
import { api } from "@/trpc/server";

async function Home() {
  const posts = await api.post.all();
  const quickTakes = await api.content.getQuickTakes();
  const questions = await api.content.getQuestions();
  const answers = await api.content.getAnswers();
  return (
    <main className="relative flex min-h-screen flex-col items-start justify-start gap-4">
      <WhatDoYouThink />
      {questions.map((question) => (
        <Question key={question.id} {...question} />
      ))}
      {answers.map((answer) => (
        <Answer key={answer.id} {...answer} />
      ))}
      {quickTakes.map((quickTake) => (
        <QuickTake key={quickTake.id} {...quickTake} />
      ))}
      {posts.map((post) => {
        return <Post key={post.id} {...post} />;
      })}
    </main>
  );
}

export default Home;
