"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/data";
import {
  Bot,
  Bug,
  ExternalLink,
  GitBranch,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

function getStatusDot(status: string) {
  switch (status) {
    case "healthy":
      return "bg-green-500";
    case "warning":
      return "bg-yellow-500";
    case "critical":
      return "bg-red-500";
    default:
      return "bg-muted-foreground";
  }
}

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Projects
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor your ProductOS projects
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <span>Add Project</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <Card className="bg-card border-border hover:border-primary/50 transition-all duration-200 cursor-pointer group h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                    {project.name}
                  </CardTitle>
                  <Badge className={getStatusColor(project.status)}>
                    <span
                      className={`relative flex h-2 w-2 mr-2 rounded-full ${getStatusDot(project.status)}`}
                    />
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Domain */}
                <div className="flex items-center gap-2 text-sm">
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`https://${project.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.domain}
                  </a>
                </div>

                {/* Repo */}
                <div className="flex items-center gap-2 text-sm">
                  <GitBranch className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`https://github.com/${project.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground font-mono text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.repo}
                  </a>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-foreground">
                      {project.agents}
                    </span>
                    <span className="text-xs text-muted-foreground">agents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bug className="h-4 w-4 text-orange-400" />
                    <span className="text-sm font-medium text-foreground">
                      {project.issues}
                    </span>
                    <span className="text-xs text-muted-foreground">issues</span>
                  </div>
                </div>

                {/* Last Activity */}
                <p className="text-xs text-muted-foreground">
                  Last activity: {project.lastActivity}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
