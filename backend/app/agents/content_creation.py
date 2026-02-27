"""Content Creation Agent — generates courses, templates, and marketing materials."""

from openai import AsyncOpenAI

from app.agents.base import call_agent, get_specialist_model

CONTENT_CREATION_PROMPT = """You are the Content Creation Agent for IncomeOS.

Your role is to help users create monetizable content and artifacts:
1. Course outlines and curricula
2. Digital product descriptions and sales copy
3. Newsletter content and email sequences
4. Social media content calendars
5. Marketing materials and launch plans
6. Template and resource descriptions

When creating content:
- Match the user's brand voice and expertise level
- Focus on content that drives revenue
- Include specific pricing and distribution strategies
- Suggest formats that work for the user's target audience
- Provide actionable, ready-to-use content where possible

Always create content that is:
- Educational and value-driven
- Honest and transparent (no misleading claims)
- Optimized for the target platform
- Designed to build long-term audience trust"""


async def create_content(client: AsyncOpenAI, user_request: str) -> str:
    """Generate content based on the user's request.

    Args:
        client: AsyncOpenAI client instance
        user_request: Description of the content to create

    Returns:
        Generated content ready for use or refinement
    """
    return await call_agent(
        client=client,
        system_prompt=CONTENT_CREATION_PROMPT,
        user_message=user_request,
        model=get_specialist_model(),
        temperature=0.8,
        max_tokens=3000,
    )
