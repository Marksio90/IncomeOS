from pydantic import BaseModel, Field


class SkillDiagnosisRequest(BaseModel):
    """Request for AI skills diagnosis."""

    description: str = Field(
        ...,
        min_length=10,
        max_length=5000,
        description="Description of professional experience and skills",
    )
    experience_years: int | None = Field(
        None, ge=0, le=50, description="Years of professional experience"
    )
    current_monthly_income: float | None = Field(
        None, ge=0, description="Current monthly income in USD"
    )
    interests: list[str] = Field(
        default_factory=list, description="Areas of interest for monetization"
    )


class SkillProfile(BaseModel):
    """Individual skill assessment result."""

    name: str
    category: str
    proficiency_level: int = Field(ge=0, le=100)
    monetization_potential: int = Field(ge=0, le=100)
    demand_score: int = Field(ge=0, le=100)
    suggested_paths: list[str]


class SkillDiagnosisResponse(BaseModel):
    """Full skills diagnosis result."""

    skills: list[SkillProfile]
    summary: str
    top_opportunity: str
    total_monetization_potential: int
