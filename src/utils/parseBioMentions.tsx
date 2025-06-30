import Link from "next/link";

export function parseBioMentions(bio: string) {
  // Match @username pattern (alphanumeric, underscores, and dots)
  const mentionPattern = /@([\w.]+)/g;

  // Split the bio into parts with mentions
  const parts = bio.split(mentionPattern);

  return parts.map((part, index) => {
    // Even indices are regular text, odd indices are usernames
    if (index % 2 === 1) {
      return (
        <Link
          key={index}
          href={`/users/${part}`}
          className="text-primary hover:underline"
        >
          @{part}
        </Link>
      );
    }
    return part;
  });
}
