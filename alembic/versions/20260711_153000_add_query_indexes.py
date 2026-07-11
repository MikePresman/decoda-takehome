"""add query indexes

Revision ID: 20260711_153000
Revises: 20260711_140500
Create Date: 2026-07-11 15:30:00
"""

from __future__ import annotations

from alembic import op


revision = "20260711_153000"
down_revision = "20260711_140500"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_index(op.f("ix_patients_created_date"), "patients", ["created_date"], unique=False)
    op.create_index(op.f("ix_patients_email"), "patients", ["email"], unique=False)
    op.create_index(op.f("ix_patients_first_name"), "patients", ["first_name"], unique=False)
    op.create_index(op.f("ix_patients_last_name"), "patients", ["last_name"], unique=False)
    op.create_index(op.f("ix_patients_phone"), "patients", ["phone"], unique=False)
    op.create_index(op.f("ix_patients_source"), "patients", ["source"], unique=False)

    op.create_index(op.f("ix_appointments_created_date"), "appointments", ["created_date"], unique=False)
    op.create_index(op.f("ix_appointments_status"), "appointments", ["status"], unique=False)

    op.create_index(
        "ix_appointment_services_provider_start",
        "appointment_services",
        ["provider_id", "start"],
        unique=False,
    )
    op.create_index(
        "ix_appointment_services_service_start",
        "appointment_services",
        ["service_id", "start"],
        unique=False,
    )

    op.create_index(op.f("ix_payments_date"), "payments", ["date"], unique=False)
    op.create_index("ix_payments_patient_status", "payments", ["patient_id", "status"], unique=False)
    op.create_index("ix_payments_status_date", "payments", ["status", "date"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_payments_status_date", table_name="payments")
    op.drop_index("ix_payments_patient_status", table_name="payments")
    op.drop_index(op.f("ix_payments_date"), table_name="payments")

    op.drop_index("ix_appointment_services_service_start", table_name="appointment_services")
    op.drop_index("ix_appointment_services_provider_start", table_name="appointment_services")

    op.drop_index(op.f("ix_appointments_status"), table_name="appointments")
    op.drop_index(op.f("ix_appointments_created_date"), table_name="appointments")

    op.drop_index(op.f("ix_patients_source"), table_name="patients")
    op.drop_index(op.f("ix_patients_phone"), table_name="patients")
    op.drop_index(op.f("ix_patients_last_name"), table_name="patients")
    op.drop_index(op.f("ix_patients_first_name"), table_name="patients")
    op.drop_index(op.f("ix_patients_email"), table_name="patients")
    op.drop_index(op.f("ix_patients_created_date"), table_name="patients")
