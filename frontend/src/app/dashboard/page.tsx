"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const revenueStreams = [
  { name: "Freelance Design", revenue: 2400, trend: "+12%", status: "active" },
  { name: "Online Course", revenue: 890, trend: "+45%", status: "active" },
  { name: "Consulting", revenue: 1200, trend: "-5%", status: "active" },
  { name: "Template Shop", revenue: 340, trend: "+28%", status: "new" },
];

const quickActions = [
  {
    title: "Run Skills Diagnosis",
    description: "Discover your highest-value skills",
    href: "/dashboard/skills",
    icon: "🎯",
  },
  {
    title: "Explore Monetization Paths",
    description: "Find new revenue opportunities",
    href: "/dashboard/monetize",
    icon: "💰",
  },
  {
    title: "Talk to AI Coach",
    description: "Get personalized income advice",
    href: "/dashboard/chat",
    icon: "🤖",
  },
  {
    title: "Create Workflow",
    description: "Automate your income tasks",
    href: "/dashboard/workflows",
    icon: "⚡",
  },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome to IncomeOS</h1>
        <p className="text-muted-foreground mt-1">
          Your AI-powered income operating system. Here&apos;s your overview.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Monthly Revenue</CardDescription>
            <CardTitle className="text-2xl">$4,830</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-sm text-green-600">+18% from last month</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Income Streams</CardDescription>
            <CardTitle className="text-2xl">4</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-sm text-muted-foreground">
              Target: 5 streams
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Skills Monetized</CardDescription>
            <CardTitle className="text-2xl">7 / 12</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={58} className="h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>AI Credits Remaining</CardDescription>
            <CardTitle className="text-2xl">42</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-sm text-muted-foreground">
              Resets in 12 days
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader className="pb-2">
                  <div className="text-2xl mb-1">{action.icon}</div>
                  <CardTitle className="text-base">{action.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{action.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Revenue Streams */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Revenue Streams</CardTitle>
              <CardDescription>
                Your active income sources this month
              </CardDescription>
            </div>
            <Link href="/dashboard/revenue">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenueStreams.map((stream) => (
              <div
                key={stream.name}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">{stream.name}</p>
                    <Badge
                      variant={
                        stream.status === "new" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {stream.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${stream.revenue.toLocaleString()}
                  </p>
                  <p
                    className={`text-sm ${
                      stream.trend.startsWith("+")
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {stream.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🤖</span> AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
            <span className="text-primary font-bold mt-0.5">1</span>
            <div>
              <p className="font-medium text-sm">
                Your design skills have high consulting demand
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Based on market analysis, offering UI/UX consulting at $150/hr
                could add $2,400/month to your revenue.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
            <span className="text-primary font-bold mt-0.5">2</span>
            <div>
              <p className="font-medium text-sm">
                Template shop revenue is accelerating
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Your template shop grew 28% this month. Consider creating a
                premium template bundle to capitalize on momentum.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
            <span className="text-primary font-bold mt-0.5">3</span>
            <div>
              <p className="font-medium text-sm">
                Consulting revenue dipped — optimize scheduling
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Consulting dropped 5%. AI analysis suggests optimizing your
                booking page and adding a discovery call workflow.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center">
        IncomeOS provides AI-powered educational tools and strategic suggestions.
        Actual results may vary. Income figures shown are illustrative and not
        guarantees of earnings.
      </p>
    </div>
  );
}
