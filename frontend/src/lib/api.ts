const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api/v1";

interface ApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Skills Diagnosis
  diagnoseSkills: (data: { description: string; experience: string[] }) =>
    apiRequest("/skills/diagnose", { method: "POST", body: data }),

  getSkillProfile: () => apiRequest("/skills/profile"),

  // Monetization
  getMonetizationPaths: () => apiRequest("/monetization/paths"),

  generateMonetizationPlan: (pathId: string) =>
    apiRequest(`/monetization/paths/${pathId}/plan`, { method: "POST" }),

  // Revenue
  getRevenueOverview: () => apiRequest("/revenue/overview"),

  getRevenueStreams: () => apiRequest("/revenue/streams"),

  // Chat / AI
  sendMessage: (message: string) =>
    apiRequest("/chat/message", { method: "POST", body: { message } }),

  // Workflows
  getWorkflows: () => apiRequest("/workflows"),

  createWorkflow: (data: { name: string; trigger: string; actions: string[] }) =>
    apiRequest("/workflows", { method: "POST", body: data }),

  // User
  getUserProfile: () => apiRequest("/user/profile"),

  updateUserProfile: (data: Record<string, unknown>) =>
    apiRequest("/user/profile", { method: "PATCH", body: data }),
};
