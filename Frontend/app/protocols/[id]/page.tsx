"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Calendar,
  Trophy,
  ExternalLink,
  Clock,
  Timer,
  Search,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";

interface ProtocolDetails {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  members: number;
  totalQuizzes: number;
  totalHackathons: number;
  totalRewards: string;
  website: string;
  tags: string[];
  status: "active" | "upcoming";
  logo: string;
  quizzes: Quiz[];
  hackathons: Hackathon[];
  teamMembers: TeamMember[];
  recentActivity: Activity[];
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  startDate: string;
  duration: string;
  difficulty: string;
  participants: number;
  reward: string;
  status: "upcoming" | "active" | "completed";
}

interface Hackathon {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  participants: number;
  teams: number;
  reward: string;
  status: "upcoming" | "active" | "completed";
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  joinedAt: string;
}

interface Activity {
  id: string;
  type:
    | "quiz_created"
    | "hackathon_created"
    | "member_joined"
    | "reward_distributed";
  title: string;
  description: string;
  timestamp: string;
}

const protocolData: ProtocolDetails = {
  id: "3",
  name: "Cartesi",
  description:
    "Enabling scalable and decentralized computation with Linux-based rollups for blockchain applications.",
  createdAt: "2024-02-05",
  members: 120,
  totalQuizzes: 6,
  totalHackathons: 3,
  totalRewards: "25,000 USDC",
  website: "https://cartesi.io",
  tags: ["Rollups", "Web3", "Layer 2"],
  status: "active",
  logo: "/logos/cartesi-ctsi-logo.png",
  quizzes: [
    {
      id: "1",
      title: "Cartesi Rollups Deep Dive",
      description:
        "Test your knowledge of Cartesi's Layer 2 rollup technology.",
      startDate: "2024-03-15T14:00:00Z",
      duration: "45 minutes",
      difficulty: "Advanced",
      participants: 85,
      reward: "1,000 USDC",
      status: "upcoming",
    },
    {
      id: "2",
      title: "Cartesi DApp Development Challenge",
      description:
        "Evaluate your expertise in building decentralized applications using Cartesi's Linux-based rollups.",
      startDate: "2024-04-05T16:30:00Z",
      duration: "50 minutes",
      difficulty: "Intermediate",
      participants: 120,
      reward: "750 USDC",
      status: "upcoming",
    },
  ],
  hackathons: [
    {
      id: "1",
      title: "Build with Cartesi",
      description:
        "Create innovative applications using Cartesi's Linux runtime.",
      startDate: "2024-04-01T00:00:00Z",
      endDate: "2024-04-15T23:59:59Z",
      participants: 250,
      teams: 45,
      reward: "10,000 USDC",
      status: "upcoming",
    },
    {
      id: "2",
      title: "Cartesi Scaling Challenge",
      description:
        "Develop scalable and high-performance solutions using Cartesi's rollup technology.",
      startDate: "2024-05-01T00:00:00Z",
      endDate: "2024-05-15T23:59:59Z",
      participants: 300,
      teams: 60,
      reward: "12,500 USDC",
      status: "upcoming",
    },
  ],
  teamMembers: [
    {
      id: "1",
      name: "Alex Thompson",
      role: "Protocol Admin",
      joinedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Sarah Chen",
      role: "Quiz Master",
      joinedAt: "2024-01-20",
    },
  ],
  recentActivity: [
    {
      id: "1",
      type: "hackathon_created",
      title: "New Hackathon Created",
      description: "Build with Cartesi hackathon has been announced",
      timestamp: "2024-02-10T15:30:00Z",
    },
  ],
};

export default function ProtocolDetailPage() {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Get the protocol ID from params which will
  // be used to fetch the protocol data after API is implemented
  const protocolId = params.id as string;

  // Filter quizzes and hackathons based on search
  const filteredQuizzes = useMemo(() => {
    return protocolData.quizzes.filter((quiz) => {
      const searchContent = [quiz.title, quiz.description]
        .join(" ")
        .toLowerCase();
      return searchContent.includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  const filteredHackathons = useMemo(() => {
    return protocolData.hackathons.filter((hackathon) => {
      const searchContent = [hackathon.title, hackathon.description]
        .join(" ")
        .toLowerCase();
      return searchContent.includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  return (
    <div className="container py-10">
      <div className="space-y-8">
        {/* Protocol Header */}
        <div className="flex items-start gap-6">
          <div className="h-20 w-20 overflow-hidden rounded-lg border bg-background">
            <img
              src={protocolData.logo}
              alt={`${protocolData.name} logo`}
              className="h-full w-full object-contain p-2"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{protocolData.name}</h1>
              <Badge
                variant={
                  protocolData.status === "active" ? "default" : "secondary"
                }
                className={
                  protocolData.status === "active"
                    ? "bg-green-500/10 text-green-500"
                    : "bg-yellow-500/10 text-yellow-500"
                }
              >
                {protocolData.status}
              </Badge>
            </div>
            <p className="mt-2 text-muted-foreground">
              {protocolData.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {protocolData.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <Button asChild>
            <a
              href={protocolData.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Website
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    {protocolData.members}
                  </span>
                  <span className="text-sm text-muted-foreground">Members</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    {protocolData.totalRewards}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Total Rewards
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    {protocolData.totalQuizzes}
                  </span>
                  <span className="text-sm text-muted-foreground">Quizzes</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    {protocolData.totalHackathons}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Hackathons
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Members Section */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>People managing this protocol</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {protocolData.teamMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-medium text-muted-foreground">
                        {member.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                  <p className="ml-auto text-sm text-muted-foreground">
                    Joined {new Date(member.joinedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from this protocol</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {protocolData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Quizzes and Hackathons */}
        <Tabs defaultValue="quizzes" className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="quizzes">
                Quizzes
                <Badge variant="secondary" className="ml-2">
                  {filteredQuizzes.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="hackathons">
                Hackathons
                <Badge variant="secondary" className="ml-2">
                  {filteredHackathons.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <TabsContent value="quizzes" className="space-y-4">
            {filteredQuizzes.length > 0 ? (
              filteredQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No Quizzes Found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchQuery
                    ? `No quizzes found matching "${searchQuery}"`
                    : "No quizzes available at the moment."}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="hackathons" className="space-y-4">
            {filteredHackathons.length > 0 ? (
              filteredHackathons.map((hackathon) => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-medium">
                  No Hackathons Found
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchQuery
                    ? `No hackathons found matching "${searchQuery}"`
                    : "No hackathons available at the moment."}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-medium">{quiz.title}</h3>
                <Badge
                  variant={quiz.status === "active" ? "default" : "secondary"}
                  className={
                    quiz.status === "active"
                      ? "bg-green-500/10 text-green-500"
                      : quiz.status === "upcoming"
                      ? "bg-yellow-500/10 text-yellow-500"
                      : "bg-muted"
                  }
                >
                  {quiz.status}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {quiz.description}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(quiz.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{quiz.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{quiz.participants} participants</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                <span>{quiz.reward}</span>
              </div>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href={`/quizzes/${quiz.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function HackathonCard({ hackathon }: { hackathon: Hackathon }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-medium">{hackathon.title}</h3>
                <Badge
                  variant={
                    hackathon.status === "active" ? "default" : "secondary"
                  }
                  className={
                    hackathon.status === "active"
                      ? "bg-green-500/10 text-green-500"
                      : hackathon.status === "upcoming"
                      ? "bg-yellow-500/10 text-yellow-500"
                      : "bg-muted"
                  }
                >
                  {hackathon.status}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {hackathon.description}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(hackathon.startDate).toLocaleDateString()} -{" "}
                  {new Date(hackathon.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>
                  {hackathon.participants} participants • {hackathon.teams}{" "}
                  teams
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                <span>{hackathon.reward}</span>
              </div>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href={`/hackathons/${hackathon.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
