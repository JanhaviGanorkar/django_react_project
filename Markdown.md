# Workspace Tasks - Full-Stack Task Management System

A modern, production-ready Full-Stack Task Management Web Application built using a decoupled architecture. The project implements a secure RESTful API backend paired with a highly responsive, state-managed single-page application (SPA) frontend.

---

## 🚀 Architecture & Tech Stack

The application separates concerns cleanly by isolating the backend business logic from the frontend presentation layer:

### **Backend Layer**
*   **Framework:** Django 5.x / Python
*   **API Architecture:** Django REST Framework (DRF)
*   **Database:** SQLite3 (Development-ready relational schema)
*   **CORS Management:** `django-cors-headers` for secure cross-origin resource sharing.

### **Frontend Layer**
*   **Environment:** React 18 / Vite (Lightning-fast build tool)
*   **State Management:** Zustand (Lightweight, centralized global state management)
*   **Styling:** Tailwind CSS v4 (Utility-first atomic styling architecture)
*   **UI Components:** Radix UI primitives with custom theme layouts
*   **Icons:** Lucide React

---

## ✨ Core Features

*   **Asynchronous CRUD Operations:** Full integration with backend REST endpoints for creating, reading, updating, and deleting tasks smoothly without page reloads.
*   **Centralized State Store:** Utilizing Zustand to decouple component logic from network mutations, allowing predictable state updates.
*   **Dynamic Analytics Metrics:** Real-time data aggregation to display total, completed, and pending tasks instantly.
*   **Contextual Priority Matrices:** Categorized sorting badges mapping tasks to High, Medium, or Low priority states.
*   **Inline Validation Guardrails:** UX-friendly real-time error captures instead of native browser blocks.
*   **Optimized Empty States:** Smooth micro-interaction animations (`animate-pulse`) handling clean visual states when data arrays are empty.

---

## 🛠️ Installation & Setup

### 1. Backend Setup (Django)

Navigate to your backend directory and follow these steps:

```bash
# Create and activate a virtual environment

python -m venv venv

source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install required dependencies

pip install django djangorestframework django-cors-headers

# Initialize database schemas and run migrations

python manage.py makemigrations

python manage.py migrate

# Start the development server

python manage.py runserver

2. Frontend Setup (React + Vite)Navigate to your frontend directory and follow these steps:Bash# Install node packages defined in package.json
npm install

# Run the local development server

npm run dev

Open your browser and navigate to the local server URL provided by Vite.📂 System File Map (Core Architecture)Plaintext├── backend/
│   ├── backend/               # Main project configuration settings
│   │   ├── settings.py        # Configured with REST framework & CORS middleware
│   │   └── urls.py            # Base routing gateway mapping paths
│   └── todo/                  # Core Business Application
│       ├── models.py          # Data definitions (Title, Description, Priority, Completion)
│       ├── serializers.py     # Data serialization/deserialization layers for JSON conversion
│       └── views.py           # ModelViewSet executing complete CRUD controller actions
│
└── todo_frontend/
    ├── src/
    │   ├── store/
    │   │   └── todoStore.js   # Centralized Zustand global API state machine
    │   ├── components/
    │   │   └── AllTodos.jsx   # Primary view layout managing presentation layers
    │   └── App.jsx            # Application root injector
    ├── index.html             # Base shell utilizing custom SVG Favicon graphics
    └── package.json           # Defined build scripts and system dependency trees


🛡️ API Endpoints DocumentedHTTP MethodEndpointActionRequest PayloadGET/todo/Fetch all current tasks from dbNonePOST/todo/Create a new task record{ title, description, priority }PUT/todo/:id/Complete edit/toggle execution{ title, description, priority, is_completed }DELETE/todo/:id/Remove task safely from diskNone


