import Link from "next/link";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import SignInWithProviderButton from "@/components/SignInWithProviderButton";
import SignUpWithEmailButton from "@/components/SignUpWithEmailButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-8 lg:justify-center">
      {/* CARD */}
      <div className="flex flex-col items-center justify-between pt-10 lg:relative lg:flex-row lg:px-10 lg:pt-0">
        <div className="hidden w-[300px] lg:block"></div>{" "}
        <Image
          src="/hero.jpg"
          alt="Hero Picture"
          width={1000}
          height={1000}
          className="flex-1 lg:rounded-4xl dark:brightness-75"
        />{" "}
        <Card className="shadow-4xl absolute top-52 left-1/2 z-10 flex w-[90%] -translate-x-1/2 flex-col items-center justify-center rounded-xl shadow-2xl sm:top-72 sm:w-[400px] lg:top-1/2 lg:left-0 lg:ml-10 lg:translate-x-0 lg:-translate-y-1/2 lg:rounded-4xl">
          <CardHeader className="flex w-full flex-col items-center justify-center gap-2">
            <CardTitle className="text-center text-2xl tracking-tight lg:text-4xl">
              Discuss, Share, and Connect with{" "}
              <span className="from-primary/90 to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
                Noezis
              </span>
            </CardTitle>
            <CardDescription className="text-center text-sm lg:text-base">
              Noezis is a social media platform for the modern age.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex w-full flex-col items-center justify-center gap-4">
            <SignInWithProviderButton provider="google" />
            <SignInWithProviderButton provider="github" />
            <div className="text-muted-foreground text-center text-sm">
              or continue to{" "}
            </div>
            <SignUpWithEmailButton />
          </CardContent>
          <CardFooter className="flex w-full flex-col items-center justify-center gap-2">
            <div className="text-muted-foreground text-center text-xs">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary">
                Privacy Policy
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
