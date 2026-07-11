from __future__ import annotations

from httpx import AsyncClient

import app.main


async def test_healthcheck(client: AsyncClient) -> None:
    response = await client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


async def test_summary_uses_async_service(monkeypatch, client: AsyncClient) -> None:
    async def fake_summary(_session):
        return {"totals": {"patients": 4000}}

    monkeypatch.setattr(app.main, "get_summary_metrics", fake_summary)

    response = await client.get("/api/summary")

    assert response.status_code == 200
    assert response.json() == {"totals": {"patients": 4000}}


async def test_patients_supports_query_params(monkeypatch, client: AsyncClient) -> None:
    captured: dict[str, object] = {}

    async def fake_patients(session, **kwargs):
        captured["session"] = session
        captured.update(kwargs)
        return {
            "total": 1,
            "limit": kwargs["limit"],
            "offset": kwargs["offset"],
            "items": [{"id": "pat_123", "full_name": "Pat Example"}],
        }

    monkeypatch.setattr(app.main, "get_patient_rows", fake_patients)

    response = await client.get(
        "/api/patients",
        params={
            "q": "smith",
            "source": "instagram",
            "sort": "appointment_count",
            "order": "asc",
            "limit": 10,
            "offset": 20,
        },
    )

    assert response.status_code == 200
    assert response.json()["items"][0]["id"] == "pat_123"
    assert captured["q"] == "smith"
    assert captured["source"] == "instagram"
    assert captured["sort"] == "appointment_count"
    assert captured["order"] == "asc"
    assert captured["limit"] == 10
    assert captured["offset"] == 20


async def test_metadata_uses_async_service(monkeypatch, client: AsyncClient) -> None:
    async def fake_metadata(_session):
        return {"sources": ["google", "instagram"], "service_count": 10, "provider_count": 10}

    monkeypatch.setattr(app.main, "get_metadata", fake_metadata)

    response = await client.get("/api/metadata")

    assert response.status_code == 200
    assert response.json()["sources"] == ["google", "instagram"]
