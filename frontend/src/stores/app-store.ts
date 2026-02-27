import { create } from "zustand";

export interface SkillProfile {
  id: string;
  name: string;
  category: string;
  proficiencyLevel: number;
  monetizationPotential: number;
  demandScore: number;
}

export interface MonetizationPath {
  id: string;
  title: string;
  description: string;
  estimatedRevenue: { min: number; max: number };
  timeToFirstRevenue: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  requiredSkills: string[];
  matchScore: number;
}

export interface RevenueStream {
  id: string;
  name: string;
  type: string;
  monthlyRevenue: number;
  trend: "up" | "down" | "stable";
  trendPercent: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  agentType?: string;
}

interface AppState {
  skills: SkillProfile[];
  monetizationPaths: MonetizationPath[];
  revenueStreams: RevenueStream[];
  chatMessages: ChatMessage[];
  totalMonthlyRevenue: number;
  aiCreditsRemaining: number;
  currentTier: "explorer" | "builder" | "operator" | "ceo";

  setSkills: (skills: SkillProfile[]) => void;
  setMonetizationPaths: (paths: MonetizationPath[]) => void;
  setRevenueStreams: (streams: RevenueStream[]) => void;
  addChatMessage: (message: ChatMessage) => void;
  setTotalMonthlyRevenue: (revenue: number) => void;
  setAiCreditsRemaining: (credits: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  skills: [],
  monetizationPaths: [],
  revenueStreams: [],
  chatMessages: [],
  totalMonthlyRevenue: 0,
  aiCreditsRemaining: 50,
  currentTier: "explorer",

  setSkills: (skills) => set({ skills }),
  setMonetizationPaths: (paths) => set({ monetizationPaths: paths }),
  setRevenueStreams: (streams) => set({ revenueStreams: streams }),
  addChatMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  setTotalMonthlyRevenue: (revenue) => set({ totalMonthlyRevenue: revenue }),
  setAiCreditsRemaining: (credits) => set({ aiCreditsRemaining: credits }),
}));
