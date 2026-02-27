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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const monetizationPaths = [
  {
    id: "freelance-consulting",
    title: "UI/UX Consulting",
    category: "Services",
    matchScore: 95,
    estimatedRevenue: { min: 3000, max: 8000 },
    timeToRevenue: "1-2 weeks",
    difficulty: "intermediate" as const,
    description:
      "Offer high-value UI/UX consulting to startups and agencies. Your design proficiency and project management skills make this a strong fit.",
    steps: [
      "Create a consulting portfolio page",
      "Set up a booking system with Calendly",
      "Define your service packages ($150-250/hr)",
      "Publish case studies from past work",
      "Launch targeted outreach campaign",
    ],
    requiredSkills: ["UI/UX Design", "Project Management"],
    tools: ["Calendly", "Stripe", "Notion"],
  },
  {
    id: "online-course",
    title: "React & TypeScript Course",
    category: "Digital Products",
    matchScore: 91,
    estimatedRevenue: { min: 2000, max: 10000 },
    timeToRevenue: "4-8 weeks",
    difficulty: "intermediate" as const,
    description:
      "Create a comprehensive React + TypeScript course leveraging your development and teaching abilities.",
    steps: [
      "Outline 8-12 module curriculum",
      "Record video lessons with screen sharing",
      "Build practice projects and exercises",
      "Set up course platform (Gumroad/Teachable)",
      "Launch with early-bird pricing at $79",
    ],
    requiredSkills: ["React Development", "Content Writing"],
    tools: ["Gumroad", "Loom", "Notion"],
  },
  {
    id: "template-shop",
    title: "Design Template Store",
    category: "Digital Products",
    matchScore: 88,
    estimatedRevenue: { min: 500, max: 3000 },
    timeToRevenue: "2-4 weeks",
    difficulty: "beginner" as const,
    description:
      "Sell UI/UX templates, component libraries, and design kits. Low ongoing effort with compounding returns.",
    steps: [
      "Create 5-10 high-quality templates",
      "Set up Gumroad or Lemonsqueezy store",
      "Write compelling product descriptions",
      "Share on Twitter/LinkedIn for organic reach",
      "Build an email list for new releases",
    ],
    requiredSkills: ["UI/UX Design"],
    tools: ["Figma", "Gumroad", "ConvertKit"],
  },
  {
    id: "newsletter",
    title: "Tech Newsletter",
    category: "Content",
    matchScore: 82,
    estimatedRevenue: { min: 300, max: 2000 },
    timeToRevenue: "8-16 weeks",
    difficulty: "beginner" as const,
    description:
      "Launch a weekly newsletter combining your technical and writing skills. Monetize through sponsorships and premium content.",
    steps: [
      "Choose a niche topic (e.g., React UI patterns)",
      "Set up Substack or Beehiiv",
      "Write 4 foundational issues",
      "Cross-promote on social media",
      "Reach 1,000 subscribers for sponsorship revenue",
    ],
    requiredSkills: ["Content Writing", "React Development"],
    tools: ["Substack", "Twitter", "Canva"],
  },
  {
    id: "saas-product",
    title: "Micro-SaaS Product",
    category: "Products",
    matchScore: 78,
    estimatedRevenue: { min: 1000, max: 15000 },
    timeToRevenue: "12-20 weeks",
    difficulty: "advanced" as const,
    description:
      "Build a focused SaaS tool solving a specific pain point. High ceiling but requires significant upfront investment.",
    steps: [
      "Validate a problem worth solving",
      "Build an MVP in 4-6 weeks",
      "Launch on Product Hunt",
      "Iterate based on user feedback",
      "Implement subscription billing with Stripe",
    ],
    requiredSkills: ["React Development", "UI/UX Design", "Data Analysis"],
    tools: ["Vercel", "Supabase", "Stripe"],
  },
];

const difficultyColors = {
  beginner: "text-green-600 bg-green-100",
  intermediate: "text-yellow-600 bg-yellow-100",
  advanced: "text-red-600 bg-red-100",
};

export default function MonetizationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Monetization Paths</h1>
        <p className="text-muted-foreground mt-1">
          AI-recommended revenue streams based on your skill profile, sorted by
          match score.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Paths</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="products">Digital Products</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          {monetizationPaths.map((path) => (
            <Card key={path.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-xl">{path.title}</CardTitle>
                      <Badge variant="secondary">{path.category}</Badge>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          difficultyColors[path.difficulty]
                        }`}
                      >
                        {path.difficulty}
                      </span>
                    </div>
                    <CardDescription>{path.description}</CardDescription>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-2xl font-bold text-primary">
                      {path.matchScore}%
                    </div>
                    <p className="text-xs text-muted-foreground">match score</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">
                      Est. Monthly Revenue
                    </p>
                    <p className="font-semibold">
                      ${path.estimatedRevenue.min.toLocaleString()} - $
                      {path.estimatedRevenue.max.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">
                      Time to First Revenue
                    </p>
                    <p className="font-semibold">{path.timeToRevenue}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">
                      Required Skills
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {path.requiredSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">
                    Implementation Steps
                  </p>
                  <ol className="space-y-1">
                    {path.steps.map((step, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button>Generate Full Plan</Button>
                  <Button variant="outline">Create Artifacts</Button>
                  <Button variant="outline">Ask AI Coach</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="services" className="space-y-4 mt-4">
          {monetizationPaths
            .filter((p) => p.category === "Services")
            .map((path) => (
              <Card key={path.id}>
                <CardHeader>
                  <CardTitle>{path.title}</CardTitle>
                  <CardDescription>{path.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="products" className="space-y-4 mt-4">
          {monetizationPaths
            .filter((p) => p.category === "Digital Products" || p.category === "Products")
            .map((path) => (
              <Card key={path.id}>
                <CardHeader>
                  <CardTitle>{path.title}</CardTitle>
                  <CardDescription>{path.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="content" className="space-y-4 mt-4">
          {monetizationPaths
            .filter((p) => p.category === "Content")
            .map((path) => (
              <Card key={path.id}>
                <CardHeader>
                  <CardTitle>{path.title}</CardTitle>
                  <CardDescription>{path.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
        </TabsContent>
      </Tabs>

      <p className="text-xs text-muted-foreground">
        Revenue estimates are based on market data and skill analysis. Actual
        results depend on effort, market conditions, and execution. These are not
        income guarantees.
      </p>
    </div>
  );
}
