"use client";
import { useParams } from "next/navigation";
import ContentPage from "@/components/content/ContentPage";

export default function PostPage() {
  const { id } = useParams();
  return <ContentPage contentType="post" contentId={id as string} />;
}
