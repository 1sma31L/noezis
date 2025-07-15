import React from "react";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";

function SectionTitle({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="flex items-center justify-between px-2">
      <h1 className="my-2 text-lg font-bold">{title}</h1>
      <Link
        href={href}
        className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs font-light sm:text-sm"
      >
        {description}
        <RiArrowRightLine className="h-4 w-4" />
      </Link>
    </div>
  );
}

export default SectionTitle;
