import { useState } from "react";

function useExpanded(content: string, initialState: boolean) {
  const [isExpanded, setIsExpanded] = useState(initialState);
  const wordCount = content.trim().split(/\s+/).length;
  const MAX_WORDS = 50;
  const shouldShowMore = wordCount > MAX_WORDS;
  const truncateWords = (text: string, limit: number) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };
  return {
    isExpanded,
    setIsExpanded,
    shouldShowMore,
    truncateWords,
    wordCount,
    MAX_WORDS,
  };
}

export default useExpanded;
