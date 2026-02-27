from pydantic import BaseModel, Field


class MonetizationPath(BaseModel):
    """A recommended monetization path."""

    id: str
    title: str
    category: str
    description: str
    match_score: int = Field(ge=0, le=100)
    estimated_revenue_min: float
    estimated_revenue_max: float
    time_to_revenue: str
    difficulty: str
    required_skills: list[str]
    implementation_steps: list[str]
    recommended_tools: list[str]


class MonetizationPathsResponse(BaseModel):
    """Response with recommended monetization paths."""

    paths: list[MonetizationPath]
    summary: str


class MonetizationPlanRequest(BaseModel):
    """Request to generate a detailed monetization plan."""

    path_id: str
    budget: float | None = None
    time_commitment_hours_per_week: int | None = None
