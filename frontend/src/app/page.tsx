import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    title: "Skills Diagnosis",
    description:
      "AI-powered analysis of your skills, experience, and market demand to identify your highest-value monetization opportunities.",
    icon: "🎯",
  },
  {
    title: "Monetization Paths",
    description:
      "Personalized revenue stream recommendations based on your unique skill profile, with step-by-step implementation plans.",
    icon: "💰",
  },
  {
    title: "Content Creation",
    description:
      "AI agents that create courses, templates, guides, and marketing materials tailored to your brand and audience.",
    icon: "✨",
  },
  {
    title: "Workflow Automation",
    description:
      "Automate repetitive tasks across your income streams — from content scheduling to invoice generation.",
    icon: "⚡",
  },
  {
    title: "Revenue Monitoring",
    description:
      "Real-time dashboard tracking all your income streams with AI-powered insights and optimization suggestions.",
    icon: "📊",
  },
  {
    title: "AI Coaching",
    description:
      "24/7 AI business advisor that learns your goals and provides personalized guidance to grow your income.",
    icon: "🤖",
  },
];

const tiers = [
  {
    name: "Explorer",
    price: "Free",
    description: "Get started with AI-powered income insights",
    features: [
      "1 skills diagnostic",
      "3 monetization suggestions",
      "50 AI credits/month",
      "Basic revenue tracking",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Builder",
    price: "$29",
    period: "/month",
    description: "For side hustlers ready to grow",
    features: [
      "Unlimited diagnostics",
      "Full monetization analysis",
      "500 AI credits/month",
      "5 active workflows",
      "Revenue dashboard",
    ],
    cta: "Start Building",
    highlighted: false,
  },
  {
    name: "Operator",
    price: "$49",
    period: "/month",
    description: "For active creators and solopreneurs",
    features: [
      "Everything in Builder",
      "2,000 AI credits/month",
      "25 active workflows",
      "Advanced AI agents",
      "Revenue insights with AI",
      "Priority model access",
    ],
    cta: "Start Operating",
    highlighted: true,
  },
  {
    name: "CEO",
    price: "$99",
    period: "/month",
    description: "For established creators and agencies",
    features: [
      "Everything in Operator",
      "5,000 AI credits/month",
      "Unlimited workflows",
      "Multi-stream monitoring",
      "API access",
      "White-label artifacts",
    ],
    cta: "Go CEO",
    highlighted: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">IncomeOS</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Get Started Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32 text-center">
        <Badge variant="secondary" className="mb-4">
          AI-Powered Income Operating System
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto">
          Turn Your Skills Into{" "}
          <span className="text-primary">Multiple Income Streams</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          IncomeOS diagnoses your skills, recommends monetization paths, creates
          sales artifacts, automates workflows, and monitors your revenue — all
          powered by AI agents working for you 24/7.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8">
              Start Your Free Diagnosis
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="text-lg px-8">
            Watch Demo
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Free tier available. No credit card required.
        </p>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/50">
        <div className="container mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary">$314B</div>
            <div className="text-sm text-muted-foreground">Creator Economy 2026</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">86%</div>
            <div className="text-sm text-muted-foreground">Creators Using AI</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">3.3x</div>
            <div className="text-sm text-muted-foreground">Avg Streams for Top Earners</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">96%</div>
            <div className="text-sm text-muted-foreground">Creators Under $100K/yr</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            The AI-Driven Income Loop
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Six integrated pillars working together to maximize your income
            potential. No other platform connects all six.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { step: "1", title: "Diagnose", desc: "AI analyzes your skills, experience, and market demand" },
            { step: "2", title: "Strategize", desc: "Get personalized monetization paths ranked by potential" },
            { step: "3", title: "Create", desc: "AI agents build courses, templates, and sales materials" },
            { step: "4", title: "Automate", desc: "Set up workflows to run your income streams on autopilot" },
            { step: "5", title: "Monitor", desc: "Track all revenue streams in a unified real-time dashboard" },
            { step: "6", title: "Optimize", desc: "AI continuously suggests improvements to grow your income" },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Everything You Need to Monetize Your Skills
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Six AI-powered pillars that work together as a unified income
              operating system.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start free, scale as you grow. Every tier includes AI-powered income
            optimization.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={
                tier.highlighted
                  ? "border-primary shadow-lg relative"
                  : "relative"
              }
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  {tier.period && (
                    <span className="text-muted-foreground">{tier.period}</span>
                  )}
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <span className="text-primary font-bold">+</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard">
                  <Button
                    className="w-full"
                    variant={tier.highlighted ? "default" : "outline"}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Income Operating System?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join the creators and solopreneurs using AI to diagnose, monetize,
            and scale their income streams.
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-lg font-bold text-primary">IncomeOS</div>
            <p className="text-sm text-muted-foreground">
              &copy; 2026 IncomeOS. All rights reserved. Results may vary. IncomeOS
              provides educational tools and AI-powered strategies, not income
              guarantees.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
