# Nexus Agency OS

A modern SaaS-based agency management platform built with React and Supabase to centralize client, project, and recruitment workflows into a unified dashboard.

---

## 🌐 Live Demo

🔗 [Nexus OS Live Dashboard](https://nexus-os-dashboard-seven.vercel.app/)

### 🔑 Demo Account Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@nexus.com` | `admin123` |
| **Developer** | `sara@nexus.com` | `sara1234` |

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
  * Real-time project progress tracking.
  * Dedicated portals tailored for Admins, Clients, and Developers.
* **Recruitment & Analytics**
  * Streamlined recruitment workflow for managing candidate pipelines.
  * Interactive dashboard charts and visual analytics.
  * Real-time notifications and status updates.

---

## 🛠 Tech Stack

### Frontend
* **Core:** React, Vite, JavaScript
* **Routing & State Management:** React Router v6, TanStack React Query v5, Context API,
* **UI & Animation:** Framer Motion, Recharts, React Icons, React Hot Toast, CSS Modules

### Backend & Database
* **Database & Auth:** Supabase, PostgreSQL, Supabase Authentication
* **Security & Logic:** Row Level Security (RLS) policies, Custom JWT Hooks, Database Triggers

---

## ✨ Engineering Highlights

* **Architectural Excellence:** Designed a scalable feature-based frontend architecture ensuring long-term code maintainability.
* **Data Security:** Implemented fine-grained Row Level Security (RLS) policies and database triggers for dynamic profile initialization.
* **Efficient State Management:** Managed server state seamlessly with React Query (caching, optimistic updates, and automatic cache invalidation).
* **Performance:** Applied code-splitting and dynamic imports to optimize bundle size and overall response time.
* **UI/UX:** Built responsive, user-friendly layouts tailored for multi-role workflows.

---

## 📦 Installation & Local Setup

Follow these steps to run the project locally:

1. **Clone the repository:**
   ```bash
   git clone git@github.com:Ali-jalili/NexusOS-Platform.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd Nexus-Os-Dashboard/nexus-os
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
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

```text
src/
├── app/          # Layouts, global routes, and guard components
├── components/   # Shared and reusable UI components
├── context/      # React contexts (e.g., Auth Context)
├── features/     # Feature-based modular architecture
├── hooks/        # Custom React hooks
├── services/     # API service layer and integration logic
├── ui/           # Design system and basic UI elements
└── utils/        # Utility and helper functions
```

---

## 🔮 Future Enhancements

- [ ] WebSockets-based real-time notification engine.
- [ ] Direct file upload and document management system.
- [ ] Comprehensive business analytics and exporting features.
- [ ] End-to-End (E2E) and Unit testing suite implementation.
- [ ] Granular developer editing permissions.

---

## 👨‍💻 Author

**Ali Jalili**

* 🐙 **GitHub:** [@Ali-jalili](https://github.com/Ali-jalili)
  
