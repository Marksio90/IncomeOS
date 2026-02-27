"""Tests for IncomeOS API endpoints."""

import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_root():
    """Test the root health check endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "IncomeOS"
    assert data["status"] == "operational"


def test_health_check():
    """Test the detailed health check."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"


def test_get_skill_profile():
    """Test getting the user's skill profile."""
    response = client.get("/api/v1/skills/profile")
    assert response.status_code == 200
    data = response.json()
    assert "user_id" in data
    assert "top_skill" in data


def test_get_monetization_paths():
    """Test getting monetization path recommendations."""
    response = client.get("/api/v1/monetization/paths")
    assert response.status_code == 200
    data = response.json()
    assert "paths" in data
    assert len(data["paths"]) > 0
    assert "match_score" in data["paths"][0]


def test_generate_monetization_plan():
    """Test generating a monetization plan."""
    response = client.post("/api/v1/monetization/paths/freelance-consulting/plan")
    assert response.status_code == 200
    data = response.json()
    assert data["path_id"] == "freelance-consulting"
    assert "plan" in data


def test_get_revenue_overview():
    """Test getting the revenue overview."""
    response = client.get("/api/v1/revenue/overview")
    assert response.status_code == 200
    data = response.json()
    assert data["total_monthly_revenue"] > 0
    assert len(data["streams"]) > 0


def test_get_revenue_streams():
    """Test getting revenue streams."""
    response = client.get("/api/v1/revenue/streams")
    assert response.status_code == 200
    data = response.json()
    assert "streams" in data


def test_get_revenue_insights():
    """Test getting AI revenue insights."""
    response = client.get("/api/v1/revenue/insights")
    assert response.status_code == 200
    data = response.json()
    assert "insights" in data
    assert len(data["insights"]) > 0


def test_list_workflows():
    """Test listing workflows."""
    response = client.get("/api/v1/workflows/")
    assert response.status_code == 200
    data = response.json()
    assert "workflows" in data


def test_create_workflow():
    """Test creating a new workflow."""
    response = client.post(
        "/api/v1/workflows/",
        json={
            "name": "Test Workflow",
            "description": "A test workflow",
            "trigger": "manual",
            "actions": [{"type": "test_action", "config": {}}],
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Workflow"
    assert data["status"] == "draft"


def test_get_user_profile():
    """Test getting the user profile."""
    response = client.get("/api/v1/user/profile")
    assert response.status_code == 200
    data = response.json()
    assert "tier" in data
    assert "credits_remaining" in data


def test_get_credits():
    """Test getting credit balance."""
    response = client.get("/api/v1/user/credits")
    assert response.status_code == 200
    data = response.json()
    assert "credits_remaining" in data
    assert "credits_total" in data


def test_update_user_profile():
    """Test updating the user profile."""
    response = client.patch(
        "/api/v1/user/profile",
        json={"name": "Updated Name"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "updated_fields" in data


def test_skills_diagnosis_validation():
    """Test skills diagnosis request validation."""
    # Too short description
    response = client.post(
        "/api/v1/skills/diagnose",
        json={"description": "short"},
    )
    assert response.status_code == 422  # Validation error
