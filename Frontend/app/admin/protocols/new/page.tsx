"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const protocolFormSchema = z.object({
  name: z.string().min(2, "Protocol name must be at least 2 characters"),
  description: z.string().min(10, "Please provide a detailed description"),
  website: z.string().url("Please enter a valid URL"),
  contactEmail: z.string().email("Please enter a valid email"),
  twitter: z.string().optional(),
  github: z.string().optional(),
  discord: z.string().optional(),
  logo: z.any().optional(),
});

type ProtocolFormValues = z.infer<typeof protocolFormSchema>;

export default function NewProtocolPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProtocolFormValues>({
    resolver: zodResolver(protocolFormSchema),
    defaultValues: {
      name: "",
      description: "",
      website: "",
      contactEmail: "",
      twitter: "",
      github: "",
      discord: "",
    },
  });

  async function onSubmit(data: ProtocolFormValues) {
    setIsLoading(true);
    try {
      // Yet to implement protocol creation logic
      console.log(data);
      toast({
        title: "Protocol Created",
        description: "Your protocol has been successfully registered.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Register New Protocol
          </h1>
          <p className="text-muted-foreground">
            Create a new protocol to start managing quizzes and hackathons.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Protocol Details</CardTitle>
              <CardDescription>
                Provide information about your protocol
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Protocol Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter protocol name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your protocol..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://your-protocol.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="contact@protocol.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter</FormLabel>
                          <FormControl>
                            <Input placeholder="@handle" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub</FormLabel>
                          <FormControl>
                            <Input placeholder="organization" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="discord"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discord</FormLabel>
                          <FormControl>
                            <Input placeholder="Invite link" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Protocol Logo</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-4">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                field.onChange(e.target.files?.[0])
                              }
                              className="hidden"
                              id="logo-upload"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                document.getElementById("logo-upload")?.click()
                              }
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Upload Logo
                            </Button>
                            {field.value && (
                              <span className="text-sm text-muted-foreground">
                                {(field.value as File).name}
                              </span>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Recommended size: 256x256px. Max file size: 2MB
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Register Protocol
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
