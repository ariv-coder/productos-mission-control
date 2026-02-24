"use client";

import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Bug, CheckCircle, GitPullRequest, Activity, Clock, Layers, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// Project data
const projects = [
  { id: "all", name: "All Projects", color: "blue" },
  { id: "productos-build", name: "ProductOS - Build", color: "emerald" },
  { id: "productos-design", name: "ProductOS - Design", color: "violet" },
  { id: "productos-develop", name: "ProductOS - Develop", color: "amber" },
];

// Mock data per project
const projectData: Record<string, {
  agents: { label: string; task: string; status: string; runtime: string }[];
  stats: { agentsRunning: number; issuesFound: number; issuesFixed: number; prsMerged: number };
  recentActivity: { time: string; event: string; type: string }[];
}> = {
  "all": {
    agents: [
      { label: "verify-develop", task: "Testing fixes 1-10", status: "running", runtime: "2m" },
      { label: "verify-design", task: "Testing fixes 15-18", status: "complete", runtime: "3m" },
      { label: "verify-build", task: "Testing fixes 11-14", status: "complete", runtime: "4m" },
      { label: "fix-upgrade-flow", task: "Issues 1-3", status: "complete", runtime: "7m" },
    ],
    stats: { agentsRunning: 1, issuesFound: 18, issuesFixed: 18, prsMerged: 5 },
    recentActivity: [
      { time: "2m ago", event: "verify-develop started testing fixes 1-10", type: "start" },
      { time: "3m ago", event: "verify-design completed all tests", type: "complete" },
      { time: "4m ago", event: "verify-build merged PR #42", type: "merge" },
      { time: "7m ago", event: "fix-upgrade-flow fixed issues 1-3", type: "fix" },
      { time: "10m ago", event: "18 issues identified in develop branch", type: "scan" },
      { time: "12m ago", event: "Mission started by Heemang", type: "start" },
    ],
  },
  "productos-build": {
    agents: [
      { label: "verify-build", task: "Testing fixes 11-14", status: "complete", runtime: "4m" },
      { label: "fix-upgrade-flow", task: "Issues 1-3", status: "complete", runtime: "7m" },
    ],
    stats: { agentsRunning: 0, issuesFound: 4, issuesFixed: 4, prsMerged: 2 },
    recentActivity: [
      { time: "4m ago", event: "verify-build merged PR #42", type: "merge" },
      { time: "7m ago", event: "fix-upgrade-flow fixed issues 1-3", type: "fix" },
      { time: "15m ago", event: "4 issues identified in build branch", type: "scan" },
    ],
  },
  "productos-design": {
    agents: [
      { label: "verify-design", task: "Testing fixes 15-18", status: "complete", runtime: "3m" },
    ],
    stats: { agentsRunning: 0, issuesFound: 4, issuesFixed: 4, prsMerged: 1 },
    recentActivity: [
      { time: "3m ago", event: "verify-design completed all tests", type: "complete" },
      { time: "8m ago", event: "4 UI fixes verified and merged", type: "merge" },
    ],
  },
  "productos-develop": {
    agents: [
      { label: "verify-develop", task: "Testing fixes 1-10", status: "running", runtime: "2m" },
    ],
    stats: { agentsRunning: 1, issuesFound: 10, issuesFixed: 10, prsMerged: 2 },
    recentActivity: [
      { time: "2m ago", event: "verify-develop started testing fixes 1-10", type: "start" },
      { time: "10m ago", event: "10 issues identified in develop branch", type: "scan" },
    ],
  },
};

export default function Dashboard() {
  const [selectedProject, setSelectedProject] = useState("all");
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);
  
  const currentProject = projects.find(p => p.id === selectedProject) || projects[0];
  const data = projectData[selectedProject];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Bot className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                1Labs AI <span className="text-blue-500">Mission Control</span>
              </h1>
              <p className="text-muted-foreground">
                AI Agent Orchestration Dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Project Selector */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setProjectMenuOpen(!projectMenuOpen)}
                className="flex items-center gap-2 border-border hover:border-blue-500/50 transition-colors"
              >
                <Layers className="h-4 w-4 text-blue-500" />
                <span>{currentProject.name}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${projectMenuOpen ? 'rotate-180' : ''}`} />
              </Button>
              {projectMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => {
                        setSelectedProject(project.id);
                        setProjectMenuOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-blue-500/10 transition-colors flex items-center gap-3 ${
                        selectedProject === project.id ? 'bg-blue-500/10 text-blue-400' : 'text-foreground'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        project.id === 'all' ? 'bg-blue-500' :
                        project.id === 'productos-build' ? 'bg-emerald-500' :
                        project.id === 'productos-design' ? 'bg-violet-500' :
                        'bg-amber-500'
                      }`} />
                      {project.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Badge variant="outline" className="text-green-500 border-green-500/50 px-3 py-1">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              System Online
            </Badge>
          </div>
        </div>

        {/* Project Badge */}
        {selectedProject !== 'all' && (
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={`px-3 py-1 ${
                selectedProject === 'productos-build' ? 'border-emerald-500/50 text-emerald-400' :
                selectedProject === 'productos-design' ? 'border-violet-500/50 text-violet-400' :
                'border-amber-500/50 text-amber-400'
              }`}
            >
              Viewing: {currentProject.name}
            </Badge>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-card border-border hover:border-blue-500/50 transition-colors group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Agents Running
              </CardTitle>
              <Bot className="h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{data.stats.agentsRunning}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {selectedProject === 'all' ? 'across all projects' : 'in this project'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-orange-500/50 transition-colors group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Issues Found
              </CardTitle>
              <Bug className="h-4 w-4 text-orange-500 group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{data.stats.issuesFound}</div>
              <p className="text-xs text-muted-foreground mt-1">
                in current mission
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-green-500/50 transition-colors group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Issues Fixed
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500 group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{data.stats.issuesFixed}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {data.stats.issuesFound > 0 ? `${Math.round((data.stats.issuesFixed / data.stats.issuesFound) * 100)}% resolution rate` : 'No issues'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-purple-500/50 transition-colors group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                PRs Merged
              </CardTitle>
              <GitPullRequest className="h-4 w-4 text-purple-500 group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{data.stats.prsMerged}</div>
              <p className="text-xs text-muted-foreground mt-1">
                successfully deployed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="agents" className="space-y-4">
          <TabsList className="bg-muted">
            <TabsTrigger value="agents" className="data-[state=active]:bg-background data-[state=active]:text-blue-500">
              Active Agents
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-background data-[state=active]:text-blue-500">
              Recent Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Active Agents</CardTitle>
                <CardDescription>
                  {selectedProject === 'all' 
                    ? 'Monitor all running and completed agent tasks across projects'
                    : `Agent tasks for ${currentProject.name}`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {data.agents.length > 0 ? (
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
                      {data.agents.map((agent) => (
                        <TableRow key={agent.label} className="border-border hover:bg-blue-500/5 transition-colors">
                          <TableCell className="font-mono text-sm text-foreground">
                            {agent.label}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {agent.task}
                          </TableCell>
                          <TableCell>
                            {agent.status === "running" ? (
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 hover:bg-blue-500/30">
                                <span className="relative flex h-2 w-2 mr-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
                                </span>
                                Running
                              </Badge>
                            ) : (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/50 hover:bg-green-500/30">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Complete
                              </Badge>
                            )}
                          </TableCell>
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
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No agents running for this project
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Activity</CardTitle>
                <CardDescription>
                  {selectedProject === 'all' 
                    ? 'Real-time event log from all agents'
                    : `Events for ${currentProject.name}`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.recentActivity.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-3 rounded-lg bg-muted/50 hover:bg-blue-500/5 transition-colors"
                    >
                      <div className="p-2 rounded-full bg-blue-500/10">
                        <Activity className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">{item.event}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0 border-blue-500/30 text-blue-400">
                        {item.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
          <span className="text-blue-500 font-semibold">1Labs AI</span> Mission Control • © 2026 1Labs AI
        </div>
      </div>
    </div>
  );
}
