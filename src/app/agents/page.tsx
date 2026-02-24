"use client";

import { useState, useMemo } from "react";
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
import { agents, projects, type Agent } from "@/lib/data";
import {
  Bot,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Eye,
  Zap,
  GitPullRequest,
  MessageSquare,
  Coins,
  Loader2,
  Filter,
} from "lucide-react";
import Link from "next/link";

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
  if (status === "failed") {
    return (
      <Badge className="bg-red-500/20 text-red-400 border-red-500/50 hover:bg-red-500/30">
        <XCircle className="h-3 w-3 mr-1" />
        Failed
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-muted-foreground">
      {status}
    </Badge>
  );
}

export default function AgentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const matchesSearch = agent.label.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || agent.status === statusFilter;
      const matchesProject = projectFilter === "all" || agent.projectId === projectFilter;
      return matchesSearch && matchesStatus && matchesProject;
    });
  }, [search, statusFilter, projectFilter]);

  const stats = useMemo(() => {
    return {
      running: agents.filter((a) => a.status === "running").length,
      complete: agents.filter((a) => a.status === "complete").length,
      failed: agents.filter((a) => a.status === "failed").length,
    };
  }, []);

  const totalTokens = useMemo(() => {
    return agents.reduce((sum, a) => sum + a.tokens, 0);
  }, []);

  const handleStatusCardClick = (status: string) => {
    setStatusFilter(statusFilter === status ? "all" : status);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Agent Registry
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage all AI agents across projects
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Zap className="h-4 w-4 text-yellow-500" />
          <span>{formatTokens(totalTokens)} tokens used today</span>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card
          className={`bg-card border-border cursor-pointer transition-all hover:shadow-lg ${
            statusFilter === "running"
              ? "border-blue-500 ring-1 ring-blue-500/20"
              : "hover:border-blue-500/50"
          }`}
          onClick={() => handleStatusCardClick("running")}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Running
            </CardTitle>
            <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">{stats.running}</div>
            <p className="text-xs text-muted-foreground mt-1">agents active</p>
          </CardContent>
        </Card>

        <Card
          className={`bg-card border-border cursor-pointer transition-all hover:shadow-lg ${
            statusFilter === "complete"
              ? "border-green-500 ring-1 ring-green-500/20"
              : "hover:border-green-500/50"
          }`}
          onClick={() => handleStatusCardClick("complete")}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">{stats.complete}</div>
            <p className="text-xs text-muted-foreground mt-1">tasks finished</p>
          </CardContent>
        </Card>

        <Card
          className={`bg-card border-border cursor-pointer transition-all hover:shadow-lg ${
            statusFilter === "failed"
              ? "border-red-500 ring-1 ring-red-500/20"
              : "hover:border-red-500/50"
          }`}
          onClick={() => handleStatusCardClick("failed")}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
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
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-full sm:w-[200px] bg-background border-border">
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name.replace("ProductOS - ", "")}
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
            {(statusFilter !== "all" || projectFilter !== "all" || search) && (
              <Button
                variant="link"
                className="text-xs text-primary p-0 h-auto ml-2"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                  setProjectFilter("all");
                }}
              >
                Clear filters
              </Button>
            )}
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
              {filteredAgents.map((agent) => {
                const project = projects.find((p) => p.id === agent.projectId);
                return (
                  <TableRow
                    key={agent.id}
                    className="border-border hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedAgent(agent)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-mono text-sm text-foreground">
                          {agent.label}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/projects/${agent.projectId}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {project?.name.replace("ProductOS - ", "")}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate">
                      {agent.task.split(":")[0]}
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
                );
              })}
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

      {/* Agent Detail Dialog */}
      <Dialog open={!!selectedAgent} onOpenChange={() => setSelectedAgent(null)}>
        <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <span className="font-mono">{selectedAgent?.label}</span>
              {selectedAgent && <StatusBadge status={selectedAgent.status} />}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {selectedAgent?.task}
            </DialogDescription>
          </DialogHeader>

          {selectedAgent && (
            <div className="space-y-6 flex-1 overflow-hidden flex flex-col">
              {/* Status & Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Project</p>
                  <Link
                    href={`/projects/${selectedAgent.projectId}`}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {projects.find((p) => p.id === selectedAgent.projectId)?.name.replace("ProductOS - ", "")}
                  </Link>
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
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Started</p>
                  <div className="text-foreground font-medium text-sm">
                    {selectedAgent.startedAt}
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
                      {selectedAgent.status === "complete" ? "Merged" : "In Progress"}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Communication Log */}
              <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Communication Log</span>
                  <span className="text-xs text-muted-foreground">
                    ({selectedAgent.messages.length} messages)
                  </span>
                </div>
                <ScrollArea className="flex-1 rounded-lg border border-border bg-background p-4">
                  <div className="space-y-3">
                    {selectedAgent.messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 ${msg.role === "in" ? "flex-row" : "flex-row-reverse"}`}
                      >
                        <div
                          className={`max-w-[85%] p-3 rounded-lg text-sm ${
                            msg.role === "in"
                              ? "bg-primary/10 text-foreground border border-primary/20"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {msg.role === "in" ? (
                              <Badge variant="outline" className="text-xs px-1.5 py-0">
                                Input
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs px-1.5 py-0 border-green-500/50 text-green-400">
                                Output
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">{msg.time}</span>
                          </div>
                          <p className="whitespace-pre-wrap">{msg.content}</p>
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
