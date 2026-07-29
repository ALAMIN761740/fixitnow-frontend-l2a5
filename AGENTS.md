# AGENTS.md

# ============================================================

# PROJECT

# ============================================================

Project Name: FixItNow Frontend
Assignment: Level 2 - Assignment 5
Framework: Next.js 16 (App Router)
Language: TypeScript
Objective: Build a complete production-quality frontend for the existing FixItNow Backend.

This project is NOT backend development.

Do NOT create backend logic.

Consume the existing backend APIs only.

Always write clean, reusable, scalable, production-ready code.

Never generate placeholder implementations if the backend endpoint already exists.

# ============================================================

# BACKEND INFORMATION

# ============================================================

Backend Repository

<https://github.com/ALAMIN761740/fixitnow-backend-L2A4>

Live Backend

<https://fixitnow-backend-l2a4-1.onrender.com>

API Base URL

<https://fixitnow-backend-l2a4-1.onrender.com/api>

Environment Variable

NEXT_PUBLIC_API_URL=<https://fixitnow-backend-l2a4-1.onrender.com/api>

# ============================================================

# ADMIN LOGIN

# ============================================================

Email

<admin@fixitnow.com>

Password

admin123

# ============================================================

# TECH STACK

# ============================================================

Use only

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Axios
- TanStack Query
- React Hook Form
- Zod
- Sonner
- Lucide React
- next/image
- next/font

Do NOT use

- JavaScript
- Redux
- Context for server state
- Fake APIs
- Mock data (unless explicitly requested)

# ============================================================

# PROJECT STRUCTURE

# ============================================================

Use this folder structure.

src/

app/

components/

common/

layout/

ui/

providers/

services/

hooks/

lib/

utils/

constants/

types/

assets/

# ============================================================

# REQUIRED ROUTES

# ============================================================

/

/services

/technicians/[id]

/auth/login

/auth/register

/dashboard/customer

/dashboard/customer/bookings

/dashboard/customer/payments

/dashboard/technician

/dashboard/technician/bookings

/dashboard/admin

/dashboard/admin/categories

/payment/success

/payment/cancel

Create loading.tsx

Create error.tsx

Create not-found.tsx

# ============================================================

# USER ROLES

# ============================================================

CUSTOMER

Can

Browse Services

View Technicians

Book Service

Cancel Booking

Pay Booking

View Booking History

View Payment History

Leave Review

TECHNICIAN

Can

Create Technician Profile

Update Technician Profile

Manage Services

Accept Booking

Reject Booking

Start Job

Complete Job

Manage Availability UI

ADMIN

Can

Manage Users

Ban Users

Unban Users

Manage Categories

View Bookings

View Dashboard Statistics

# ============================================================

# API ENDPOINTS

# ============================================================

Authentication

POST /auth/register

POST /auth/login

GET /auth/me

Categories

GET /categories

POST /categories

Services

GET /services

POST /services

Technicians

GET /technicians

GET /technicians/:id

POST /technicians/profile

Bookings

POST /bookings

GET /bookings

PATCH /bookings/:id

Payments

POST /payments/create

POST /payments/confirm

GET /payments

Reviews

POST /reviews

Admin

GET /admin/users

PATCH /admin/users/:id

GET /admin/bookings

# ============================================================

# AUTHENTICATION

# ============================================================

Backend returns JWT.

Store JWT securely.

Attach token using

Authorization

Bearer <token>

Protect routes using

Next.js Middleware

Redirect

Guest

→ Login

Unauthorized

→ Access Denied

Never expose protected pages without authentication.

# ============================================================

# REACT QUERY

# ============================================================

Use TanStack Query.

Every GET request must use useQuery.

Every POST/PATCH request must use useMutation.

Invalidate related queries after mutation.

Handle

Loading

Error

Success

Do not use useEffect for fetching unless absolutely necessary.

# ============================================================

# AXIOS

# ============================================================

Create only ONE reusable axios instance.

Read base URL from

NEXT_PUBLIC_API_URL

Automatically attach JWT token.

Handle

401

403

404

500

Network Error

inside interceptors.

# ============================================================

# FORM VALIDATION

# ============================================================

Every form must use

React Hook Form

and

Zod

Display inline validation.

Display backend validation message.

Never submit invalid form.

# ============================================================

# REQUIRED PUBLIC PAGES

# ============================================================

Home

Services

Technician Details

Search

Filter

Category Filter

Rating Filter

Price Filter

Responsive Cards

Use next/image everywhere.

# ============================================================

# CUSTOMER FEATURES

# ============================================================

Customer Dashboard

Booking History

Booking Status

Cancel Booking

Payment History

Review Form

Payment Button

Payment Success Page

Payment Cancel Page

Status Badges

REQUESTED

ACCEPTED

DECLINED

PAID

IN_PROGRESS

COMPLETED

CANCELLED

Show proper badge colors.

Only show actions allowed for current status.

# ============================================================

# TECHNICIAN FEATURES

# ============================================================

Dashboard

Upcoming Jobs

Pending Requests

Profile Management

Service Management

Availability UI

Booking Table

Accept

Decline

Start Job

Complete Job

Update booking instantly.

# ============================================================

# ADMIN FEATURES

# ============================================================

Dashboard

Statistics Cards

User Table

Booking Table

Category Management

Search

Pagination

Ban User

Unban User

Responsive Tables

# ============================================================

# BOOKING FLOW

# ============================================================

Register

↓

Login

↓

Browse Services

↓

Technician Details

↓

Select Time Slot

↓

Create Booking

↓

Technician Accept

↓

Customer Pay

↓

Payment Success

↓

Booking In Progress

↓

Completed

↓

Leave Review

# ============================================================

# PAYMENT

# ============================================================

Use backend payment APIs.

Do NOT implement backend payment logic.

Create

/payment/success

/payment/cancel

Handle loading.

Handle errors.

Show success toast.

# ============================================================

# UI REQUIREMENTS

# ============================================================

Modern SaaS UI

Responsive

Clean

Accessible

Rounded Cards

Soft Shadows

Consistent Spacing

Professional Typography

Hover Effects

Loading Skeleton

Error State

Empty State

Toast Notifications

Responsive Sidebar

Responsive Navbar

# ============================================================

# COMPONENT RULES

# ============================================================

Create reusable components.

Avoid duplicate UI.

Keep components small.

Separate UI from business logic.

Use Server Components whenever possible.

Use Client Components only when required.

# ============================================================

# TYPESCRIPT

# ============================================================

Use strict TypeScript.

Never use any.

Create interfaces inside types.

Use proper enums where appropriate.

# ============================================================

# PERFORMANCE

# ============================================================

Use next/image.

Lazy load where appropriate.

Avoid unnecessary re-renders.

Use Suspense when appropriate.

Optimize bundle size.

# ============================================================

# ACCESSIBILITY

# ============================================================

Proper Labels

Keyboard Navigation

Alt Text

ARIA attributes where necessary.

# ============================================================

# ERROR HANDLING

# ============================================================

Every page must handle

Loading

Empty

Error

Success

Never leave blank screens.

# ============================================================

# GIT COMMIT CONVENTION

# ============================================================

Use meaningful commits.

Examples

chore: initialize frontend project

feat: add authentication pages

feat: implement customer dashboard

feat: implement technician dashboard

feat: implement admin dashboard

feat: integrate payment flow

refactor: optimize reusable components

fix: resolve booking status update issue

style: improve responsive layout

# ============================================================

# AI DEVELOPMENT RULES

# ============================================================

Always follow Next.js 16 App Router best practices.

Always use TypeScript.

Always use Tailwind CSS.

Always consume the provided backend API.

Never invent new API endpoints.

Never create mock APIs if an existing backend endpoint is available.

Never duplicate components.

Always search for an existing reusable component before creating a new one.

Always keep API logic inside services.

Always use React Query for server state.

Always validate forms with React Hook Form + Zod.

Always use reusable layouts.

Always write scalable code.

Always optimise for mobile, tablet and desktop.

Always produce production-quality code.

If an endpoint is missing, ask before creating a workaround.

The goal is to complete Assignment 5 using the provided backend while following professional frontend architecture and meeting all assignment requirements.
