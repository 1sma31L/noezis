import SuggestedAccounts from "@/components/SuggestedAccounts";
import SuggestedQuestions from "@/components/SuggestedQuestions";

function Explore() {
  return (
    <main className="container mx-auto max-w-4xl space-y-12 py-6">
      <SuggestedAccounts />
      <SuggestedQuestions />
    </main>
  );
}

export default Explore;
