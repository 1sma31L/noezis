"use client";
import { useParams } from "next/navigation";

export default function AnswerPage() {
  const { id } = useParams();
  return <div>AnswerPage {id}</div>;
}
