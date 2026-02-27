from pydantic import BaseModel, Field


class RevenueStream(BaseModel):
    """A single revenue stream."""

    id: str
    name: str
    type: str
    monthly_revenue: float
    trend: str
    trend_percent: float
    customers: int
    last_payment: str | None = None


class RevenueOverview(BaseModel):
    """Revenue overview with KPIs."""

    total_monthly_revenue: float
    monthly_growth_percent: float
    projected_annual: float
    active_streams: int
    total_customers: int
    streams: list[RevenueStream]
    monthly_history: list[dict]


class RevenueInsight(BaseModel):
    """AI-generated revenue insight."""

    title: str
    description: str
    impact: str
    priority: str = Field(description="high, medium, or low")
