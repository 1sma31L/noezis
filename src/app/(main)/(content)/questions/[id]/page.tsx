"use client";
import { useParams } from "next/navigation";
import ContentPage from "@/components/content/ContentPage";

export default function QuestionPage() {
  const { id } = useParams();
  return <ContentPage contentType="question" contentId={id as string} />;
}
