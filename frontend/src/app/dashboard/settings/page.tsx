"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account, integrations, and preferences.
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Your personal information and account settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input placeholder="Your name" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input placeholder="your@email.com" className="mt-1" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Bio</label>
            <textarea
              className="w-full mt-1 min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Tell us about yourself and your income goals..."
            />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>
            Manage your plan and billing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Explorer Plan</span>
                <Badge variant="secondary">Free</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                50 AI credits/month, 1 diagnostic, basic features
              </p>
            </div>
            <Button>Upgrade</Button>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold">42</p>
              <p className="text-xs text-muted-foreground">Credits remaining</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">Days until reset</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold">8</p>
              <p className="text-xs text-muted-foreground">Credits used</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>
            Connect your payment providers and platforms for real-time revenue
            tracking.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              name: "Stripe",
              description: "Payment processing and subscription management",
              connected: false,
            },
            {
              name: "Gumroad",
              description: "Digital product sales tracking",
              connected: false,
            },
            {
              name: "YouTube",
              description: "Video analytics and ad revenue",
              connected: false,
            },
            {
              name: "Shopify",
              description: "E-commerce store revenue",
              connected: false,
            },
          ].map((integration) => (
            <div
              key={integration.name}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div>
                <p className="font-medium">{integration.name}</p>
                <p className="text-xs text-muted-foreground">
                  {integration.description}
                </p>
              </div>
              <Button
                variant={integration.connected ? "outline" : "default"}
                size="sm"
              >
                {integration.connected ? "Disconnect" : "Connect"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>AI Preferences</CardTitle>
          <CardDescription>
            Customize how IncomeOS AI interacts with you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Income Goal</label>
            <Input
              placeholder="e.g., $10,000/month"
              className="mt-1 max-w-[300px]"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Primary Focus</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                "Side Hustle",
                "Full-time Creator",
                "Freelancer",
                "Solopreneur",
                "Agency",
              ].map((focus) => (
                <Badge
                  key={focus}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10"
                >
                  {focus}
                </Badge>
              ))}
            </div>
          </div>
          <Button>Save Preferences</Button>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle>Data & Privacy</CardTitle>
          <CardDescription>
            IncomeOS is committed to protecting your data in compliance with
            GDPR and applicable regulations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Your data is processed securely using encrypted connections. AI
            interactions are processed via business API agreements that prevent
            training on your data. You can request data export or deletion at
            any time.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Export My Data
            </Button>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
