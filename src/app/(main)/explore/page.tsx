import SuggestedAccounts from "@/components/pages/explore/SuggestedAccounts";
import SuggestedQuestions from "@/components/pages/explore/SuggestedQuestions";

function Explore() {
  return (
    <main className="container mx-auto max-w-4xl space-y-12 py-6">
      <SuggestedAccounts />
      <SuggestedQuestions />
    </main>
  );
}

export default Explore;
