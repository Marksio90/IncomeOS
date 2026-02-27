"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const revenueData = {
  totalRevenue: 4830,
  monthlyGrowth: 18,
  projectedAnnual: 57960,
  streams: [
    {
      id: "1",
      name: "Freelance Design",
      type: "Services",
      monthlyRevenue: 2400,
      trend: "up" as const,
      trendPercent: 12,
      lastPayment: "Feb 25, 2026",
      clients: 3,
    },
    {
      id: "2",
      name: "Consulting",
      type: "Services",
      monthlyRevenue: 1200,
      trend: "down" as const,
      trendPercent: 5,
      lastPayment: "Feb 22, 2026",
      clients: 2,
    },
    {
      id: "3",
      name: "Online Course",
      type: "Digital Products",
      monthlyRevenue: 890,
      trend: "up" as const,
      trendPercent: 45,
      lastPayment: "Feb 27, 2026",
      clients: 42,
    },
    {
      id: "4",
      name: "Template Shop",
      type: "Digital Products",
      monthlyRevenue: 340,
      trend: "up" as const,
      trendPercent: 28,
      lastPayment: "Feb 26, 2026",
      clients: 18,
    },
  ],
  monthlyHistory: [
    { month: "Sep", revenue: 2100 },
    { month: "Oct", revenue: 2800 },
    { month: "Nov", revenue: 3200 },
    { month: "Dec", revenue: 3600 },
    { month: "Jan", revenue: 4100 },
    { month: "Feb", revenue: 4830 },
  ],
};

export default function RevenuePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Revenue Monitoring</h1>
          <p className="text-muted-foreground mt-1">
            Track all your income streams in one unified dashboard.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
          <Button>Add Stream</Button>
        </div>
      </div>

      {/* Revenue KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly Revenue</CardDescription>
            <CardTitle className="text-2xl">
              ${revenueData.totalRevenue.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-sm text-green-600">
              +{revenueData.monthlyGrowth}% vs last month
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Projected Annual</CardDescription>
            <CardTitle className="text-2xl">
              ${revenueData.projectedAnnual.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-sm text-muted-foreground">
              Based on current trajectory
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Streams</CardDescription>
            <CardTitle className="text-2xl">
              {revenueData.streams.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-sm text-muted-foreground">
              {revenueData.streams.filter((s) => s.trend === "up").length}{" "}
              growing
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Customers</CardDescription>
            <CardTitle className="text-2xl">
              {revenueData.streams.reduce((sum, s) => sum + s.clients, 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-sm text-muted-foreground">
              Across all streams
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Over Time</CardTitle>
          <CardDescription>Last 6 months of revenue growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end gap-4 px-4">
            {revenueData.monthlyHistory.map((month) => (
              <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-medium">
                  ${(month.revenue / 1000).toFixed(1)}k
                </span>
                <div
                  className="w-full bg-primary/80 rounded-t-md transition-all hover:bg-primary"
                  style={{
                    height: `${(month.revenue / 5000) * 200}px`,
                  }}
                />
                <span className="text-xs text-muted-foreground">
                  {month.month}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stream Details */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Streams</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          {revenueData.streams.map((stream) => (
            <Card key={stream.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{stream.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {stream.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {stream.clients} customers
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Last payment: {stream.lastPayment}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      ${stream.monthlyRevenue.toLocaleString()}
                    </p>
                    <p
                      className={`text-sm ${
                        stream.trend === "up"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {stream.trend === "up" ? "+" : "-"}
                      {stream.trendPercent}% this month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="services" className="space-y-4 mt-4">
          {revenueData.streams
            .filter((s) => s.type === "Services")
            .map((stream) => (
              <Card key={stream.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{stream.name}</h3>
                    <p className="font-bold">
                      ${stream.monthlyRevenue.toLocaleString()}/mo
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="products" className="space-y-4 mt-4">
          {revenueData.streams
            .filter((s) => s.type === "Digital Products")
            .map((stream) => (
              <Card key={stream.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{stream.name}</h3>
                    <p className="font-bold">
                      ${stream.monthlyRevenue.toLocaleString()}/mo
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>

      {/* AI Revenue Insight */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">AI Revenue Insight</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Your revenue grew 130% over the past 6 months, primarily driven by
            freelance design services. However, your digital product streams
            (courses + templates) are growing faster at 45% and 28% respectively.
            Recommendation: Invest more time in course creation this month —
            adding a second course could push monthly revenue past $6,000.
          </p>
          <Button size="sm" className="mt-3">
            Discuss with AI Coach
          </Button>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Revenue figures shown are illustrative. Connect your payment providers
        for real-time tracking.
      </p>
    </div>
  );
}
