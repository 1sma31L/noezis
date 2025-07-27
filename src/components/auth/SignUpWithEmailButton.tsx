import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RiMailLine } from "react-icons/ri";

export default function SignUpWithEmailButton() {
  return (
    <Button className="w-full rounded-lg" size={"lg"} variant="outline">
      <RiMailLine className="mr-2" />
      <Link href="/signup" className="">
        Sign up with Email
      </Link>
    </Button>
  );
}
