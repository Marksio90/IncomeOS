"""Base agent configuration and utilities for the IncomeOS agent system."""

from openai import AsyncOpenAI

from app.core.config import settings

SYSTEM_DISCLAIMER = (
    "\n\nIMPORTANT: You are an AI assistant. Always be transparent that you are AI. "
    "Never guarantee income or financial returns. Frame all suggestions as educational "
    "and strategic tools. Actual results depend on individual effort and market conditions."
)


def get_router_model() -> str:
    """Get the model for routing/classification (fast, cheap)."""
    return settings.OPENAI_MODEL_ROUTER


def get_specialist_model() -> str:
    """Get the model for specialist agents (balanced)."""
    return settings.OPENAI_MODEL_SPECIALIST


def get_complex_model() -> str:
    """Get the model for complex reasoning tasks."""
    return settings.OPENAI_MODEL_COMPLEX


async def call_agent(
    client: AsyncOpenAI,
    system_prompt: str,
    user_message: str,
    model: str | None = None,
    temperature: float = 0.7,
    max_tokens: int = 2000,
) -> str:
    """Call an AI agent with the given prompts.

    Args:
        client: AsyncOpenAI client instance
        system_prompt: System instructions for the agent
        user_message: User's input message
        model: Model to use (defaults to specialist model)
        temperature: Response creativity (0-1)
        max_tokens: Maximum response length

    Returns:
        The agent's text response
    """
    response = await client.chat.completions.create(
        model=model or get_specialist_model(),
        messages=[
            {"role": "system", "content": system_prompt + SYSTEM_DISCLAIMER},
            {"role": "user", "content": user_message},
        ],
        temperature=temperature,
        max_tokens=max_tokens,
    )
    return response.choices[0].message.content or ""
