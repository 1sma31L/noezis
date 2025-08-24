"use client";
import { useParams } from "next/navigation";

export default function PostPage() {
  const { id } = useParams();
  return <div>PostPage {id}</div>;
}
