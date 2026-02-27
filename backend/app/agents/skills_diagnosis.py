"""Skills Diagnosis Agent — analyzes skills and assesses monetization potential."""

from openai import AsyncOpenAI

from app.agents.base import call_agent, get_specialist_model

SKILLS_DIAGNOSIS_PROMPT = """You are the Skills Diagnosis Agent for IncomeOS.

Your role is to analyze a user's skills, professional experience, and interests to:
1. Identify their top monetizable skills
2. Score each skill on proficiency, monetization potential, and market demand
3. Suggest specific monetization paths for each skill
4. Provide an overall assessment with actionable next steps

When analyzing skills:
- Consider current market demand and trends
- Evaluate combinations of skills that create unique value
- Prioritize skills with the highest income potential
- Consider both active (services) and passive (products) income opportunities

Format your response clearly with structured sections. Use specific numbers and percentages.
Be encouraging but realistic — frame everything as educational guidance, not income guarantees.

Creator economy context:
- Top earners ($101K+) maintain an average of 3.3 revenue streams
- 86% of creators use AI tools
- Only 4% of creators earn over $100,000/year — your job is to help users join that group
- Skills combinations (e.g., design + development) command 2-3x premium"""


async def diagnose_skills(client: AsyncOpenAI, user_input: str) -> str:
    """Run a comprehensive skills diagnosis.

    Args:
        client: AsyncOpenAI client instance
        user_input: User's description of their skills and experience

    Returns:
        Detailed skills analysis and monetization assessment
    """
    return await call_agent(
        client=client,
        system_prompt=SKILLS_DIAGNOSIS_PROMPT,
        user_message=user_input,
        model=get_specialist_model(),
        temperature=0.7,
        max_tokens=3000,
    )


MONETIZATION_PATHS_PROMPT = """You are the Monetization Path Advisor for IncomeOS.

Based on the user's skill profile, recommend specific monetization paths. For each path, provide:
1. Title and category (Services, Digital Products, Content, SaaS)
2. Match score (0-100) based on the user's skills
3. Estimated monthly revenue range
4. Time to first revenue
5. Difficulty level (beginner, intermediate, advanced)
6. Step-by-step implementation plan (5 steps)
7. Required tools and platforms

Rank paths by match score (highest first). Include a mix of quick wins and high-ceiling opportunities.
Always note that revenue estimates are based on market data and actual results depend on execution."""


async def suggest_monetization_paths(client: AsyncOpenAI, skill_profile: str) -> str:
    """Suggest monetization paths based on a skill profile.

    Args:
        client: AsyncOpenAI client instance
        skill_profile: User's diagnosed skill profile

    Returns:
        Ranked list of monetization path recommendations
    """
    return await call_agent(
        client=client,
        system_prompt=MONETIZATION_PATHS_PROMPT,
        user_message=skill_profile,
        model=get_specialist_model(),
        temperature=0.7,
        max_tokens=3000,
    )
