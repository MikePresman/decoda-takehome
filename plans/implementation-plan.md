# Beauty Med Spa Dashboard Implementation Plan

The take-home breaks into four real pieces: data modeling, backend API, frontend product, and deployment. The seed data is enough to start immediately: `4000` patients, `6000` appointments, `8398` appointment-service rows, `5311` payments, `10` providers, and `10` services. The core relationship shape is straightforward: patients -> appointments -> appointment_services, with payments attached to appointments and providers/services attached through the join table.

## Phase 1: Clarify the target app

1. Define the MVP scope around the required deliverables only: patient table, analytics dashboard, deployed app.
2. Lock the stack:
   - Backend: FastAPI + async SQLAlchemy + PostgreSQL
   - Frontend: Next.js 14 + TypeScript
   - Deployment: Railway
3. Decide repo structure:
   - `backend/`
   - `frontend/`
   - optional shared docs/scripts at root
4. Define what "AI-ready architecture" means in practice:
   - clean domain schema
   - explicit query/service layer
   - analytics endpoints that can later support arbitrary question answering

## Phase 2: Understand and normalize the data

1. Inspect all JSON files fully and confirm field consistency, nullability, and foreign key integrity.
2. Validate assumptions:
   - every `appointment.patient_id` matches a patient
   - every `payment.appointment_id` matches an appointment
   - every `appointment_service.service_id` and `provider_id` resolve correctly
3. Document business rules from the data:
   - payment amounts are in cents
   - not all appointments are paid
   - appointments may include multiple services
   - providers are tied per appointment-service row, not just per appointment
4. Identify useful derived fields:
   - patient age
   - patient lifetime value
   - last appointment date
   - appointment count
   - paid vs unpaid appointments
   - top service/provider/source per patient or globally

## Phase 3: Design the relational database

1. Create the PostgreSQL schema:
   - `patients`
   - `appointments`
   - `providers`
   - `services`
   - `appointment_services`
   - `payments`
2. Add proper keys and constraints:
   - PKs on all base tables
   - composite PK or unique constraint for `appointment_services`
   - FKs across all relationships
3. Add indexes for expected UI/API usage:
   - patient name/email/phone
   - patient source
   - appointment patient/date
   - payment appointment/status/date
   - appointment_service provider/service/start
4. Decide how to store timestamps and whether to normalize enums in DB or app layer.

## Phase 4: Build ingestion pipeline

1. Create SQLAlchemy ORM models matching the final schema.
2. Build a seed import script that:
   - parses JSON
   - validates references
   - inserts in dependency order
   - is safe to rerun or reset cleanly
3. Add a simple command flow:
   - create schema
   - seed database
   - verify row counts
4. Produce a short seed report after import so problems are visible immediately.

## Phase 5: Backend API design

1. Create a clean FastAPI project layout:
   - app bootstrap
   - config
   - db session management
   - models
   - schemas
   - repositories/services
   - routers
2. Build the patient table API:
   - paginated list endpoint
   - search by name/email/phone
   - filters for source, gender, payment/activity state
   - sort by created date, last appointment, lifetime value, appointment count
3. Build analytics endpoints:
   - top-line KPIs
   - patient acquisition breakdown
   - revenue totals and trends
   - popular services
   - busiest providers
   - appointment status mix
4. Keep response contracts frontend-friendly and stable.
5. Add `/health` for Railway.

## Phase 6: Query and analytics layer

1. Separate analytics queries from route handlers.
2. Implement reusable aggregation functions/services so later AI features can call the same logic.
3. Define a small metrics vocabulary:
   - total patients
   - total revenue
   - collection rate
   - avg revenue per patient
   - avg appointment value
   - patients by source
   - appointments by provider/service
4. Prefer DB-side aggregation over Python-side processing once Postgres is in place.

## Phase 7: Frontend architecture

1. Set up Next.js app router project.
2. Establish a clear design system aligned loosely with Decoda's aesthetic:
   - calm, clinical, polished
   - good information density
3. Create global layout:
   - sidebar or top nav
   - pages for `Patients` and `Analytics`
4. Add typed API client utilities and loading/error states.

## Phase 8: Patient table page

1. Decide the most useful columns for front desk staff:
   - name
   - contact info
   - source
   - created date
   - appointment count
   - last appointment
   - lifetime value
2. Add UX features:
   - debounced search
   - sortable columns
   - filters
   - pagination
   - empty states
3. Make row scanning easy:
   - sticky headers
   - clear spacing
   - concise formatting for dates/currency

## Phase 9: Analytics dashboard page

1. Build top KPI cards first.
2. Add practical charts/tables, not filler:
   - patient source mix
   - top services
   - busiest providers
   - revenue over time
   - appointment status distribution
3. Prioritize useful management insights:
   - which channels drive patients
   - which services generate demand
   - which providers are most utilized
   - whether revenue and bookings align
4. Keep the dashboard legible on laptop screens; mobile can degrade gracefully.

## Phase 10: AI-ready preparation

1. Keep data access organized around domain queries, not page-specific hacks.
2. Create a service layer that can answer structured business questions.
3. Add metadata and filter definitions centrally so a future "ask the data" tool can reuse them.
4. Consider one generic analytics query abstraction only if it stays simple; avoid premature NL-to-SQL work now.

## Phase 11: Testing and verification

1. Add backend tests for:
   - seed import correctness
   - patient list filtering/sorting/pagination
   - analytics endpoint outputs
2. Add light frontend tests for critical rendering and interaction paths.
3. Validate against expected counts from seed data after every rebuild.
4. Run basic performance checks on patient listing and analytics queries.

## Phase 12: Railway deployment

1. Provision PostgreSQL on Railway.
2. Add env-based config:
   - `DATABASE_URL`
   - backend/frontend base URLs as needed
3. Deploy backend and frontend as separate services, or one project with two services.
4. Run migrations and seed in Railway.
5. Verify:
   - service boots
   - DB connects
   - healthcheck passes
   - frontend reaches backend
6. Put the public URL in the README.

## Execution order

1. Create final repo structure.
2. Build DB schema and seed pipeline.
3. Build backend patient and analytics APIs.
4. Stand up frontend shell and wire patient page.
5. Build analytics page.
6. Add tests and cleanup.
7. Deploy to Railway and verify publicly.

## Immediate next step

The right next move is Phase 2 plus Phase 3 together: fully audit the seed data and design the Postgres schema before writing more app code. That avoids building the API/UI on top of weak assumptions.
