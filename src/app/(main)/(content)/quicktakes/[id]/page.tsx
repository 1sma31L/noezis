"use client";
import QuickTake from "@/components/content/QuickTake";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function QuickTakesPage() {
  const { id } = useParams();
  const { data: quickTake } = api.content.getQuickTake.useQuery({
    id: id as string,
  });
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  useEffect(() => {
    scrollToTop();
  }, []);
  if (!quickTake) return <div>Quick take not found</div>;
  return (
    <div className="flex flex-col gap-4">
      <QuickTake {...quickTake} />
    </div>
  );
}
