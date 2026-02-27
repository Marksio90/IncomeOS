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
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

interface SkillResult {
  name: string;
  category: string;
  proficiency: number;
  monetizationPotential: number;
  demandScore: number;
  suggestedPaths: string[];
}

const sampleSkills: SkillResult[] = [
  {
    name: "UI/UX Design",
    category: "Design",
    proficiency: 85,
    monetizationPotential: 92,
    demandScore: 88,
    suggestedPaths: ["Freelance consulting", "Course creation", "Template shop"],
  },
  {
    name: "React Development",
    category: "Engineering",
    proficiency: 78,
    monetizationPotential: 95,
    demandScore: 94,
    suggestedPaths: ["SaaS products", "Freelance development", "Technical writing"],
  },
  {
    name: "Content Writing",
    category: "Marketing",
    proficiency: 72,
    monetizationPotential: 75,
    demandScore: 82,
    suggestedPaths: ["Blog monetization", "Copywriting services", "Newsletter"],
  },
  {
    name: "Data Analysis",
    category: "Analytics",
    proficiency: 65,
    monetizationPotential: 88,
    demandScore: 91,
    suggestedPaths: ["Consulting", "Online courses", "Dashboard templates"],
  },
  {
    name: "Project Management",
    category: "Business",
    proficiency: 80,
    monetizationPotential: 70,
    demandScore: 78,
    suggestedPaths: ["Consulting", "Notion templates", "Coaching"],
  },
];

export default function SkillsDiagnosisPage() {
  const [description, setDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [skills, setSkills] = useState<SkillResult[] | null>(null);

  const handleDiagnose = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setSkills(sampleSkills);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Skills Diagnosis</h1>
        <p className="text-muted-foreground mt-1">
          AI-powered analysis of your skills to identify the highest-value
          monetization opportunities.
        </p>
      </div>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>Tell Us About Your Skills</CardTitle>
          <CardDescription>
            Describe your professional experience, skills, and what you&apos;re
            passionate about. Our AI will analyze your monetization potential.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Example: I'm a frontend developer with 5 years of experience in React and TypeScript. I also do UI/UX design, write technical blog posts, and manage projects using Agile methodology..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Quick add:</span>
            {[
              "Design",
              "Development",
              "Writing",
              "Marketing",
              "Analytics",
              "Management",
              "Teaching",
              "Sales",
            ].map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10"
                onClick={() =>
                  setDescription((prev) =>
                    prev ? `${prev}, ${skill}` : skill
                  )
                }
              >
                + {skill}
              </Badge>
            ))}
          </div>
          <div className="flex gap-4">
            <Input
              placeholder="Years of professional experience"
              type="number"
              className="max-w-[250px]"
            />
            <Input
              placeholder="Current monthly income (optional)"
              type="number"
              className="max-w-[250px]"
            />
          </div>
          <Button
            onClick={handleDiagnose}
            disabled={!description || isAnalyzing}
            size="lg"
          >
            {isAnalyzing ? "Analyzing your skills..." : "Run AI Diagnosis"}
          </Button>
          <p className="text-xs text-muted-foreground">
            Uses 1 AI credit. Your data is processed securely and never shared.
          </p>
        </CardContent>
      </Card>

      {/* Results */}
      {skills && (
        <>
          {/* Summary */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle>Diagnosis Complete</CardTitle>
              <CardDescription>
                We identified {skills.length} monetizable skills across{" "}
                {new Set(skills.map((s) => s.category)).size} categories. Your
                top opportunity:{" "}
                <strong>
                  {
                    skills.reduce((a, b) =>
                      a.monetizationPotential > b.monetizationPotential ? a : b
                    ).name
                  }
                </strong>
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <Card key={skill.name}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{skill.name}</CardTitle>
                    <Badge variant="secondary">{skill.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Proficiency</span>
                      <span className="font-medium">{skill.proficiency}%</span>
                    </div>
                    <Progress value={skill.proficiency} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">
                        Monetization Potential
                      </span>
                      <span className="font-medium">
                        {skill.monetizationPotential}%
                      </span>
                    </div>
                    <Progress
                      value={skill.monetizationPotential}
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">
                        Market Demand
                      </span>
                      <span className="font-medium">{skill.demandScore}%</span>
                    </div>
                    <Progress value={skill.demandScore} className="h-2" />
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground mb-2">
                      Suggested monetization paths:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {skill.suggestedPaths.map((path) => (
                        <Badge key={path} variant="outline" className="text-xs">
                          {path}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-4">
            <Button>View Monetization Paths</Button>
            <Button variant="outline">Export Report</Button>
            <Button variant="outline">Talk to AI Coach</Button>
          </div>
        </>
      )}
    </div>
  );
}
