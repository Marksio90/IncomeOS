from functools import lru_cache

from openai import AsyncOpenAI

from app.core.config import settings


@lru_cache
def get_openai_client() -> AsyncOpenAI:
    """Get a cached OpenAI async client."""
    return AsyncOpenAI(api_key=settings.OPENAI_API_KEY)


async def get_current_user_id() -> str:
    """Extract user ID from request. Placeholder for Clerk JWT verification."""
    # In production, this would verify the Clerk JWT token
    # and extract the user ID from the claims
    return "demo-user-id"
