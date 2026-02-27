"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  agentType?: string;
  timestamp: Date;
}

const suggestedPrompts = [
  "Analyze my skills and suggest the best monetization path",
  "Help me create a course outline for React developers",
  "How can I increase my consulting revenue?",
  "Create a content calendar for my newsletter",
  "What should I price my design templates at?",
  "Help me set up a workflow for client onboarding",
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Welcome to your AI Income Coach! I'm here to help you diagnose skills, find monetization paths, create content, and optimize your revenue streams.\n\nI can help you with:\n- **Skills Analysis** — Understanding your highest-value skills\n- **Monetization Strategy** — Finding the best revenue paths for you\n- **Content Creation** — Generating courses, templates, and marketing materials\n- **Revenue Optimization** — Analyzing your income and suggesting improvements\n\nWhat would you like to work on today?",
    agentType: "Router",
    timestamp: new Date(),
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getSimulatedResponse(input),
        agentType: getAgentType(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">AI Income Coach</h1>
        <p className="text-muted-foreground mt-1">
          Your personal AI advisor for income optimization. Ask anything about
          skills, monetization, content creation, or revenue growth.
        </p>
      </div>

      {/* Chat Messages */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.agentType && (
                  <Badge variant="secondary" className="text-xs mb-2">
                    {message.agentType} Agent
                  </Badge>
                )}
                <div className="text-sm whitespace-pre-wrap">
                  {message.content}
                </div>
                <span className="text-xs opacity-60 mt-2 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.1s]" />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Suggested Prompts */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-muted-foreground mb-2">
              Try these prompts:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <Badge
                  key={prompt}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10 text-xs"
                  onClick={() => {
                    setInput(prompt);
                  }}
                >
                  {prompt}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Ask your AI Income Coach anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              disabled={isTyping}
            />
            <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
              Send
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            AI responses are suggestions, not financial advice. Uses 1 AI credit
            per message.
          </p>
        </div>
      </Card>
    </div>
  );
}

function getAgentType(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("skill") || lower.includes("diagnos")) return "Skills Diagnosis";
  if (lower.includes("monetiz") || lower.includes("revenue") || lower.includes("price"))
    return "Monetization Strategy";
  if (lower.includes("content") || lower.includes("course") || lower.includes("create"))
    return "Content Creation";
  return "Router";
}

function getSimulatedResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("skill") || lower.includes("diagnos")) {
    return `Based on our analysis, here's your skills assessment:

**Top Monetizable Skills:**
1. **UI/UX Design** — 92% monetization potential, high market demand
2. **React Development** — 95% monetization potential, very high demand
3. **Content Writing** — 75% monetization potential, steady demand

**Key Insight:** Your combination of design + development skills is rare and commands a premium. Creators with this dual skill set earn 2.3x more than single-skill specialists.

**Recommended Next Steps:**
- Run a full skills diagnostic for detailed scoring
- Explore the "UI/UX Consulting" monetization path (95% match)
- Consider creating a React + Design course

Would you like me to dive deeper into any of these areas?`;
  }

  if (lower.includes("course") || lower.includes("content")) {
    return `Here's a suggested course outline based on your skills:

**"Modern React UI Development" — Course Outline**

**Module 1:** React Fundamentals Refresher (2 lessons)
**Module 2:** TypeScript for React Developers (3 lessons)
**Module 3:** Component Architecture Patterns (3 lessons)
**Module 4:** Building a Design System (4 lessons)
**Module 5:** State Management Deep Dive (3 lessons)
**Module 6:** Performance Optimization (2 lessons)
**Module 7:** Testing & Deployment (2 lessons)
**Module 8:** Building a Complete Project (4 lessons)

**Pricing Strategy:** $79 early-bird, $129 regular
**Estimated Revenue:** $2,000-$5,000/month after launch
**Platform:** Gumroad (lowest fees, best for tech courses)

Want me to flesh out any specific module or create marketing copy?`;
  }

  if (lower.includes("revenue") || lower.includes("consult") || lower.includes("increase")) {
    return `Here are strategies to optimize your consulting revenue:

**Current Analysis:**
Your consulting stream ($1,200/mo) dropped 5% this month. Here's why and how to fix it:

**Quick Wins:**
1. **Raise your rate** — At $150/hr, you're underpriced for UI/UX consulting. Market rate for your experience level is $200-250/hr.
2. **Add a discovery call** — Set up a free 15-min call on Calendly to improve conversion rates.
3. **Create packages** — Offer "UI Audit" ($500), "UX Sprint" ($2,500), and "Full Redesign" ($5,000+) packages.

**Medium-term:**
4. **Build a referral system** — Offer 10% referral fee to past clients.
5. **Publish case studies** — Turn past projects into detailed case studies for your website.

**Projected Impact:** These changes could increase consulting revenue to $3,000-4,000/month within 2 months.

Should I help you create the service packages or set up the discovery call workflow?`;
  }

  return `Great question! Let me help you with that.

Based on your profile and goals, here are my recommendations:

1. **Focus on your highest-value skills** — Your design and development combination is your biggest competitive advantage.

2. **Diversify income streams** — Top earners maintain 3.3+ revenue streams on average. You're at 4, which is great!

3. **Invest in passive income** — Your course and template shop are growing fastest. Doubling down here will increase earnings with less time investment.

4. **Automate what you can** — Set up workflows for invoicing, client onboarding, and content distribution.

Would you like me to go deeper on any of these points? I can also help with specific tasks like creating content, analyzing revenue data, or setting up automation workflows.`;
}
