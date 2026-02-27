"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sidebarItems = [
  { href: "/dashboard", label: "Overview", icon: "📊" },
  { href: "/dashboard/skills", label: "Skills Diagnosis", icon: "🎯" },
  { href: "/dashboard/monetize", label: "Monetization", icon: "💰" },
  { href: "/dashboard/revenue", label: "Revenue", icon: "📈" },
  { href: "/dashboard/workflows", label: "Workflows", icon: "⚡" },
  { href: "/dashboard/chat", label: "AI Coach", icon: "🤖" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card hidden md:flex flex-col">
        <div className="p-6 border-b">
          <Link href="/" className="text-xl font-bold text-primary">
            IncomeOS
          </Link>
          <p className="text-xs text-muted-foreground mt-1">
            Income Operating System
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <span>{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium">AI Credits</span>
              <Badge variant="secondary" className="text-xs">
                Explorer
              </Badge>
            </div>
            <div className="text-lg font-bold">42 / 50</div>
            <div className="w-full bg-secondary rounded-full h-1.5 mt-2">
              <div
                className="bg-primary h-1.5 rounded-full"
                style={{ width: "84%" }}
              />
            </div>
            <Button size="sm" className="w-full mt-3" variant="outline">
              Upgrade Plan
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b flex items-center justify-between px-6 bg-card">
          <div className="md:hidden text-xl font-bold text-primary">
            IncomeOS
          </div>
          <div className="hidden md:block" />
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Notifications
            </Button>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
              U
            </div>
          </div>
        </header>
        <div className="flex-1 p-6 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
