"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bot,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  ArrowLeft,
  Eye,
  Zap,
  GitPullRequest,
  MessageSquare,
  Coins,
  Loader2,
} from "lucide-react";

// Types
interface Agent {
  label: string;
  project: string;
  task: string;
  status: "running" | "complete" | "failed";
  runtime: string;
  tokens: number;
  pr?: string;
  messages?: { role: "in" | "out"; content: string; time: string }[];
}

// Mock data
const agentsData: Agent[] = [
  {
    label: "verify-develop-v2",
    project: "productos-develop",
    task: "Verifying fixes 1-10",
    status: "complete",
    runtime: "1m44s",
    tokens: 43800,
    pr: "#142",
    messages: [
      { role: "in", content: "Verify all 10 fixes in productos-develop branch", time: "10:32:15" },
      { role: "out", content: "Starting verification of fixes 1-10...", time: "10:32:16" },
      { role: "out", content: "Fix 1: ✅ Passed - Button alignment corrected", time: "10:32:45" },
      { role: "out", content: "Fix 2: ✅ Passed - Modal z-index fixed", time: "10:33:02" },
      { role: "out", content: "All 10 fixes verified successfully. Creating PR.", time: "10:33:59" },
    ],
  },
  {
    label: "fix-remaining-develop",
    project: "productos-develop",
    task: "Debug broken fixes",
    status: "complete",
    runtime: "3m47s",
    tokens: 55800,
    pr: "#143",
    messages: [
      { role: "in", content: "Debug and fix the 3 broken tests in develop", time: "10:35:00" },
      { role: "out", content: "Analyzing test failures...", time: "10:35:01" },
      { role: "out", content: "Found root cause: async state update race condition", time: "10:36:22" },
      { role: "out", content: "Applied fix with proper useEffect cleanup", time: "10:37:45" },
      { role: "out", content: "All tests passing. PR created and ready for review.", time: "10:38:47" },
    ],
  },
  {
    label: "build-mission-control-v2",
    project: "mission-control",
    task: "Building dashboard",
    status: "complete",
    runtime: "2m37s",
    tokens: 31400,
    messages: [
      { role: "in", content: "Build the Mission Control dashboard with agent monitoring", time: "11:00:00" },
      { role: "out", content: "Setting up Next.js project with shadcn/ui...", time: "11:00:02" },
      { role: "out", content: "Created dashboard layout with stats cards", time: "11:01:15" },
      { role: "out", content: "Added agents table and activity feed", time: "11:02:10" },
      { role: "out", content: "Dashboard complete. Dark mode enabled.", time: "11:02:37" },
    ],
  },
  {
    label: "rebrand-mission-control",
    project: "mission-control",
    task: "Rebranding to 1Labs",
    status: "running",
    runtime: "0m30s",
    tokens: 5000,
    messages: [
      { role: "in", content: "Rebrand all ProductOS references to 1Labs AI", time: "11:05:00" },
      { role: "out", content: "Scanning project for ProductOS branding...", time: "11:05:01" },
      { role: "out", content: "Found 12 files with branding to update", time: "11:05:15" },
    ],
  },
  {
    label: "deploy-staging",
    project: "productos-develop",
    task: "Deploy to staging environment",
    status: "failed",
    runtime: "0m45s",
    tokens: 8200,
    messages: [
      { role: "in", content: "Deploy latest changes to staging", time: "09:00:00" },
      { role: "out", content: "Starting deployment to staging...", time: "09:00:01" },
      { role: "out", content: "Building application...", time: "09:00:15" },
      { role: "out", content: "ERROR: Environment variable STAGING_URL not set", time: "09:00:45" },
    ],
  },
];

const projects = ["all", "productos-develop", "mission-control"];
const statuses = ["all", "running", "complete", "failed"];

function formatTokens(tokens: number): string {
  if (tokens >= 1000) {
    return `${(tokens / 1000).toFixed(1)}k`;
  }
  return tokens.toString();
}

function StatusBadge({ status }: { status: Agent["status"] }) {
  if (status === "running") {
    return (
      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 hover:bg-blue-500/30">
        <span className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
        </span>
        Running
      </Badge>
    );
  }
  if (status === "complete") {
    return (
      <Badge className="bg-green-500/20 text-green-400 border-green-500/50 hover:bg-green-500/30">
        <CheckCircle className="h-3 w-3 mr-1" />
        Complete
      </Badge>
    );
  }
  return (
    <Badge className="bg-red-500/20 text-red-400 border-red-500/50 hover:bg-red-500/30">
      <XCircle className="h-3 w-3 mr-1" />
      Failed
    </Badge>
  );
}

export default function AgentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const filteredAgents = useMemo(() => {
    return agentsData.filter((agent) => {
      const matchesSearch = agent.label.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || agent.status === statusFilter;
      const matchesProject = projectFilter === "all" || agent.project === projectFilter;
      return matchesSearch && matchesStatus && matchesProject;
    });
  }, [search, statusFilter, projectFilter]);

  const stats = useMemo(() => {
    return {
      running: agentsData.filter((a) => a.status === "running").length,
      complete: agentsData.filter((a) => a.status === "complete").length,
      failed: agentsData.filter((a) => a.status === "failed").length,
    };
  }, []);

  return (
    <div className="dark min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Agent Registry
                </h1>
                <p className="text-muted-foreground">
                  Monitor and manage all AI agents
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-card border-border hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/5 cursor-pointer group"
                onClick={() => setStatusFilter(statusFilter === "running" ? "all" : "running")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-blue-400 transition-colors">
                Running
              </CardTitle>
              <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">{stats.running}</div>
              <p className="text-xs text-muted-foreground mt-1">agents active</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-green-500/50 transition-all hover:shadow-lg hover:shadow-green-500/5 cursor-pointer group"
                onClick={() => setStatusFilter(statusFilter === "complete" ? "all" : "complete")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-green-400 transition-colors">
                Completed
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">{stats.complete}</div>
              <p className="text-xs text-muted-foreground mt-1">tasks finished</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-red-500/50 transition-all hover:shadow-lg hover:shadow-red-500/5 cursor-pointer group"
                onClick={() => setStatusFilter(statusFilter === "failed" ? "all" : "failed")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-red-400 transition-colors">
                Failed
              </CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-400">{stats.failed}</div>
              <p className="text-xs text-muted-foreground mt-1">need attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by label..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-background border-border">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status} className="capitalize">
                      {status === "all" ? "All Statuses" : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="w-full sm:w-[200px] bg-background border-border">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {projects.map((project) => (
                    <SelectItem key={project} value={project}>
                      {project === "all" ? "All Projects" : project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Agents Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">All Agents</CardTitle>
            <CardDescription>
              {filteredAgents.length} agent{filteredAgents.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Label</TableHead>
                  <TableHead className="text-muted-foreground">Project</TableHead>
                  <TableHead className="text-muted-foreground">Task</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground text-right">Runtime</TableHead>
                  <TableHead className="text-muted-foreground text-right">Tokens</TableHead>
                  <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => (
                  <TableRow
                    key={agent.label}
                    className="border-border hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedAgent(agent)}
                  >
                    <TableCell className="font-mono text-sm text-foreground">
                      {agent.label}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-xs">
                        {agent.project}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate">
                      {agent.task}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={agent.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="flex items-center justify-end gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {agent.runtime}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="flex items-center justify-end gap-1 text-muted-foreground">
                        <Coins className="h-3 w-3" />
                        {formatTokens(agent.tokens)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-primary/10 hover:text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAgent(agent);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredAgents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No agents found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
          Powered by <span className="font-semibold">1Labs AI</span> • Mission Control v1.0
        </div>
      </div>

      {/* Agent Detail Dialog */}
      <Dialog open={!!selectedAgent} onOpenChange={() => setSelectedAgent(null)}>
        <DialogContent className="dark bg-card border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <span className="font-mono">{selectedAgent?.label}</span>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {selectedAgent?.task}
            </DialogDescription>
          </DialogHeader>

          {selectedAgent && (
            <div className="space-y-6">
              {/* Status & Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <StatusBadge status={selectedAgent.status} />
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Project</p>
                  <Badge variant="outline" className="font-mono text-xs">
                    {selectedAgent.project}
                  </Badge>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Runtime</p>
                  <div className="flex items-center gap-1 text-foreground font-medium">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {selectedAgent.runtime}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Tokens Used</p>
                  <div className="flex items-center gap-1 text-foreground font-medium">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    {selectedAgent.tokens.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Linked PR */}
              {selectedAgent.pr && (
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <GitPullRequest className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-purple-400 font-medium">
                      Pull Request {selectedAgent.pr}
                    </span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-xs ml-auto">
                      Ready for Review
                    </Badge>
                  </div>
                </div>
              )}

              {/* Communication Log */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Communication Log</span>
                </div>
                <ScrollArea className="h-[200px] rounded-lg border border-border bg-background p-4">
                  <div className="space-y-3">
                    {selectedAgent.messages?.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 ${msg.role === "in" ? "flex-row" : "flex-row-reverse"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg text-sm ${
                            msg.role === "in"
                              ? "bg-primary/10 text-foreground"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
