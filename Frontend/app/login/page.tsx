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

export default function LoginPage() {
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
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Button variant="outline" className="gap-2">
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
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="border-border/50"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Sign In
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
