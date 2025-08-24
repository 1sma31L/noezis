"use client";
import { useParams } from "next/navigation";
import ContentPage from "@/components/content/ContentPage";

export default function AnswerPage() {
  const { id } = useParams();
  return <ContentPage contentType="answer" contentId={id as string} />;
}
