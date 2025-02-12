"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Github } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { PasswordInput } from "@/components/ui/password-input";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      setIsLoading(true);
      // Yet to integrate with backend API
      console.log(data);

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Success",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-secondary opacity-20" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute h-[400px] w-[400px] rounded-full bg-primary/20 -top-20 -left-20 blur-3xl" />
          <div className="absolute h-[300px] w-[300px] rounded-full bg-secondary/20 -bottom-20 -right-20 blur-3xl" />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/">OpenQuest</Link>
        </div>
        <motion.div
          className="relative z-20 mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <blockquote className="space-y-6">
            <p className="text-lg">
              &ldquo;OpenQuest has transformed how I approach learning and
              development. The challenges keep me engaged and the rewards make
              it even more exciting.&rdquo;
            </p>
            <footer className="flex items-center gap-4">
              <Image
                src="/avatars/sofia-davis.png"
                alt="Sofia Davis"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div>
                <div className="text-base font-medium">Sofia Davis</div>
                <div className="text-sm text-white/60">
                  Full Stack Developer
                </div>
              </div>
            </footer>
          </blockquote>
        </motion.div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Card className="border-none shadow-2xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                Welcome back
              </CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to sign in
              </CardDescription>
            </CardHeader>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Button
                    variant="outline"
                    className="gap-2"
                    disabled={isLoading}
                  >
                    <Github className="h-4 w-4" />
                    Continue with GitHub
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="border-border/50"
                    disabled={isLoading}
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <PasswordInput
                    id="password"
                    className="border-border/50"
                    disabled={isLoading}
                    {...form.register("password")}
                  />
                  {form.formState.errors.password && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2">Signing in</span>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        ⚪
                      </motion.span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <div className="text-sm text-center text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-primary hover:underline"
                  >
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
