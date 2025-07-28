import Post from "@/components/content/Post";
import Answer from "@/components/content/Answer";
import Question from "@/components/content/Question";
import QuickTake from "@/components/content/QuickTake";
import WhatDoYouThink from "@/components/pages/WhatDoYouThink";
import React from "react";
import { api } from "@/trpc/server";
import { auth } from "@/server/lib/auth";
import { headers } from "next/headers";

// const questions = [
//   {
//     id: 1,
//     title: "What's the future of quantum computing in AI applications?",
//     content: `I've been following recent developments in quantum computing, and I'm curious about its potential impact on AI. Specifically:

// 1. How might quantum computing accelerate machine learning algorithms?
// 2. What are the current limitations of quantum computing in AI applications?
// 3. When can we realistically expect quantum computers to make a significant impact in AI development?

// I'd appreciate insights from those working in either quantum computing or AI fields.`,
//     user: {
//       id: 4,
//       name: "Sarah Chen",
//       username: "sarahchen",
//       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
//       job: "Quantum Computing Researcher",
//       isVerified: true,
//     },
//     date: "2024-03-19",
//     tags: [
//       "quantum-computing",
//       "artificial-intelligence",
//       "technology",
//       "research",
//     ],
//     upvotes: Math.floor(Math.random() * 200),
//     downvotes: Math.floor(Math.random() * 20),
//     answers: Math.floor(Math.random() * 15),
//     views: Math.floor(Math.random() * 2000),
//     isAnswered: false,
//     shares: Math.floor(Math.random() * 10),
//   },
//   {
//     id: 2,
//     title: "Best practices for implementing WebAssembly in React applications?",
//     content: `I'm working on optimizing a computationally intensive React application and considering WebAssembly integration. I'd love to hear from developers who have experience with this:

// - What are the key considerations when deciding which parts to move to WebAssembly?
// - Are there specific tools or frameworks you recommend for React + WebAssembly integration?
// - How do you handle the communication between React components and WebAssembly modules?
// - What performance improvements have you seen in real-world applications?`,
//     user: {
//       id: 5,
//       name: "Michael Zhang",
//       username: "michaelzhang",
//       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
//       job: "Senior Frontend Engineer",
//       isVerified: false,
//     },
//     date: "2024-03-20",
//     tags: ["react", "webassembly", "performance", "javascript"],
//     upvotes: Math.floor(Math.random() * 300),
//     downvotes: Math.floor(Math.random() * 30),
//     answers: Math.floor(Math.random() * 25),
//     views: Math.floor(Math.random() * 3000),
//     isAnswered: true,
//     shares: Math.floor(Math.random() * 100),
//   },
// ];

// const exampleAnswer = {
//   question: {
//     id: 3,
//     title: "What are the ethical implications of AI development?",
//     content:
//       "As AI technology continues to advance rapidly, I'm curious about the ethical considerations we need to address. What are the key ethical challenges we face in AI development, and how can we ensure responsible innovation?",
//     user: {
//       id: 3,
//       name: "Alex Thompson",
//       username: "alexthompson",
//       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
//       job: "Ethics Researcher",
//       isVerified: false,
//     },
//     date: "2024-03-15",
//     tags: ["AI", "Ethics", "Technology", "Innovation"],
//   },
//   answer: {
//     id: 1,
//     content: `The ethical implications of AI development are complex and multifaceted. Here are the key considerations:

// 1. Bias and Fairness: AI systems can perpetuate and amplify existing societal biases if trained on biased data. We must ensure AI systems are developed with diverse, representative datasets and regularly tested for bias.

// 2. Privacy and Data Protection: AI requires vast amounts of data, raising concerns about data collection, storage, and usage. We need robust frameworks for data governance and user privacy protection.

// 3. Transparency and Accountability: Many AI systems operate as "black boxes," making it difficult to understand their decision-making process. We need mechanisms for explainable AI and clear accountability structures.

// 4. Job Displacement: AI automation could lead to significant workforce changes. We need strategies to support affected workers and ensure economic transitions are managed responsibly.

// 5. Safety and Security: As AI systems become more powerful, ensuring they operate safely and securely becomes crucial. This includes protection against malicious use and unintended consequences.

// To ensure responsible innovation, we need:
// - Strong ethical guidelines and regulatory frameworks
// - Diverse perspectives in AI development
// - Regular impact assessments
// - Ongoing dialogue between technologists, ethicists, and the public
// - Investment in AI safety research`,
//     user: {
//       id: 4,
//       name: "Dr. Sarah Chen",
//       username: "drschen",
//       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
//       job: "AI Ethics Professor",
//       isVerified: true,
//     },
//     date: "2024-03-16",
//     upvotes: 156,
//     downvotes: 3,
//     comments: 42,
//     isAccepted: true,
//     shares: Math.floor(Math.random() * 10),
//   },
// };

async function Home() {
  const posts = await api.post.all();
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const quickTakes = await api.content.getQuickTakesOfUser();
  if (!posts) return <div>No posts found</div>;
  const isOwner = session?.user?.id === posts[0]?.authorId;
  return (
    <main className="relative flex min-h-screen flex-col items-start justify-start gap-4">
      <WhatDoYouThink isOwner={isOwner} />
      {quickTakes.map((quickTake) => (
        <QuickTake key={quickTake.id} {...quickTake} />
      ))}
      {posts?.map((post) => {
        return <Post key={post.id} {...post} />;
      })}
      {/* {questions.map((question) => (
        <Question key={question.id} {...question} />
      ))}
      <Answer {...exampleAnswer} /> */}
    </main>
  );
}

export default Home;
