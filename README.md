# Nexus Agency OS

[![CI](https://github.com/Ali-jalili/NexusOS-Platform/actions/workflows/ci.yml/badge.svg)](https://github.com/Ali-jalili/NexusOS-Platform/actions/workflows/ci.yml)

A modern SaaS-based agency management platform built with React and Supabase to centralize client, project, and recruitment workflows into a unified dashboard.

---

## 🌐 Live Demo

🔗 [Nexus OS Live Dashboard](https://nexus-os-dashboard-seven.vercel.app/)

### 🔑 Demo Account Credentials

| Role                            | Email             | Password   | Access                                                  |
| :------------------------------ | :---------------- | :--------- | :------------------------------------------------------ |
| **Admin**                       | `admin@nexus.com` | `admin123` | Full dashboard: requests, projects, clients, candidates |
| **Developer** (with projects)   | `zana@nexus.com`  | `zana1234` | Read-only view of assigned projects                     |
| **Developer** (no projects yet) | `sara@nexus.com`  | `sara1234` | Read-only portal — empty state                          |

> **Note:** Developer accounts are intentionally **read-only**. A developer can view the projects assigned to them, but every status change (`pending → in_progress → completed`) is made by the Admin. This keeps the Admin as the single source of truth for project state — the same constraint is enforced on the database side by RLS (see the Security Model below).

---

## 🚀 Key Features

* **Authentication & Authorization**
  * Secure authentication powered by Supabase Auth.
  * Role-Based Access Control (RBAC) supporting Admin, Client, and Developer roles.
  * Protected routes enforced by strict role guards.
* **Client Request Management**
  * Complete lifecycle management: `Pending` → `Approved` / `Rejected`.
  * Support for rejecting requests with detailed reasons and feedback.
  * Interactive "Edit & Resubmit" workflow for rejected client requests.
* **Project & Workflow Management**
  * Project assignment and resource allocation to developers.
  * Project progress tracking and status updates.
  * Dedicated portals tailored for Admins, Clients, and Developers.
  * Developer portal is intentionally **read-only**: developers view assigned projects while the Admin owns every status transition.
* **Recruitment & Analytics**
  * Streamlined recruitment workflow for managing candidate pipelines.
  * Interactive dashboard charts and visual analytics.

---

## 🛠 Tech Stack

### Frontend
* **Core:** React, Vite, JavaScript
* **Routing & State Management:** React Router v7, TanStack React Query v5, Context API
* **UI & Animation:** Framer Motion, Recharts, React Icons, React Hot Toast, CSS Modules
* **Testing:** Vitest + Testing Library (unit tests for the auth guards)

### Backend & Database
* **Database & Auth:** Supabase, PostgreSQL, Supabase Authentication
* **Security & Logic:** Row Level Security (RLS) policies, Custom JWT Hooks, Database Triggers, Postgres RPC functions

---

## ✨ Engineering Highlights

* **Architectural Excellence:** Designed a scalable feature-based frontend architecture ensuring long-term code maintainability.
* **Data Security:** Implemented fine-grained Row Level Security (RLS) policies and database triggers for dynamic profile initialization.
* **Efficient State Management:** Managed server state with React Query (caching and automatic cache invalidation after mutations).
* **Resilience & Performance:** Applied code-splitting, lazy-loaded routes, vendor chunk splitting (no chunk exceeds the 500 kB warning), and a global `ErrorBoundary` to prevent blank-screen crashes.
* **Quality & CI:** Unit tests for the auth guards (`RoleGate`, `ProtectedRoute`) with Vitest + Testing Library, gated by a GitHub Actions workflow (lint → test → build).
* **UI/UX:** Built responsive, user-friendly layouts tailored for multi-role workflows.

---

## 🔒 Security Model

The security boundary is enforced on the database side, not on the UI:

* **Role-based RLS:** All tables (`requests`, `clients`, `developers`, `projects`, `candidates`) have Row Level Security enabled. Role-gated policies evaluate a custom JWT claim (`auth.jwt() ->> 'user_role'`) injected server-side, which clients cannot forge or tamper with.
* **Ownership policies:** Client/developer rows are only visible when `id = auth.uid()`, `client_id = auth.uid()`, or `developer_id = auth.uid()`.
* **Database triggers:** A `SECURITY DEFINER` trigger on `auth.users` auto-initializes `clients` rows for newly signed-up clients, with `search_path` locked to `''` to prevent escalation.
* **Atomic mutations:** Multi-table flows (e.g., approving a request) run through `SECURITY DEFINER` Postgres RPC functions inside a single transaction, so partial failures cannot leave inconsistent data.
* **Frontend guards:** Route/role guards in React are a UX layer only; they never replace the database-level checks.

The canonical schema, triggers, policies, and RPC functions are documented under [`nexus-os/supabase/migrations`](nexus-os/supabase/migrations) so the backend security model is verifiable from the repository.

---

## 📦 Installation & Local Setup

Follow these steps to run the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ali-jalili/NexusOS-Platform.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd NexusOS-Platform/nexus-os
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create your `.env`** (see the Environment Variables section below), then start the dev server:
   ```bash
   npm run dev
   ```

---

## 🔐 Environment Variables

Create a `.env` file in the root of the `nexus-os` folder and populate it with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 📁 Project Structure

The application lives in `nexus-os/`.

```text
nexus-os/
├── src/
│   ├── app/          # Layouts, global routes, and guard components
│   ├── components/   # Shared and reusable UI components
│   ├── context/      # React contexts (e.g., Auth Context)
│   ├── features/     # Feature-based modular architecture
│   ├── hooks/        # Custom React hooks
│   ├── services/     # API service layer and integration logic
│   ├── ui/           # Design system, basic UI elements, and ErrorBoundary
│   └── test/         # Unit tests (auth guards) and test setup
├── utils/            # Utility and helper functions (e.g., name lookups)
└── supabase/
    └── migrations/   # Canonical schema, triggers, RLS policies, and RPC functions
```

---

## 🔮 Future Enhancements

- [ ] WebSockets-based real-time notification engine.
- [ ] Direct file upload and document management system.
- [ ] Comprehensive business analytics and exporting features.
- [ ] End-to-End testing suite (Playwright) for multi-role login flows.
- [ ] Granular developer write permissions (e.g., self-updating status).

---

## 👨‍💻 Author

**Ali Jalili** — Frontend Developer

- **Portfolio:** [ali-jalili-dev.vercel.app](https://ali-jalili-dev.vercel.app/)
- **LinkedIn:** [Ali Jalili](https://www.linkedin.com/in/ali--jalili/)
- **Email:** [ali.jalili.dev@gmail.com](mailto:ali.jalili.dev@gmail.com)
