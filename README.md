<div align="center">

# 🔗 ShortX

### Production-Ready URL Shortener API

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Drizzle](https://img.shields.io/badge/Drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)

[![Live Server](https://img.shields.io/badge/Live_Server-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://shortx-1l2d.onrender.com/)
[![API Docs](https://img.shields.io/badge/API_Docs-Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)]([YOUR_POSTMAN_LINK_HERE](https://documenter.getpostman.com/view/35966589/2sBXVig9wv))

**A robust, containerized backend service for URL shortening with analytics tracking and user management**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Documentation](#-api-endpoints) • [Architecture](#%EF%B8%8F-architecture)

</div>

---

## 📖 Overview

ShortX is a modern, production-ready URL shortener built with enterprise-grade standards. It combines powerful features like collision-resistant short code generation, real-time analytics, and secure user authentication—all wrapped in a fully containerized, type-safe architecture.

### 🎯 Why ShortX?

- ✅ **Type-Safe**: End-to-end type validation from API requests to database queries
- ✅ **Production-Ready**: Dockerized with multi-stage builds for optimized deployment
- ✅ **Scalable**: Built with layered architecture following industry best practices
- ✅ **Secure**: JWT authentication with bcrypt password hashing
- ✅ **Analytics-Enabled**: Atomic click tracking using SQL transactions

---

## ✨ Features

### 🔐 Authentication & Security
- Secure user registration and login system
- JWT-based authentication with Bearer tokens
- Password hashing using bcrypt
- Protected routes with middleware authentication

### 🔗 URL Management
- **Smart Short Code Generation**: Collision-resistant 6-character codes using NanoID
- **Custom Aliases**: Create vanity URLs for branding (e.g., `/my-resume`, `/portfolio`)
- **Bulk Operations**: Retrieve all URLs created by authenticated users
- **Instant Redirection**: Fast lookup and redirect to original URLs

### 📊 Analytics & Tracking
- **Atomic Click Counting**: Accurate analytics using SQL transactions
- **Detailed Statistics**: View click counts for each short link
- **User Dashboard**: Track all your created links in one place

### 🐳 DevOps & Infrastructure
- **Fully Dockerized**: One-command deployment with Docker Compose
- **Multi-Stage Builds**: Optimized production images with minimal footprint
- **Environment Configuration**: Easy setup with `.env` file support
- **Database Migrations**: Schema management with Drizzle ORM

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js v20 |
| **Framework** | Express.js |
| **Language** | TypeScript |
| **Database** | PostgreSQL |
| **ORM** | Drizzle ORM |
| **Authentication** | JWT + Bcrypt |
| **Validation** | Zod |
| **Containerization** | Docker & Docker Compose |
| **Deployment** | Render |

---

## 🏗️ Architecture

ShortX follows a **layered architecture** pattern (Controller-Service-Repository) for clean separation of concerns and maintainability.
```mermaid
graph TD
    %% Nodes
    Client[👤 User / Client]
    LB[⚖️ Load Balancer<br/>Render]
    
    subgraph App["🐳 Docker Container · Application"]
        API[🚀 Node.js API Server]
        Auth[🔐 Auth Middleware]
        UrlCtrl[🔗 URL Controller]
    end
    DB[(🗄️ PostgreSQL Database)]
    
    %% Flow
    Client -->|HTTPS Request| LB
    LB --> API
    API --> Auth
    Auth -->|✓ Verified| UrlCtrl
    UrlCtrl -->|Drizzle ORM| DB
    DB -->|Query Results| UrlCtrl
    UrlCtrl -->|JSON Response| LB
    LB -->|Response| Client
    
    %% Styling
    classDef edge fill:#eef2ff,stroke:#4338ca,stroke-width:2px,color:#1e1b4b;
    classDef app fill:#f8fafc,stroke:#334155,stroke-width:2px,color:#0f172a;
    classDef db fill:#ecfeff,stroke:#0f766e,stroke-width:2px,color:#042f2e;
    classDef user fill:#fff7ed,stroke:#c2410c,stroke-width:2px,color:#431407;
    
    class Client user;
    class LB edge;
    class API,Auth,UrlCtrl app;
    class DB db;
```

### 🎨 Design Patterns
- **Controller-Service-Repository**: Clear separation of business logic, data access, and routing
- **Multi-Stage Docker Build**: 
  - **Builder Stage**: Installs dev dependencies and compiles TypeScript → JavaScript
  - **Runner Stage**: Uses only production dependencies with optimized JS build

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/get-started) & [Docker Compose](https://docs.docker.com/compose/)
- [Node.js v20+](https://nodejs.org/) *(Optional for local development)*
- [pnpm](https://pnpm.io/) *(Optional for local development)*

### 🐳 Option A: Run with Docker (Recommended)

**Perfect for quick deployment and production-like environment**

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/shortx.git
   cd shortx
```

2. **Configure environment variables**
```bash
   cp .env.sample .env
   # Edit .env with your configuration
```

3. **Start the application**
```bash
   docker-compose up --build
```

4. **Access the API**
```
   🚀 API Server: http://localhost:8000
```

### 💻 Option B: Local Development

**Ideal for active development and debugging**

1. **Clone and install dependencies**
```bash
   git clone https://github.com/yourusername/shortx.git
   cd shortx
   pnpm install
```

2. **Set up environment**
```bash
   cp .env.sample .env
   # Configure your local PostgreSQL database credentials
```

3. **Initialize database**
```bash
   pnpm db:push
```

4. **Start development server**
```bash
   npm run dev
```

5. **API is ready!**
```
   🚀 Development Server: http://localhost:8000
```

---

## 🔌 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/v1/user/signup` | Register a new user account | ❌ |
| `POST` | `/api/v1/user/signin` | Login and receive JWT Bearer token | ❌ |

**Example Request (Signup):**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

### 🔗 URL Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/v1/url/shorten` | Create a new short link | ✅ |
| `GET` | `/api/v1/url/my-urls` | List all URLs created by user | ✅ |
| `GET` | `/api/v1/url/stats/:shortCode` | Get analytics for specific link | ✅ |

**Example Request (Shorten URL):**
```json
{
  "originalUrl": "https://example.com/very-long-url",
  "customAlias": "my-link"  // Optional
}
```

### 🌐 Redirection

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/:shortCode` | Redirect to original URL & track click | ❌ |

**Example Usage:**
```
https://shortx-api.onrender.com/abc123 → Redirects to original URL
```

---

## 📚 Environment Variables

Create a `.env` file in the root directory:
```env
# Server Configuration
PORT=8000
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/shortx

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# Optional: CORS Configuration
CORS_ORIGIN=*
```

---

## 🧪 Development Scripts
```bash
# Install dependencies
pnpm install

# Run development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Push database schema
pnpm db:push

# Generate Drizzle migrations
pnpm db:generate
```

---

## 📁 Project Structure
```
shortx/
├── src/
│   ├── controllers/       # Request handlers
│   ├── middlewares/       # Auth & validation
│   ├── routes/            # API routes
│   ├── db/                # Database config & schema
│   └── utils/             # Helper functions
│   └── app.ts             # Routing everything together
│   └── index.ts           # entry point
├── Dockerfile             # Multi-stage build
├── docker-compose.yml     # Service orchestration
├── drizzle.config.ts      # ORM configuration
└── tsconfig.json          # TypeScript config
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Raj Tejaswee**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rajtejaswee)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/raj-tejaswee-147603247/)

---


<div align="center">

Made with ❤️ and TypeScript

</div>
