import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SignUpWithEmailForm from "@/components/SignUpWithEmailForm";
import SignInWithProviderButton from "@/components/SignInWithProviderButton";

export default function SignUp() {
  return (
    <main className="bg-background flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-center text-3xl font-bold">Create Account</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <SignInWithProviderButton provider="google" />
            <SignInWithProviderButton provider="github" />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="text-muted-foreground px-2">
                Or continue with email
              </span>
            </div>
          </div>
          <SignUpWithEmailForm />
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground w-full text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
