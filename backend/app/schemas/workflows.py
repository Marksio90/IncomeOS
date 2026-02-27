from pydantic import BaseModel, Field


class WorkflowAction(BaseModel):
    """A single action in a workflow."""

    type: str
    config: dict = Field(default_factory=dict)


class WorkflowCreate(BaseModel):
    """Request to create a new workflow."""

    name: str = Field(..., min_length=1, max_length=200)
    description: str = ""
    trigger: str
    actions: list[WorkflowAction]


class WorkflowResponse(BaseModel):
    """Workflow response."""

    id: str
    name: str
    description: str
    trigger: str
    actions: list[WorkflowAction]
    status: str
    last_run: str | None = None
    runs_this_month: int = 0
