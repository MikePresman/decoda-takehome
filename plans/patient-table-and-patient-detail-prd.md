# Patient Table + Patient Detail PRD / Technical Spec

## Goal

Build a production-quality patient operations experience for Beauty Med Spa with:

1. a filterable, sortable patient table for front desk and clinic staff
2. a patient detail page for answering operational and business questions about a single patient
3. backend API support for both views
4. backend and frontend tests for the critical behavior

This document is the implementation contract before execution.

## Problem Statement

The current repo has:

- a basic `/api/patients` listing route backed by PostgreSQL
- a static mock patient page in `frontend/app/patients/page.tsx`
- no patient detail endpoint
- no reusable table/filter/search components yet

That is not enough for real operations.

Front desk staff, doctors, nurses, and clinic coordinators need to answer questions like:

- Who is this patient and how do I contact them?
- How active is this patient?
- What services do they usually book?
- When were they last seen?
- Are they a high-value repeat patient?
- Are they new, inactive, or at risk of not returning?
- Which provider do they usually see?
- How did they find the practice?
- Did they convert from consult to paid visits?

## Product Objectives

### Primary objectives

1. Make patient lookup fast and reliable
2. Make the patient table useful for day-to-day front desk operations
3. Make patient detail pages answer operational questions without forcing staff to cross-reference multiple screens
4. Keep the backend query model clean enough for future AI analytics work

### Non-goals for this phase

1. Patient editing / CRUD
2. Scheduling workflows
3. Payment collection workflows
4. Notes / charting
5. Auth / permissions model

## Users

### Front desk staff

Needs:

- fast search by name, phone, email
- clear status and last-visit context
- enough information to route calls and answer simple questions quickly

### Clinic operators / managers

Needs:

- patient activity, value, source, visit frequency
- quick identification of new / inactive / high-value patients
- simple cohort-level operational filtering

### Providers

Needs:

- service history
- last seen
- preferred provider / usual provider
- visit cadence

## Required Deliverables

### Required page 1: Patient Table

Must provide:

- filterable table
- sortable columns
- pagination
- loading state
- error state
- empty state
- row click-through to patient detail

### Required page 2: Patient Detail

Must provide:

- patient identity and contact details
- acquisition source
- visit and payment summary
- service and provider history summary
- operational indicators for staff

## UX Principles

### Patient table

The patient table should optimize for scanning, not decoration.

Requirements:

- sticky header
- dense but readable rows
- strong visual hierarchy for name and contact info
- concise date and currency formatting
- status indicators that are immediately legible
- table controls visible above the fold

### Patient detail page

The patient detail page should answer “what do I need to know about this patient right now?”

Top section should show:

- full name
- contact details
- source
- age or DOB context
- last visit
- lifetime value
- total visits
- current operational status

## Data / Domain Requirements

The patient experience must respect the existing relational model:

- patients
- appointments
- appointment_services
- services
- providers
- payments

Important data truths:

- not all appointments have payments
- appointments can have multiple services
- service rows can map to different providers
- payment amounts are stored in cents

## Patient Table Scope

## Recommended columns

These are the baseline columns for the first implementation:

1. Patient
   - full name
   - email
2. Phone
3. Source
4. Since
   - patient `created_date`
5. Visits
   - appointment count
6. Last Visit
7. Lifetime Value
8. Status

### Additional recommended operator columns

These are high-value additions beyond lifetime value:

1. Last Paid Visit
   - separates engagement from just record creation
2. Days Since Last Visit
   - better operational signal than raw date alone
3. Preferred Provider
   - provider seen most often
4. Top Service
   - service booked most often
5. Paid Appointment Count
   - distinct paid appointment count
6. Visit Cadence
   - e.g. “every 45 days” derived later if useful
7. Reactivation Flag
   - e.g. “inactive > 90 days”
8. New Patient Flag
   - created recently with low visit count

### Recommended first-phase table fields

For phase 1, implement these additional backend-computed fields:

- `last_appointment_date`
- `last_paid_date`
- `days_since_last_appointment`
- `preferred_provider_name`
- `top_service_name`
- `status`

## Operational Status Definition

The table should expose a simple derived status for staff.

Proposed first-phase statuses:

- `new`
  - patient created recently and low visit count
- `active`
  - recent appointment within configurable recency window
- `inactive`
  - no recent appointments beyond recency threshold
- `never_paid`
  - appointments exist but no paid payments

Initial threshold proposal:

- `active`: last appointment within 120 days
- `inactive`: last appointment older than 120 days
- `new`: created within 30 days and <= 1 appointment

These thresholds should live in backend code as constants, not magic numbers spread through the UI.

## Filters, Search, Sorts, and Groupings

### Search

Must support:

- name
- email
- phone

UX requirement:

- debounced search
- target debounce: 250ms to 400ms

### Filters

Phase 1 filters:

- source
- operational status
- gender
- has payments / never paid
- last-visit recency bucket

Optional phase 2 filters:

- preferred provider
- top service

### Sorts

Phase 1 sorts:

- created date
- full name
- appointment count
- lifetime value
- last appointment date

Optional phase 2 sorts:

- days since last appointment
- paid appointment count

### Grouping ideas for later

- active / inactive / new
- source
- preferred provider
- top service

Grouping is not required in phase 1 if it slows delivery.

## Patient Detail Page Scope

### Patient header

Show:

- name
- email
- phone
- address
- date of birth
- gender
- source
- patient since date

### Summary cards

Show:

- total visits
- paid visits
- lifetime value
- last visit
- last paid visit
- preferred provider
- top service

### Activity sections

Phase 1 sections:

1. Overview
   - identity
   - operational summary
2. Appointment history summary
   - counts
   - latest dates
3. Services summary
   - top services
4. Provider summary
   - usual providers
5. Payments summary
   - total paid
   - latest payment

### Later possible additions

- recent appointment timeline
- payment timeline
- source-to-conversion insight
- churn / return-risk signals

## Backend API Requirements

## Existing route to extend

Current route:

- `GET /api/patients`

Current behavior is too narrow. It should be expanded rather than replaced.

### Patient listing API requirements

Route:

- `GET /api/patients`

Query parameters:

- `q`
- `source`
- `status`
- `gender`
- `has_payments`
- `sort`
- `order`
- `limit`
- `offset`

Accepted sort keys:

- `created_date`
- `full_name`
- `appointment_count`
- `lifetime_value_cents`
- `last_appointment_date`

Response shape should include:

- `total`
- `limit`
- `offset`
- `items`

Each item should include:

- `id`
- `first_name`
- `last_name`
- `full_name`
- `email`
- `phone`
- `source`
- `gender`
- `created_date`
- `appointment_count`
- `paid_appointment_count`
- `lifetime_value_cents`
- `last_appointment_date`
- `last_paid_date`
- `days_since_last_appointment`
- `preferred_provider_name`
- `top_service_name`
- `status`

### Patient detail API

Add new route:

- `GET /api/patients/{patient_id}`

Response sections:

- `patient`
- `summary`
- `top_services`
- `top_providers`
- `recent_payments`
- optional `recent_appointments` in a later phase

Initial payload fields:

#### `patient`

- `id`
- `first_name`
- `last_name`
- `full_name`
- `email`
- `phone`
- `address`
- `date_of_birth`
- `gender`
- `source`
- `created_date`

#### `summary`

- `appointment_count`
- `paid_appointment_count`
- `lifetime_value_cents`
- `last_appointment_date`
- `last_paid_date`
- `days_since_last_appointment`
- `preferred_provider_name`
- `top_service_name`
- `status`

#### `top_services`

List of:

- `service_id`
- `name`
- `count`

#### `top_providers`

List of:

- `provider_id`
- `name`
- `count`

#### `recent_payments`

List of:

- `id`
- `amount`
- `date`
- `method`
- `status`
- `service_id`
- `provider_id`

## Backend Query Design

### Design principle

Do not put heavy SQL in route handlers.

Use:

- route handlers in `app/main.py`
- service/query logic in a dedicated patient-focused service module

Recommended new service module:

- `app/services/patients.py`

Why:

- avoids turning `dashboard.py` into a catch-all
- keeps patient table and patient detail logic together
- creates a cleaner future AI-query surface

### Query notes

The listing query should use DB-side aggregation for:

- appointment count
- paid appointment count
- lifetime value
- last appointment date
- last paid date
- preferred provider
- top service

For preferred provider and top service:

- use aggregated counts over `appointment_services`
- if ties exist, use deterministic secondary ordering by name

## Frontend Requirements

## Page structure

### `frontend/app/patients/page.tsx`

Replace the static mock data implementation with:

- server or client data-fetching integration
- reusable patient table UI
- filters/search/sort/pagination state

### Add patient detail route

Create:

- `frontend/app/patients/[patientId]/page.tsx`

## Recommended reusable components

Create reusable components rather than hardcoding everything in one page file.

Suggested component set:

- `frontend/components/patients/patient-table.tsx`
- `frontend/components/patients/patient-table-toolbar.tsx`
- `frontend/components/patients/patient-status-badge.tsx`
- `frontend/components/patients/patient-row-avatar.tsx`
- `frontend/components/patients/patient-empty-state.tsx`
- `frontend/components/patients/patient-loading-state.tsx`
- `frontend/components/patients/patient-summary-cards.tsx`
- `frontend/components/patients/patient-detail-header.tsx`
- `frontend/components/patients/patient-detail-sections.tsx`

## Frontend behavior requirements

### Table UX

- debounced search
- URL-backed query params if practical
- clear active filter state
- clickable column sort toggles
- page-size aware pagination
- empty state with contextual copy
- error state with retry
- loading skeleton or loading rows

### Detail page UX

- loading state
- not found state
- error state
- back-to-list affordance

## Testing Requirements

## Backend tests

Add or expand pytest coverage for:

1. patient list filtering
2. patient list sorting
3. patient list pagination
4. patient list search
5. patient detail response shape
6. patient detail `404` behavior

Suggested files:

- `tests/test_patients_api.py`
- optional query-level tests later

## Frontend tests

Add Vitest + Testing Library coverage for:

1. patient table toolbar search behavior
2. filter interaction
3. sort interaction
4. empty state rendering
5. loading state rendering
6. patient row navigation behavior
7. patient detail summary rendering

Suggested files:

- `frontend/test/patient-table.test.tsx`
- `frontend/test/patient-toolbar.test.tsx`
- `frontend/test/patient-detail.test.tsx`

## API Client / Integration Notes

We need a frontend API utility layer instead of embedding fetch logic in each page.

Suggested files:

- `frontend/lib/api.ts`
- `frontend/lib/patients.ts`

Suggested helpers:

- `getPatients(params)`
- `getPatient(patientId)`
- shared date/currency formatting helpers

## Empty / Error / Loading Copy

### Empty state

Examples:

- “No patients match these filters.”
- “Try clearing filters or searching by phone or email.”

### Error state

Examples:

- “We couldn’t load patient records.”
- “Try again in a moment.”

### Loading state

Requirements:

- avoid spinner-only states for table content
- prefer skeleton rows and summary card placeholders

## Phased Delivery Plan

### Phase 1

- expand `/api/patients`
- add `/api/patients/{patient_id}`
- add backend tests
- replace static patients page with live patient table
- add search / filters / sorts / pagination
- add loading / error / empty states
- add patient detail page
- add frontend tests for core rendering/interaction

### Phase 2

- more operational metrics
- cohort filters
- preferred provider filter
- top service filter
- richer patient detail sections

### Phase 3

- export behavior
- URL-synced table state
- AI-facing patient query metadata layer

## Risks / Tradeoffs

### Risk: query complexity grows quickly

Mitigation:

- split patient service logic into its own module
- use explicit subqueries and readable aggregation blocks

### Risk: too many metrics make the table noisy

Mitigation:

- keep phase 1 visible columns restrained
- move secondary metrics into detail page or optional columns

### Risk: status logic becomes arbitrary

Mitigation:

- centralize status definitions and thresholds
- make them explicit in code and docs

## Recommended Phase 1 Decisions

1. Implement a live patient table first, not charts on this page
2. Add patient detail immediately after the table API is ready
3. Keep visible phase 1 columns to:
   - patient
   - phone
   - source
   - since
   - visits
   - last visit
   - lifetime value
   - status
4. Still include richer fields in the API for future use:
   - preferred provider
   - top service
   - last paid date
   - days since last appointment
5. Create a dedicated `patients` service module on the backend
6. Build reusable patient components on the frontend instead of one page-sized component

## Execution Order

1. Create patient-focused backend service module
2. Expand patient list query and route
3. Add patient detail query and route
4. Add backend tests
5. Add frontend API utilities
6. Build reusable patient table components
7. Replace static patients page with live data
8. Add patient detail page
9. Add frontend tests
10. UX polish pass for loading/error/empty states
