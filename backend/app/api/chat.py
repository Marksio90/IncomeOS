"""Chat / AI Coach API routes."""

import uuid

from fastapi import APIRouter, Depends
from openai import AsyncOpenAI

from app.agents.orchestrator import process_message
from app.core.dependencies import get_current_user_id, get_openai_client
from app.schemas.chat import ChatRequest, ChatResponse

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/message", response_model=ChatResponse)
async def send_chat_message(
    request: ChatRequest,
    user_id: str = Depends(get_current_user_id),
):
    """Send a message to the AI Income Coach.

    The message is routed through the agent orchestrator which:
    1. Classifies intent using the Router Agent
    2. Delegates to the appropriate specialist agent
    3. Returns the response with agent type metadata
    """
    client = get_openai_client()
    conversation_id = request.conversation_id or str(uuid.uuid4())

    # Process through agent pipeline
    response_text, agent_type = await process_message(
        client=client,
        message=request.message,
        user_context=f"User ID: {user_id}",
    )

    # Format agent type for display
    agent_display_names = {
        "SKILLS_DIAGNOSIS": "Skills Diagnosis",
        "CONTENT_CREATION": "Content Creation",
        "REVENUE_TRACKING": "Revenue Tracking",
        "GENERAL": "AI Coach",
    }

    return ChatResponse(
        message=response_text,
        agent_type=agent_display_names.get(agent_type, "AI Coach"),
        conversation_id=conversation_id,
        credits_used=1,
    )
