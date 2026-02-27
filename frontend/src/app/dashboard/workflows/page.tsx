"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  actions: string[];
  status: "active" | "paused" | "draft";
  lastRun?: string;
  runsThisMonth: number;
}

const workflows: Workflow[] = [
  {
    id: "1",
    name: "Client Invoice Generator",
    description:
      "Automatically generates and sends invoices when a consulting session is completed.",
    trigger: "Calendar event ended",
    actions: [
      "Generate invoice from template",
      "Send via email",
      "Log in revenue tracker",
    ],
    status: "active",
    lastRun: "2 hours ago",
    runsThisMonth: 8,
  },
  {
    id: "2",
    name: "Course Sales Notifier",
    description:
      "Sends you a Slack notification and updates the revenue dashboard when a course is purchased.",
    trigger: "Gumroad sale webhook",
    actions: [
      "Send Slack notification",
      "Update revenue dashboard",
      "Add customer to email list",
    ],
    status: "active",
    lastRun: "5 hours ago",
    runsThisMonth: 42,
  },
  {
    id: "3",
    name: "Weekly Revenue Report",
    description:
      "AI-generated weekly summary of all income streams with insights and recommendations.",
    trigger: "Every Sunday 9:00 AM",
    actions: [
      "Aggregate revenue data",
      "Generate AI insights",
      "Send email report",
    ],
    status: "active",
    lastRun: "3 days ago",
    runsThisMonth: 4,
  },
  {
    id: "4",
    name: "Content Repurposer",
    description:
      "Takes a blog post and creates social media posts, newsletter snippets, and thread ideas.",
    trigger: "New blog post published",
    actions: [
      "Generate Twitter thread",
      "Create LinkedIn post",
      "Draft newsletter section",
    ],
    status: "paused",
    lastRun: "2 weeks ago",
    runsThisMonth: 0,
  },
  {
    id: "5",
    name: "Lead Follow-up",
    description:
      "Sends a follow-up email sequence when a discovery call is booked.",
    trigger: "Calendly booking created",
    actions: [
      "Send confirmation email",
      "Create prep document",
      "Schedule follow-up reminder",
    ],
    status: "draft",
    runsThisMonth: 0,
  },
];

const templates = [
  {
    name: "Client Onboarding",
    description: "Welcome email + contract + project setup",
    category: "Services",
  },
  {
    name: "Product Launch",
    description: "Landing page + email sequence + social posts",
    category: "Products",
  },
  {
    name: "Revenue Report",
    description: "Weekly AI-powered income analysis",
    category: "Analytics",
  },
  {
    name: "Content Pipeline",
    description: "Blog to social media distribution",
    category: "Content",
  },
];

const statusColors = {
  active: "bg-green-100 text-green-700",
  paused: "bg-yellow-100 text-yellow-700",
  draft: "bg-gray-100 text-gray-700",
};

export default function WorkflowsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workflow Automation</h1>
          <p className="text-muted-foreground mt-1">
            Automate repetitive tasks across your income streams with
            AI-powered workflows.
          </p>
        </div>
        <Button>Create Workflow</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Workflows</CardDescription>
            <CardTitle className="text-2xl">
              {workflows.filter((w) => w.status === "active").length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground">of 5 allowed (Explorer)</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Runs This Month</CardDescription>
            <CardTitle className="text-2xl">
              {workflows.reduce((sum, w) => sum + w.runsThisMonth, 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground">
              Saving ~12 hours of manual work
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Time Saved</CardDescription>
            <CardTitle className="text-2xl">12.5 hrs</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground">
              This month
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Workflows List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Workflows</h2>
        {workflows.map((workflow) => (
          <Card key={workflow.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{workflow.name}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        statusColors[workflow.status]
                      }`}
                    >
                      {workflow.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {workflow.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>
                      Trigger: <strong>{workflow.trigger}</strong>
                    </span>
                    <span>{workflow.actions.length} actions</span>
                    {workflow.lastRun && (
                      <span>Last run: {workflow.lastRun}</span>
                    )}
                    <span>{workflow.runsThisMonth} runs this month</span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {workflow.actions.map((action) => (
                      <Badge key={action} variant="outline" className="text-xs">
                        {action}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    {workflow.status === "active" ? "Pause" : "Activate"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Templates */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Workflow Templates</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <Card
              key={template.name}
              className="cursor-pointer hover:border-primary/50 transition-colors"
            >
              <CardHeader>
                <Badge variant="secondary" className="w-fit text-xs">
                  {template.category}
                </Badge>
                <CardTitle className="text-base">{template.name}</CardTitle>
                <CardDescription className="text-xs">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" className="w-full">
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
