from __future__ import annotations

from datetime import datetime

from app.services.patients import _serialize_patient_row


def test_serialize_patient_row_handles_datetime_values() -> None:
    row = {
        "id": "pat_123",
        "first_name": "Pat",
        "last_name": "Example",
        "full_name": "Pat Example",
        "email": "pat@example.com",
        "phone": "555-0100",
        "address": "123 Main St",
        "date_of_birth": datetime(1980, 1, 1, 0, 0, 0),
        "source": "instagram",
        "gender": "female",
        "created_date": datetime(2025, 1, 1, 9, 30, 0),
        "appointment_count": 5,
        "paid_appointment_count": 4,
        "lifetime_value_cents": 124500,
        "last_appointment_date": datetime(2025, 6, 1, 14, 0, 0),
        "last_paid_date": datetime(2025, 6, 1, 14, 0, 0),
        "preferred_provider_name": "Dr. Jane Smith",
        "top_service_name": "Botox Injection",
    }

    serialized = _serialize_patient_row(row)

    assert serialized["created_date"] == "2025-01-01T09:30:00"
    assert serialized["last_appointment_date"] == "2025-06-01T14:00:00"
    assert serialized["last_paid_date"] == "2025-06-01T14:00:00"
    assert serialized["status"] in {"active", "inactive", "new", "never_paid"}
    assert isinstance(serialized["days_since_last_appointment"], int)
