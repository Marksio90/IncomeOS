from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    """Chat message request."""

    message: str = Field(..., min_length=1, max_length=10000)
    conversation_id: str | None = None


class ChatResponse(BaseModel):
    """Chat message response."""

    message: str
    agent_type: str
    conversation_id: str
    credits_used: int = 1
