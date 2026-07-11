from __future__ import annotations

import os
from collections.abc import AsyncIterator

import pytest
from httpx import ASGITransport, AsyncClient


os.environ.setdefault("DATABASE_URL", "postgresql://beauty_dev:beauty_dev@127.0.0.1:5432/beauty_med_spa")

from app.db.dependencies import get_db_session
from app.main import app


@pytest.fixture
async def client() -> AsyncIterator[AsyncClient]:
    async def _fake_session() -> AsyncIterator[object]:
        yield object()

    app.dependency_overrides[get_db_session] = _fake_session

    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://testserver") as async_client:
        yield async_client

    app.dependency_overrides.clear()

