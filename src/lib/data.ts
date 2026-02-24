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

export interface AgentMessage {
  role: "in" | "out";
  content: string;
  time: string;
}

export interface Agent {
  id: string;
  label: string;
  projectId: string;
  task: string;
  status: "running" | "complete" | "failed" | "idle";
  runtime: string;
  startedAt: string;
  tokens: number;
  pr?: string;
  messages: AgentMessage[];
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
    task: "Testing fixes 1-10: Button alignment, Modal z-index, Form validation, API error handling, Loading states, Responsive layout, Dark mode, Toast notifications, Navigation, Footer links",
    status: "running",
    runtime: "2m",
    startedAt: "2m ago",
    tokens: 12500,
    messages: [
      { role: "in", content: "Verify all 10 fixes in productos-develop branch", time: "10:32:15" },
      { role: "out", content: "Starting verification of fixes 1-10...", time: "10:32:16" },
      { role: "out", content: "Fix 1: ✅ Button alignment corrected", time: "10:32:45" },
      { role: "out", content: "Fix 2: ✅ Modal z-index fixed", time: "10:33:02" },
      { role: "out", content: "Continuing verification...", time: "10:33:30" },
    ],
  },
  {
    id: "agent-2",
    label: "code-agent",
    projectId: "productos-develop",
    task: "Implementing feature #42: Add user preferences panel with theme switching, notification settings, and language selection",
    status: "running",
    runtime: "5m",
    startedAt: "5m ago",
    tokens: 28400,
    pr: "#156",
    messages: [
      { role: "in", content: "Implement user preferences panel per spec in issue #42", time: "10:28:00" },
      { role: "out", content: "Analyzing requirements from issue #42...", time: "10:28:01" },
      { role: "out", content: "Creating PreferencesPanel component...", time: "10:29:15" },
      { role: "out", content: "Adding theme switching logic with localStorage persistence", time: "10:30:22" },
      { role: "out", content: "Implementing notification settings UI", time: "10:31:45" },
      { role: "out", content: "Draft PR #156 created, continuing with language selection...", time: "10:32:30" },
    ],
  },
  {
    id: "agent-3",
    label: "planner-agent",
    projectId: "productos-develop",
    task: "Planning sprint tasks: Analyze backlog, prioritize items, estimate story points, create sprint board",
    status: "complete",
    runtime: "8m",
    startedAt: "10m ago",
    tokens: 45200,
    messages: [
      { role: "in", content: "Plan next sprint from backlog items", time: "10:20:00" },
      { role: "out", content: "Fetching backlog from project board...", time: "10:20:01" },
      { role: "out", content: "Found 24 items in backlog, analyzing priorities...", time: "10:21:30" },
      { role: "out", content: "Estimated story points for 24 items", time: "10:24:15" },
      { role: "out", content: "Sprint board created with 12 items (48 story points)", time: "10:27:45" },
      { role: "out", content: "✅ Sprint planning complete. Summary sent to #planning channel.", time: "10:28:00" },
    ],
  },
  {
    id: "agent-4",
    label: "verify-design",
    projectId: "productos-design",
    task: "Testing UI components: Button variants, Card layouts, Modal animations, Form inputs, Navigation menus",
    status: "complete",
    runtime: "3m",
    startedAt: "15m ago",
    tokens: 18900,
    pr: "#89",
    messages: [
      { role: "in", content: "Run visual regression tests on UI component library", time: "10:12:00" },
      { role: "out", content: "Starting visual regression suite...", time: "10:12:01" },
      { role: "out", content: "Testing 5 button variants: ✅ All passed", time: "10:12:45" },
      { role: "out", content: "Testing card layouts: ✅ All passed", time: "10:13:15" },
      { role: "out", content: "Testing modal animations: ✅ All passed", time: "10:13:45" },
      { role: "out", content: "All 47 visual tests passed. PR #89 ready for merge.", time: "10:15:00" },
    ],
  },
  {
    id: "agent-5",
    label: "verify-build",
    projectId: "productos-build",
    task: "Testing fixes 11-14: Build optimization, Bundle size reduction, Tree shaking improvements, Lazy loading implementation",
    status: "complete",
    runtime: "4m",
    startedAt: "20m ago",
    tokens: 22100,
    pr: "#142",
    messages: [
      { role: "in", content: "Verify build optimization fixes 11-14", time: "10:05:00" },
      { role: "out", content: "Running build analysis...", time: "10:05:01" },
      { role: "out", content: "Fix 11: ✅ Build time reduced by 34%", time: "10:06:30" },
      { role: "out", content: "Fix 12: ✅ Bundle size reduced from 2.4MB to 1.8MB", time: "10:07:15" },
      { role: "out", content: "Fix 13: ✅ Tree shaking working correctly", time: "10:08:00" },
      { role: "out", content: "Fix 14: ✅ Lazy loading implemented for 8 routes", time: "10:08:45" },
      { role: "out", content: "All optimizations verified. PR #142 merged.", time: "10:09:00" },
    ],
  },
  {
    id: "agent-6",
    label: "fix-upgrade-flow",
    projectId: "productos-build",
    task: "Issues 1-3: Fix subscription upgrade flow, payment processing errors, and plan comparison display",
    status: "complete",
    runtime: "7m",
    startedAt: "25m ago",
    tokens: 38700,
    pr: "#141",
    messages: [
      { role: "in", content: "Fix critical issues in subscription upgrade flow", time: "09:58:00" },
      { role: "out", content: "Analyzing issue #1: Upgrade flow broken...", time: "09:58:01" },
      { role: "out", content: "Found root cause: Race condition in payment state", time: "09:59:30" },
      { role: "out", content: "Issue #1 fixed: Added proper state management", time: "10:01:15" },
      { role: "out", content: "Issue #2 fixed: Payment error handling improved", time: "10:03:00" },
      { role: "out", content: "Issue #3 fixed: Plan comparison now shows correct prices", time: "10:04:30" },
      { role: "out", content: "All 3 issues resolved. PR #141 merged to main.", time: "10:05:00" },
    ],
  },
  {
    id: "agent-7",
    label: "deploy-staging",
    projectId: "productos-develop",
    task: "Deploy latest changes to staging environment for QA testing",
    status: "failed",
    runtime: "0m45s",
    startedAt: "30m ago",
    tokens: 8200,
    messages: [
      { role: "in", content: "Deploy latest changes to staging", time: "09:30:00" },
      { role: "out", content: "Starting deployment to staging...", time: "09:30:01" },
      { role: "out", content: "Building application...", time: "09:30:15" },
      { role: "out", content: "❌ ERROR: Environment variable STAGING_URL not set", time: "09:30:45" },
      { role: "out", content: "Deployment failed. Please set STAGING_URL in environment.", time: "09:30:46" },
    ],
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
