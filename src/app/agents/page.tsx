"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { agents, projects } from "@/lib/data";
import { Bot, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function AgentsPage() {
  const runningAgents = agents.filter((a) => a.status === "running").length;
  const completeAgents = agents.filter((a) => a.status === "complete").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Agents
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage all AI agents across projects
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 px-3 py-1">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
            </span>
            {runningAgents} Running
          </Badge>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/50 px-3 py-1">
            <CheckCircle className="h-3 w-3 mr-2" />
            {completeAgents} Complete
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Agents
            </CardTitle>
            <Bot className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{agents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              registered agents
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Now
            </CardTitle>
            <div className="relative">
              <Bot className="h-4 w-4 text-blue-500" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">{runningAgents}</div>
            <p className="text-xs text-muted-foreground mt-1">
              currently running
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Today
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">{completeAgents}</div>
            <p className="text-xs text-muted-foreground mt-1">
              tasks finished
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Agents Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">All Agents</CardTitle>
          <CardDescription>
            Complete list of agents and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Agent</TableHead>
                <TableHead className="text-muted-foreground">Project</TableHead>
                <TableHead className="text-muted-foreground">Task</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Runtime</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => {
                const project = projects.find((p) => p.id === agent.projectId);
                return (
                  <TableRow key={agent.id} className="border-border">
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
                      >
                        {project?.name.replace("ProductOS - ", "")}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate">
                      {agent.task}
                    </TableCell>
                    <TableCell>
                      {agent.status === "running" ? (
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                          <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
                          </span>
                          Running
                        </Badge>
                      ) : agent.status === "complete" ? (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Complete
                        </Badge>
                      ) : (
                        <Badge variant="outline">{agent.status}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="flex items-center justify-end gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {agent.runtime}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
