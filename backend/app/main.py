"""IncomeOS Backend — AI-Powered Income Operating System API."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import chat, monetization, revenue, skills, user, workflows
from app.core.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "IncomeOS API — Diagnose skills, discover monetization paths, "
        "create artifacts, automate workflows, and monitor revenue."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(skills.router, prefix=settings.API_V1_PREFIX)
app.include_router(monetization.router, prefix=settings.API_V1_PREFIX)
app.include_router(revenue.router, prefix=settings.API_V1_PREFIX)
app.include_router(chat.router, prefix=settings.API_V1_PREFIX)
app.include_router(workflows.router, prefix=settings.API_V1_PREFIX)
app.include_router(user.router, prefix=settings.API_V1_PREFIX)


@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "operational",
        "description": "AI-Powered Income Operating System",
    }


@app.get("/health")
async def health_check():
    """Detailed health check for monitoring."""
    return {
        "status": "healthy",
        "version": settings.APP_VERSION,
        "services": {
            "api": "operational",
            "ai_agents": "operational",
        },
    }
