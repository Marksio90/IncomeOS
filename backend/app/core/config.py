from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # App
    APP_NAME: str = "IncomeOS"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False
    API_V1_PREFIX: str = "/api/v1"

    # OpenAI
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL_ROUTER: str = "gpt-4o-mini"
    OPENAI_MODEL_SPECIALIST: str = "gpt-4o-mini"
    OPENAI_MODEL_COMPLEX: str = "gpt-4o"

    # Supabase
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # Stripe
    STRIPE_SECRET_KEY: str = ""
    STRIPE_WEBHOOK_SECRET: str = ""
    STRIPE_PRICE_BUILDER: str = ""
    STRIPE_PRICE_OPERATOR: str = ""
    STRIPE_PRICE_CEO: str = ""

    # Clerk
    CLERK_SECRET_KEY: str = ""
    CLERK_PUBLISHABLE_KEY: str = ""

    # CORS
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "https://incomeos.app"]

    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 30

    # AI Credits per tier
    CREDITS_EXPLORER: int = 50
    CREDITS_BUILDER: int = 500
    CREDITS_OPERATOR: int = 2000
    CREDITS_CEO: int = 5000

    model_config = {"env_file": ".env", "case_sensitive": True}


settings = Settings()
