"""Workflow Automation API routes."""

import uuid

from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user_id
from app.schemas.workflows import WorkflowCreate, WorkflowResponse, WorkflowAction

router = APIRouter(prefix="/workflows", tags=["workflows"])

# In-memory store for MVP. Production uses Supabase.
_workflows: dict[str, dict] = {}


@router.get("/")
async def list_workflows(user_id: str = Depends(get_current_user_id)):
    """List all workflows for the current user."""
    return {
        "workflows": [
            {
                "id": "1",
                "name": "Client Invoice Generator",
                "description": "Automatically generates invoices after consulting sessions.",
                "trigger": "Calendar event ended",
                "actions": [
                    {"type": "generate_invoice", "config": {}},
                    {"type": "send_email", "config": {}},
                    {"type": "log_revenue", "config": {}},
                ],
                "status": "active",
                "last_run": "2 hours ago",
                "runs_this_month": 8,
            },
            {
                "id": "2",
                "name": "Course Sales Notifier",
                "description": "Notifications and tracking for course purchases.",
                "trigger": "Gumroad sale webhook",
                "actions": [
                    {"type": "send_notification", "config": {}},
                    {"type": "update_dashboard", "config": {}},
                    {"type": "add_to_email_list", "config": {}},
                ],
                "status": "active",
                "last_run": "5 hours ago",
                "runs_this_month": 42,
            },
            {
                "id": "3",
                "name": "Weekly Revenue Report",
                "description": "AI-generated weekly income summary with insights.",
                "trigger": "Every Sunday 9:00 AM",
                "actions": [
                    {"type": "aggregate_data", "config": {}},
                    {"type": "generate_insights", "config": {}},
                    {"type": "send_report", "config": {}},
                ],
                "status": "active",
                "last_run": "3 days ago",
                "runs_this_month": 4,
            },
        ],
        "total": 3,
        "active": 3,
    }


@router.post("/", response_model=WorkflowResponse)
async def create_workflow(
    request: WorkflowCreate,
    user_id: str = Depends(get_current_user_id),
):
    """Create a new workflow automation."""
    workflow_id = str(uuid.uuid4())

    workflow = {
        "id": workflow_id,
        "name": request.name,
        "description": request.description,
        "trigger": request.trigger,
        "actions": [a.model_dump() for a in request.actions],
        "status": "draft",
        "user_id": user_id,
    }
    _workflows[workflow_id] = workflow

    return WorkflowResponse(
        id=workflow_id,
        name=request.name,
        description=request.description,
        trigger=request.trigger,
        actions=request.actions,
        status="draft",
        runs_this_month=0,
    )
