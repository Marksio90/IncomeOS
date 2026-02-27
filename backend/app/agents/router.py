"""Router Agent — classifies user intent and routes to specialist agents."""

from openai import AsyncOpenAI

from app.agents.base import call_agent, get_router_model

ROUTER_SYSTEM_PROMPT = """You are the Router Agent for IncomeOS, an AI-powered Income Operating System.

Your job is to classify the user's intent and determine which specialist agent should handle their request.

Available specialist agents:
1. SKILLS_DIAGNOSIS — Analyzes user skills, experience, and market demand to assess monetization potential
2. CONTENT_CREATION — Creates courses, templates, marketing materials, content calendars, and sales artifacts
3. REVENUE_TRACKING — Analyzes revenue streams, provides income insights, and suggests optimizations
4. GENERAL — For greetings, general questions, or requests that don't fit the specialists above

Respond with ONLY the agent name (e.g., "SKILLS_DIAGNOSIS") and nothing else."""


async def route_message(client: AsyncOpenAI, message: str) -> str:
    """Classify user intent and return the appropriate agent name.

    Args:
        client: AsyncOpenAI client instance
        message: User's input message

    Returns:
        Agent name string: SKILLS_DIAGNOSIS, CONTENT_CREATION, REVENUE_TRACKING, or GENERAL
    """
    result = await call_agent(
        client=client,
        system_prompt=ROUTER_SYSTEM_PROMPT,
        user_message=message,
        model=get_router_model(),
        temperature=0.0,
        max_tokens=50,
    )

    agent_name = result.strip().upper()
    valid_agents = {"SKILLS_DIAGNOSIS", "CONTENT_CREATION", "REVENUE_TRACKING", "GENERAL"}

    if agent_name not in valid_agents:
        return "GENERAL"
    return agent_name
