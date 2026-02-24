"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Bell, Shield, Database, Palette, Key } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure Mission Control preferences and integrations
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-foreground">Notifications</CardTitle>
                <CardDescription>
                  Configure alerts and notification preferences
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Slack notifications</span>
                <Badge variant="outline" className="text-green-400 border-green-500/50">
                  Enabled
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Email alerts</span>
                <Badge variant="outline" className="text-muted-foreground">
                  Disabled
                </Badge>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Key className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-foreground">API Keys</CardTitle>
                <CardDescription>
                  Manage API keys and service integrations
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">GitHub</span>
                <Badge variant="outline" className="text-green-400 border-green-500/50">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Vercel</span>
                <Badge variant="outline" className="text-green-400 border-green-500/50">
                  Connected
                </Badge>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Manage Keys
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-foreground">Database</CardTitle>
                <CardDescription>
                  Database connections and storage settings
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Neon PostgreSQL</span>
                <Badge variant="outline" className="text-green-400 border-green-500/50">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Region</span>
                <span className="text-sm text-muted-foreground">us-east-1</span>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Connection
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Palette className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-foreground">Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Theme</span>
                <Badge variant="outline">Dark</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Sidebar</span>
                <Badge variant="outline">Expanded</Badge>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Customize
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-primary/50 transition-colors md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-foreground">Security</CardTitle>
                <CardDescription>
                  Security settings and access control
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <h4 className="font-medium text-foreground mb-1">Two-Factor Auth</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Add an extra layer of security
                </p>
                <Badge variant="outline" className="text-muted-foreground">
                  Not Configured
                </Badge>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <h4 className="font-medium text-foreground mb-1">Session Timeout</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Auto-logout after inactivity
                </p>
                <Badge variant="outline" className="text-green-400 border-green-500/50">
                  30 minutes
                </Badge>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <h4 className="font-medium text-foreground mb-1">Audit Logs</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Track all system activities
                </p>
                <Badge variant="outline" className="text-green-400 border-green-500/50">
                  Enabled
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
        Mission Control v1.0 • <span className="text-primary">1Labs AI</span>
      </div>
    </div>
  );
}
