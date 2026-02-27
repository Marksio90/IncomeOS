"""Agent Orchestrator — routes messages to specialist agents and manages conversations."""

from openai import AsyncOpenAI

from app.agents.base import call_agent, get_specialist_model
from app.agents.content_creation import create_content
from app.agents.revenue_tracking import analyze_revenue
from app.agents.router import route_message
from app.agents.skills_diagnosis import diagnose_skills

GENERAL_AGENT_PROMPT = """You are the General AI Coach for IncomeOS, an AI-powered Income Operating System.

You help creators, freelancers, and solopreneurs optimize their income through:
- Skills assessment and monetization guidance
- Content creation and digital product strategy
- Revenue stream management and optimization
- Workflow automation for income-generating tasks

Be helpful, encouraging, and specific. Provide actionable advice. When appropriate,
suggest the user try specific IncomeOS features (Skills Diagnosis, Monetization Paths,
Content Creator, Revenue Tracker, Workflow Automation).

Always be transparent that you're an AI assistant. Never guarantee specific income outcomes.
Frame all advice as educational guidance based on market data and best practices."""


async def process_message(
    client: AsyncOpenAI,
    message: str,
    user_context: str = "",
) -> tuple[str, str]:
    """Process a user message through the agent pipeline.

    1. Route the message to determine intent
    2. Call the appropriate specialist agent
    3. Return the response and agent type

    Args:
        client: AsyncOpenAI client instance
        message: User's message
        user_context: Additional context about the user

    Returns:
        Tuple of (response_text, agent_type)
    """
    # Step 1: Route to determine agent
    agent_type = await route_message(client, message)

    # Step 2: Enrich message with context
    enriched_message = message
    if user_context:
        enriched_message = f"User context: {user_context}\n\nUser message: {message}"

    # Step 3: Call specialist agent
    if agent_type == "SKILLS_DIAGNOSIS":
        response = await diagnose_skills(client, enriched_message)
    elif agent_type == "CONTENT_CREATION":
        response = await create_content(client, enriched_message)
    elif agent_type == "REVENUE_TRACKING":
        response = await analyze_revenue(client, enriched_message)
    else:
        response = await call_agent(
            client=client,
            system_prompt=GENERAL_AGENT_PROMPT,
            user_message=enriched_message,
            model=get_specialist_model(),
        )

    return response, agent_type
