"""Skills Diagnosis API routes."""

import uuid

from fastapi import APIRouter, Depends
from openai import AsyncOpenAI

from app.core.dependencies import get_current_user_id, get_openai_client
from app.schemas.skills import (
    SkillDiagnosisRequest,
    SkillDiagnosisResponse,
    SkillProfile,
)
from app.agents.skills_diagnosis import diagnose_skills, suggest_monetization_paths

router = APIRouter(prefix="/skills", tags=["skills"])


@router.post("/diagnose", response_model=SkillDiagnosisResponse)
async def run_skills_diagnosis(
    request: SkillDiagnosisRequest,
    user_id: str = Depends(get_current_user_id),
):
    """Run an AI-powered skills diagnosis.

    Analyzes the user's described skills, experience, and interests to identify
    monetizable opportunities with proficiency, demand, and potential scores.
    """
    client = get_openai_client()

    # Build context message
    context_parts = [f"Skills and experience: {request.description}"]
    if request.experience_years is not None:
        context_parts.append(f"Years of experience: {request.experience_years}")
    if request.current_monthly_income is not None:
        context_parts.append(f"Current monthly income: ${request.current_monthly_income}")
    if request.interests:
        context_parts.append(f"Interests: {', '.join(request.interests)}")

    user_input = "\n".join(context_parts)

    # Call the skills diagnosis agent
    analysis = await diagnose_skills(client, user_input)

    # For MVP, return structured sample data with the AI analysis as summary
    # In production, this would parse the AI response into structured data
    sample_skills = [
        SkillProfile(
            name="UI/UX Design",
            category="Design",
            proficiency_level=85,
            monetization_potential=92,
            demand_score=88,
            suggested_paths=["Freelance consulting", "Course creation", "Template shop"],
        ),
        SkillProfile(
            name="React Development",
            category="Engineering",
            proficiency_level=78,
            monetization_potential=95,
            demand_score=94,
            suggested_paths=["SaaS products", "Freelance development", "Technical writing"],
        ),
        SkillProfile(
            name="Content Writing",
            category="Marketing",
            proficiency_level=72,
            monetization_potential=75,
            demand_score=82,
            suggested_paths=["Blog monetization", "Copywriting services", "Newsletter"],
        ),
    ]

    return SkillDiagnosisResponse(
        skills=sample_skills,
        summary=analysis,
        top_opportunity="React Development",
        total_monetization_potential=87,
    )


@router.get("/profile")
async def get_skill_profile(user_id: str = Depends(get_current_user_id)):
    """Get the user's saved skill profile from the latest diagnosis."""
    # Placeholder — in production, fetch from Supabase
    return {
        "user_id": user_id,
        "skills_count": 5,
        "last_diagnosis": "2026-02-27",
        "top_skill": "React Development",
        "monetization_score": 87,
    }
