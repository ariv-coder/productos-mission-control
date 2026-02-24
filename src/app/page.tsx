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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Bug, CheckCircle, GitPullRequest, Activity, Clock } from "lucide-react";

// Mock data
const agents = [
  { label: "verify-develop", task: "Testing fixes 1-10", status: "running", runtime: "2m" },
  { label: "verify-design", task: "Testing fixes 15-18", status: "complete", runtime: "3m" },
  { label: "verify-build", task: "Testing fixes 11-14", status: "complete", runtime: "4m" },
  { label: "fix-upgrade-flow", task: "Issues 1-3", status: "complete", runtime: "7m" },
];

const stats = { agentsRunning: 1, issuesFound: 18, issuesFixed: 18, prsMerged: 5 };

const recentActivity = [
  { time: "2m ago", event: "verify-develop started testing fixes 1-10", type: "start" },
  { time: "3m ago", event: "verify-design completed all tests", type: "complete" },
  { time: "4m ago", event: "verify-build merged PR #42", type: "merge" },
  { time: "7m ago", event: "fix-upgrade-flow fixed issues 1-3", type: "fix" },
  { time: "10m ago", event: "18 issues identified in develop branch", type: "scan" },
  { time: "12m ago", event: "Mission started by Heemang", type: "start" },
];

export default function Dashboard() {
  return (
    <div className="dark min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                1Labs Mission Control
              </h1>
              <p className="text-muted-foreground">
                AI Agent Orchestration Dashboard
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-green-500 border-green-500/50 px-3 py-1">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            System Online
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Agents Running
              </CardTitle>
              <Bot className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.agentsRunning}</div>
              <p className="text-xs text-muted-foreground mt-1">
                of 4 agents active
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Issues Found
              </CardTitle>
              <Bug className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.issuesFound}</div>
              <p className="text-xs text-muted-foreground mt-1">
                in current mission
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Issues Fixed
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{stats.issuesFixed}</div>
              <p className="text-xs text-muted-foreground mt-1">
                100% resolution rate
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                PRs Merged
              </CardTitle>
              <GitPullRequest className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.prsMerged}</div>
              <p className="text-xs text-muted-foreground mt-1">
                successfully deployed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="agents" className="space-y-4">
          <TabsList className="bg-muted">
            <TabsTrigger value="agents" className="data-[state=active]:bg-background">
              Active Agents
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-background">
              Recent Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Active Agents</CardTitle>
                <CardDescription>
                  Monitor all running and completed agent tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                    {agents.map((agent) => (
                      <TableRow key={agent.label} className="border-border">
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Activity</CardTitle>
                <CardDescription>
                  Real-time event log from all agents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="p-2 rounded-full bg-primary/10">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">{item.event}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0">
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
          Powered by <span className="font-semibold">1Labs AI</span> • ProductOS Mission Control v1.0
        </div>
      </div>
    </div>
  );
}
