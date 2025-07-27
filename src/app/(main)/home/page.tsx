import Post from "@/components/content/Post";
import Answer from "@/components/content/Answer";
import Question from "@/components/content/Question";
import QuickTake from "@/components/content/QuickTake";
import WhatDoYouThink from "@/components/pages/WhatDoYouThink";
import React from "react";
import { api } from "@/trpc/server";
import { Loader2 } from "lucide-react";
import { auth } from "@/server/lib/auth";
import { headers } from "next/headers";

// const posts = [
//   {
//     user: {
//       id: 1,
//       name: "Charlie Brooker",
//       username: "charliebrooker",
//       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
//       job: "Writer & Creator of Black Mirror",
//       isVerified: true,
//     },
//     id: 1,
//     title: "The Impact of Black Mirror",
//     upvotes: Math.floor(Math.random() * 500),
//     downvotes: Math.floor(Math.random() * 50),
//     comments: Math.floor(Math.random() * 100),
//     shares: Math.floor(Math.random() * 30),
//     views: Math.floor(Math.random() * 5000),
//     date: "2021-01-01",
//     content: `Black Mirror is a groundbreaking anthology series created by Charlie Brooker that explores the dark and often dystopian sides of modern society and technology. Each episode presents a standalone story, delving into themes such as surveillance, artificial intelligence, social media, and the unintended consequences of technological advancement.

// The show is renowned for its thought-provoking narratives and its ability to hold a mirror up to our own world, forcing viewers to question the role technology plays in our lives. From the chilling world of "Nosedive," where social status is determined by ratings, to the haunting digital afterlife of "San Junipero," Black Mirror challenges us to consider both the promise and peril of innovation.

// By blending science fiction with social commentary, Black Mirror has become a cultural touchstone, sparking conversations about ethics, privacy, and the future of humanity. Its influence can be seen in how we discuss technology today, making it one of the most important series of the 21st century.`,

//     thumbnail:
//       "https://images.hindustantimes.com/img/2022/05/16/1600x900/bm_1652705745405_1652705756503.png",
//     tags: ["astronomy", "space", "universe"],
//   },
//   {
//     user: {
//       id: 2,
//       name: "Jane Doe",
//       username: "janedoe",
//       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
//       job: "AI Researcher",
//       isVerified: true,
//     },
//     id: 2,
//     title: "The Rise of Artificial Intelligence",
//     date: "2021-01-02",
//     content: `Artificial Intelligence (AI) is rapidly transforming the world around us. From virtual assistants and recommendation systems to self-driving cars and advanced robotics, AI technologies are becoming an integral part of our daily lives.

// AI leverages large datasets and powerful algorithms to learn patterns, make predictions, and automate complex tasks. Machine learning, a subset of AI, enables computers to improve their performance over time without being explicitly programmed for every scenario.

// The impact of AI is seen across industries: healthcare uses AI for diagnostics and drug discovery, finance relies on AI for fraud detection and algorithmic trading, and education benefits from personalized learning experiences. However, the rise of AI also brings important questions about ethics, job displacement, and the need for responsible development.

// As AI continues to evolve, it holds the promise of solving some of humanity's biggest challenges, while also requiring us to thoughtfully consider its implications for society.`,
//     thumbnail:
//       "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
//     upvotes: Math.floor(Math.random() * 500),
//     downvotes: Math.floor(Math.random() * 50),
//     comments: Math.floor(Math.random() * 100),
//     shares: Math.floor(Math.random() * 30),
//     views: Math.floor(Math.random() * 5000),
//     tags: ["astronomy", "space", "universe"],
//   },
// ];

const questions = [
  {
    id: 1,
    title: "What's the future of quantum computing in AI applications?",
    content: `I've been following recent developments in quantum computing, and I'm curious about its potential impact on AI. Specifically:

1. How might quantum computing accelerate machine learning algorithms?
2. What are the current limitations of quantum computing in AI applications?
3. When can we realistically expect quantum computers to make a significant impact in AI development?

I'd appreciate insights from those working in either quantum computing or AI fields.`,
    user: {
      id: 4,
      name: "Sarah Chen",
      username: "sarahchen",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      job: "Quantum Computing Researcher",
      isVerified: true,
    },
    date: "2024-03-19",
    tags: [
      "quantum-computing",
      "artificial-intelligence",
      "technology",
      "research",
    ],
    upvotes: Math.floor(Math.random() * 200),
    downvotes: Math.floor(Math.random() * 20),
    answers: Math.floor(Math.random() * 15),
    views: Math.floor(Math.random() * 2000),
    isAnswered: false,
    shares: Math.floor(Math.random() * 10),
  },
  {
    id: 2,
    title: "Best practices for implementing WebAssembly in React applications?",
    content: `I'm working on optimizing a computationally intensive React application and considering WebAssembly integration. I'd love to hear from developers who have experience with this:

- What are the key considerations when deciding which parts to move to WebAssembly?
- Are there specific tools or frameworks you recommend for React + WebAssembly integration?
- How do you handle the communication between React components and WebAssembly modules?
- What performance improvements have you seen in real-world applications?`,
    user: {
      id: 5,
      name: "Michael Zhang",
      username: "michaelzhang",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      job: "Senior Frontend Engineer",
      isVerified: false,
    },
    date: "2024-03-20",
    tags: ["react", "webassembly", "performance", "javascript"],
    upvotes: Math.floor(Math.random() * 300),
    downvotes: Math.floor(Math.random() * 30),
    answers: Math.floor(Math.random() * 25),
    views: Math.floor(Math.random() * 3000),
    isAnswered: true,
    shares: Math.floor(Math.random() * 100),
  },
];

const exampleAnswer = {
  question: {
    id: 3,
    title: "What are the ethical implications of AI development?",
    content:
      "As AI technology continues to advance rapidly, I'm curious about the ethical considerations we need to address. What are the key ethical challenges we face in AI development, and how can we ensure responsible innovation?",
    user: {
      id: 3,
      name: "Alex Thompson",
      username: "alexthompson",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      job: "Ethics Researcher",
      isVerified: false,
    },
    date: "2024-03-15",
    tags: ["AI", "Ethics", "Technology", "Innovation"],
  },
  answer: {
    id: 1,
    content: `The ethical implications of AI development are complex and multifaceted. Here are the key considerations:

1. Bias and Fairness: AI systems can perpetuate and amplify existing societal biases if trained on biased data. We must ensure AI systems are developed with diverse, representative datasets and regularly tested for bias.

2. Privacy and Data Protection: AI requires vast amounts of data, raising concerns about data collection, storage, and usage. We need robust frameworks for data governance and user privacy protection.

3. Transparency and Accountability: Many AI systems operate as "black boxes," making it difficult to understand their decision-making process. We need mechanisms for explainable AI and clear accountability structures.

4. Job Displacement: AI automation could lead to significant workforce changes. We need strategies to support affected workers and ensure economic transitions are managed responsibly.

5. Safety and Security: As AI systems become more powerful, ensuring they operate safely and securely becomes crucial. This includes protection against malicious use and unintended consequences.

To ensure responsible innovation, we need:
- Strong ethical guidelines and regulatory frameworks
- Diverse perspectives in AI development
- Regular impact assessments
- Ongoing dialogue between technologists, ethicists, and the public
- Investment in AI safety research`,
    user: {
      id: 4,
      name: "Dr. Sarah Chen",
      username: "drschen",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      job: "AI Ethics Professor",
      isVerified: true,
    },
    date: "2024-03-16",
    upvotes: 156,
    downvotes: 3,
    comments: 42,
    isAccepted: true,
    shares: Math.floor(Math.random() * 10),
  },
};

const quickTakes = [
  {
    id: 1,
    content:
      "Just tried the new GPT-4 API - the improvement in context understanding is mind-blowing! It's handling complex, multi-step tasks with much better accuracy than previous versions. Game-changer for AI development. 🚀",
    user: {
      id: 6,
      name: "David Kim",
      username: "davidkim",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      job: "AI Developer",
      isVerified: false,
    },
    date: "2024-03-20",
    upvotes: Math.floor(Math.random() * 100),
    downvotes: Math.floor(Math.random() * 10),
    shares: Math.floor(Math.random() * 20),
    tags: ["AI", "GPT-4", "tech"],
    comments: Math.floor(Math.random() * 10),
  },
  {
    id: 2,
    content:
      "Hot take: The future of web development isn't about frameworks, it's about compiler technology. Look at Svelte, Solid, and now Qwik - they're all pushing the boundaries of what's possible at compile time. Traditional runtime-heavy frameworks will become legacy tech. 🔥",
    user: {
      id: 7,
      name: "Emma Wilson",
      username: "emmawilson",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      job: "Tech Lead",
      isVerified: true,
    },
    date: "2024-03-20",
    upvotes: Math.floor(Math.random() * 150),
    downvotes: Math.floor(Math.random() * 15),
    shares: Math.floor(Math.random() * 25),
    tags: ["webdev", "frameworks", "future"],
    comments: Math.floor(Math.random() * 10),
  },
];

async function Home() {
  const posts = await api.post.all();
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!posts) return <div>No posts found</div>;
  const isOwner = session?.user?.id === posts[0]?.authorId;
  return (
    <main className="relative flex min-h-screen flex-col items-start justify-start gap-4">
      <WhatDoYouThink isOwner={isOwner} />
      {questions.map((question) => (
        <Question key={question.id} {...question} />
      ))}
      {quickTakes.map((quickTake) => (
        <QuickTake key={quickTake.id} {...quickTake} />
      ))}
      <Answer {...exampleAnswer} />
      {posts?.map((post) => {
        return <Post key={post.id} {...post} />;
      })}
    </main>
  );
}

export default Home;
