"use client";
import { useParams } from "next/navigation";

export default function QuestionPage() {
  const { id } = useParams();
  return <div>QuestionPage {id}</div>;
}
