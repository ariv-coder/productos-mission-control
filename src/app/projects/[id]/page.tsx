"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getProject, getProjectAgents, getProjectActivity } from "@/lib/data";
import {
  Bot,
  Bug,
  ExternalLink,
  GitBranch,
  ArrowLeft,
  CheckCircle,
  Clock,
  Activity,
  FileCode,
  Layers,
} from "lucide-react";

function getStatusColor(status: string) {
  switch (status) {
    case "healthy":
      return "bg-green-500/20 text-green-400 border-green-500/50";
    case "warning":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
    case "critical":
      return "bg-red-500/20 text-red-400 border-red-500/50";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function getAgentStatusBadge(status: string) {
  switch (status) {
    case "running":
      return (
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
          </span>
          Running
        </Badge>
      );
    case "complete":
      return (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
          <CheckCircle className="h-3 w-3 mr-1" />
          Complete
        </Badge>
      );
    case "failed":
      return (
        <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
          Failed
        </Badge>
      );
    case "idle":
      return (
        <Badge variant="outline" className="text-muted-foreground">
          Idle
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getActivityIcon(type: string) {
  switch (type) {
    case "start":
      return <Activity className="h-4 w-4 text-blue-400" />;
    case "complete":
      return <CheckCircle className="h-4 w-4 text-green-400" />;
    case "merge":
      return <GitBranch className="h-4 w-4 text-purple-400" />;
    case "fix":
      return <Bug className="h-4 w-4 text-orange-400" />;
    case "scan":
      return <FileCode className="h-4 w-4 text-cyan-400" />;
    case "error":
      return <Activity className="h-4 w-4 text-red-400" />;
    default:
      return <Activity className="h-4 w-4 text-muted-foreground" />;
  }
}

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  
  const project = getProject(projectId);
  const projectAgents = getProjectAgents(projectId);
  const projectActivity = getProjectActivity(projectId);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Project Not Found
        </h2>
        <p className="text-muted-foreground mb-6">
          The project you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/projects">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  const runningAgents = projectAgents.filter((a) => a.status === "running").length;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/projects" className="hover:text-foreground transition-colors">
          Projects
        </Link>
        <span>/</span>
        <span className="text-foreground">{project.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {project.name}
            </h1>
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a
              href={`https://${project.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              {project.domain}
            </a>
            <a
              href={`https://github.com/${project.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground"
            >
              <GitBranch className="h-4 w-4" />
              {project.repo}
            </a>
          </div>
        </div>
        <Link href="/projects">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Agents
            </CardTitle>
            <Bot className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{runningAgents}</div>
            <p className="text-xs text-muted-foreground mt-1">
              of {project.agents} total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Open Issues
            </CardTitle>
            <Bug className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{project.issues}</div>
            <p className="text-xs text-muted-foreground mt-1">
              being tracked
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Health Score
            </CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {project.status === "healthy" ? "98%" : project.status === "warning" ? "75%" : "45%"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              last 24 hours
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last Activity
            </CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{project.lastActivity}</div>
            <p className="text-xs text-muted-foreground mt-1">
              most recent event
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="agents" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="agents" className="data-[state=active]:bg-background gap-2">
            <Bot className="h-4 w-4" />
            Agents
          </TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-background gap-2">
            <FileCode className="h-4 w-4" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-background gap-2">
            <Activity className="h-4 w-4" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="context" className="data-[state=active]:bg-background gap-2">
            <Layers className="h-4 w-4" />
            Context
          </TabsTrigger>
        </TabsList>

        {/* Agents Tab */}
        <TabsContent value="agents" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Project Agents</CardTitle>
              <CardDescription>
                All agents assigned to this project
              </CardDescription>
            </CardHeader>
            <CardContent>
              {projectAgents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No agents assigned to this project yet.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-muted-foreground">Agent</TableHead>
                      <TableHead className="text-muted-foreground">Task</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground text-right">Runtime</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projectAgents.map((agent) => (
                      <TableRow key={agent.id} className="border-border">
                        <TableCell className="font-mono text-sm text-foreground">
                          {agent.label}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {agent.task}
                        </TableCell>
                        <TableCell>{getAgentStatusBadge(agent.status)}</TableCell>
                        <TableCell className="text-right">
                          <span className="flex items-center justify-end gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {agent.runtime}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Active Tasks</CardTitle>
              <CardDescription>
                Tasks currently being worked on by agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectAgents
                  .filter((a) => a.status === "running" || a.status === "complete")
                  .map((agent) => (
                    <div
                      key={agent.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <FileCode className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{agent.task}</p>
                          <p className="text-sm text-muted-foreground">
                            Assigned to {agent.label}
                          </p>
                        </div>
                      </div>
                      {getAgentStatusBadge(agent.status)}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
              <CardDescription>
                Event log for this project
              </CardDescription>
            </CardHeader>
            <CardContent>
              {projectActivity.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No activity recorded for this project.
                </div>
              ) : (
                <div className="space-y-4">
                  {projectActivity.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="p-2 rounded-full bg-primary/10">
                        {getActivityIcon(event.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">{event.event}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {event.time}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Context Tab */}
        <TabsContent value="context" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Project Context</CardTitle>
              <CardDescription>
                Shared context and knowledge base for agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 rounded-lg border border-border bg-muted/30">
                  <h4 className="font-medium text-foreground mb-2">Repository</h4>
                  <code className="text-sm text-muted-foreground font-mono">
                    github.com/{project.repo}
                  </code>
                </div>
                <div className="p-4 rounded-lg border border-border bg-muted/30">
                  <h4 className="font-medium text-foreground mb-2">Domain</h4>
                  <code className="text-sm text-muted-foreground font-mono">
                    {project.domain}
                  </code>
                </div>
                <div className="p-4 rounded-lg border border-border bg-muted/30">
                  <h4 className="font-medium text-foreground mb-2">Tech Stack</h4>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline">Next.js</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Tailwind CSS</Badge>
                    <Badge variant="outline">shadcn/ui</Badge>
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-border bg-muted/30">
                  <h4 className="font-medium text-foreground mb-2">Documentation</h4>
                  <p className="text-sm text-muted-foreground">
                    Project documentation and agent guidelines will appear here.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
