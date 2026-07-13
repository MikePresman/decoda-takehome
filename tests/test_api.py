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


async def test_metadata_uses_async_service(monkeypatch, client: AsyncClient) -> None:
    async def fake_metadata(_session):
        return {"sources": ["google", "instagram"], "service_count": 10, "provider_count": 10}

    monkeypatch.setattr(app.main, "get_metadata", fake_metadata)

    response = await client.get("/api/metadata")

    assert response.status_code == 200
    assert response.json()["sources"] == ["google", "instagram"]
