"""Revenue Tracking API routes."""

from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user_id
from app.schemas.revenue import RevenueOverview, RevenueStream

router = APIRouter(prefix="/revenue", tags=["revenue"])


@router.get("/overview", response_model=RevenueOverview)
async def get_revenue_overview(user_id: str = Depends(get_current_user_id)):
    """Get a comprehensive revenue overview with KPIs and stream details."""
    streams = [
        RevenueStream(
            id="1",
            name="Freelance Design",
            type="Services",
            monthly_revenue=2400,
            trend="up",
            trend_percent=12,
            customers=3,
            last_payment="Feb 25, 2026",
        ),
        RevenueStream(
            id="2",
            name="Consulting",
            type="Services",
            monthly_revenue=1200,
            trend="down",
            trend_percent=5,
            customers=2,
            last_payment="Feb 22, 2026",
        ),
        RevenueStream(
            id="3",
            name="Online Course",
            type="Digital Products",
            monthly_revenue=890,
            trend="up",
            trend_percent=45,
            customers=42,
            last_payment="Feb 27, 2026",
        ),
        RevenueStream(
            id="4",
            name="Template Shop",
            type="Digital Products",
            monthly_revenue=340,
            trend="up",
            trend_percent=28,
            customers=18,
            last_payment="Feb 26, 2026",
        ),
    ]

    total = sum(s.monthly_revenue for s in streams)

    return RevenueOverview(
        total_monthly_revenue=total,
        monthly_growth_percent=18,
        projected_annual=total * 12,
        active_streams=len(streams),
        total_customers=sum(s.customers for s in streams),
        streams=streams,
        monthly_history=[
            {"month": "Sep", "revenue": 2100},
            {"month": "Oct", "revenue": 2800},
            {"month": "Nov", "revenue": 3200},
            {"month": "Dec", "revenue": 3600},
            {"month": "Jan", "revenue": 4100},
            {"month": "Feb", "revenue": 4830},
        ],
    )


@router.get("/streams")
async def get_revenue_streams(user_id: str = Depends(get_current_user_id)):
    """Get all revenue streams for the current user."""
    return {
        "streams": [
            {"id": "1", "name": "Freelance Design", "type": "Services", "monthly_revenue": 2400},
            {"id": "2", "name": "Consulting", "type": "Services", "monthly_revenue": 1200},
            {"id": "3", "name": "Online Course", "type": "Digital Products", "monthly_revenue": 890},
            {"id": "4", "name": "Template Shop", "type": "Digital Products", "monthly_revenue": 340},
        ]
    }


@router.get("/insights")
async def get_revenue_insights(user_id: str = Depends(get_current_user_id)):
    """Get AI-generated revenue insights and optimization suggestions."""
    return {
        "insights": [
            {
                "title": "Design skills have high consulting demand",
                "description": "UI/UX consulting at $150/hr could add $2,400/month.",
                "impact": "+$2,400/month potential",
                "priority": "high",
            },
            {
                "title": "Template shop revenue accelerating",
                "description": "28% growth — consider a premium bundle to capitalize.",
                "impact": "+$500-1,000/month potential",
                "priority": "medium",
            },
            {
                "title": "Consulting revenue dipped",
                "description": "Down 5%. Optimize booking page and add discovery call.",
                "impact": "Recover $200/month",
                "priority": "medium",
            },
        ]
    }
