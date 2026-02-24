// Mock data for Mission Control

export interface Project {
  id: string;
  name: string;
  domain: string;
  repo: string;
  agents: number;
  issues: number;
  status: "healthy" | "warning" | "critical";
  lastActivity: string;
}

export interface Agent {
  id: string;
  label: string;
  projectId: string;
  task: string;
  status: "running" | "complete" | "failed" | "idle";
  runtime: string;
  startedAt: string;
}

export interface ActivityEvent {
  id: string;
  projectId: string;
  time: string;
  event: string;
  type: "start" | "complete" | "merge" | "fix" | "scan" | "error";
  agentId?: string;
}

export const projects: Project[] = [
  {
    id: "productos-build",
    name: "ProductOS - Build",
    domain: "build.productos.dev",
    repo: "virusha-tech/Product-OS-app",
    agents: 2,
    issues: 4,
    status: "healthy",
    lastActivity: "5m ago",
  },
  {
    id: "productos-design",
    name: "ProductOS - Design",
    domain: "design.productos.dev",
    repo: "virusha-tech/productos-design",
    agents: 1,
    issues: 4,
    status: "warning",
    lastActivity: "12m ago",
  },
  {
    id: "productos-develop",
    name: "ProductOS - Develop",
    domain: "develop.productos.dev",
    repo: "virusha-tech/productos-develop",
    agents: 3,
    issues: 10,
    status: "healthy",
    lastActivity: "2m ago",
  },
];

export const agents: Agent[] = [
  {
    id: "agent-1",
    label: "verify-develop",
    projectId: "productos-develop",
    task: "Testing fixes 1-10",
    status: "running",
    runtime: "2m",
    startedAt: "2m ago",
  },
  {
    id: "agent-2",
    label: "code-agent",
    projectId: "productos-develop",
    task: "Implementing feature #42",
    status: "running",
    runtime: "5m",
    startedAt: "5m ago",
  },
  {
    id: "agent-3",
    label: "planner-agent",
    projectId: "productos-develop",
    task: "Planning sprint tasks",
    status: "complete",
    runtime: "8m",
    startedAt: "10m ago",
  },
  {
    id: "agent-4",
    label: "verify-design",
    projectId: "productos-design",
    task: "Testing UI components",
    status: "complete",
    runtime: "3m",
    startedAt: "15m ago",
  },
  {
    id: "agent-5",
    label: "verify-build",
    projectId: "productos-build",
    task: "Testing fixes 11-14",
    status: "complete",
    runtime: "4m",
    startedAt: "20m ago",
  },
  {
    id: "agent-6",
    label: "fix-upgrade-flow",
    projectId: "productos-build",
    task: "Issues 1-3",
    status: "complete",
    runtime: "7m",
    startedAt: "25m ago",
  },
];

export const activityEvents: ActivityEvent[] = [
  {
    id: "evt-1",
    projectId: "productos-develop",
    time: "2m ago",
    event: "verify-develop started testing fixes 1-10",
    type: "start",
    agentId: "agent-1",
  },
  {
    id: "evt-2",
    projectId: "productos-design",
    time: "3m ago",
    event: "verify-design completed all tests",
    type: "complete",
    agentId: "agent-4",
  },
  {
    id: "evt-3",
    projectId: "productos-build",
    time: "4m ago",
    event: "verify-build merged PR #42",
    type: "merge",
    agentId: "agent-5",
  },
  {
    id: "evt-4",
    projectId: "productos-build",
    time: "7m ago",
    event: "fix-upgrade-flow fixed issues 1-3",
    type: "fix",
    agentId: "agent-6",
  },
  {
    id: "evt-5",
    projectId: "productos-develop",
    time: "10m ago",
    event: "18 issues identified in develop branch",
    type: "scan",
  },
  {
    id: "evt-6",
    projectId: "productos-develop",
    time: "12m ago",
    event: "Mission started by Heemang",
    type: "start",
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getProjectAgents(projectId: string): Agent[] {
  return agents.filter((a) => a.projectId === projectId);
}

export function getProjectActivity(projectId: string): ActivityEvent[] {
  return activityEvents.filter((e) => e.projectId === projectId);
}
