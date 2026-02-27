"""User profile and account API routes."""

from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user_id

router = APIRouter(prefix="/user", tags=["user"])


@router.get("/profile")
async def get_user_profile(user_id: str = Depends(get_current_user_id)):
    """Get the current user's profile and subscription details."""
    return {
        "id": user_id,
        "name": "Demo User",
        "email": "demo@incomeos.app",
        "tier": "explorer",
        "credits_remaining": 42,
        "credits_total": 50,
        "credits_reset_days": 12,
        "income_goal": 10000,
        "active_streams": 4,
        "member_since": "2026-01-15",
    }


@router.patch("/profile")
async def update_user_profile(
    updates: dict,
    user_id: str = Depends(get_current_user_id),
):
    """Update the current user's profile."""
    # In production, validate and save to Supabase
    return {
        "id": user_id,
        "updated_fields": list(updates.keys()),
        "status": "updated",
    }


@router.get("/credits")
async def get_credits(user_id: str = Depends(get_current_user_id)):
    """Get the user's AI credit balance and usage."""
    return {
        "user_id": user_id,
        "tier": "explorer",
        "credits_remaining": 42,
        "credits_total": 50,
        "credits_used_this_month": 8,
        "reset_date": "2026-03-01",
        "usage_breakdown": {
            "skills_diagnosis": 1,
            "chat_messages": 5,
            "content_generation": 2,
        },
    }
