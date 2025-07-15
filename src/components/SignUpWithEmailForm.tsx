"use client";
import { signUp } from "@/lib/clients/auth-client";
import { signUpSchema } from "@/lib/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpSchema) => {
    try {
      const result = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (result.error) {
        setError("root", {
          message: result.error.message ?? "Failed to sign up",
        });
        return;
      }

      toast.success("Signed up successfully");
      router.push("/home");
    } catch (error) {
      toast.error("Failed to sign up");
      setError("root", {
        message: `An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Full Name
        </label>
        <Input
          type="text"
          id="name"
          placeholder="Enter your full name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-destructive text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Email
        </label>
        <Input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-destructive text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Password
        </label>
        <Input
          type="password"
          id="password"
          placeholder="Choose a password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-destructive text-sm">{errors.password.message}</p>
        )}
      </div>

      {errors.root && (
        <p className="text-destructive text-sm">{errors.root.message}</p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  );
}
