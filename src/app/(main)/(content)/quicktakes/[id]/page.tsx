"use client";
import { useParams } from "next/navigation";
import ContentPage from "@/components/content/ContentPage";

export default function QuickTakesPage() {
  const { id } = useParams();
  return <ContentPage contentType="quickTake" contentId={id as string} />;
}
