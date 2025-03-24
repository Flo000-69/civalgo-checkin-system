# Worker Check-In System

### Description
A full-stack web application that allows workers to check in/out of construction sites and gives supervisors real-time visibility of who is currently on-site — built with Shape Up methodology in mind.

---

## Project Structure

```
/backend            - REST API built with Express.js
/frontend           - React (or Next.js) frontend for workers & supervisors
/database           - SQL schema + initialization files for PostgreSQL
docker-compose.yml  - Orchestrates the full stack with one command
.env                - Environment variable to store general data
```

---

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine

---

## Running the Project

To start **backend + frontend + database** all at once:

```bash
docker compose --env-file .env up
```

Then open the frontend at:
```
http://localhost:3000
```

Backend runs at:
```
http://localhost:4000
```

---

## Features

- Worker check-in/check-out
- Supervisor dashboard with live updates and historical event filtering (name, site ID, date range)
- Debounced filtering in frontend
- Dockerized PostgreSQL database with init script
- Clean RESTful API (lightweight)

---

## API Endpoints (REST)

| Method | Route         | Description                          |
|--------|---------------|--------------------------------------|
| POST   | `/check-in`   | Check in a worker                    |
| POST   | `/check-out`  | Check out a worker                   |
| GET    | `/on-site`    | Get currently on-site workers        |
| GET    | `/history`    | Get full history with filters        |

---

## Tech Stack

- **Frontend:** React
- **Backend:** Express.js
- **Database:** PostgreSQL
- **Infrastructure:** Docker + Docker Compose

---

## Database Initialization

The database is initialized using the SQL file at:

```
/database/init.sql
```

This creates the `check_events` table automatically when the container starts for the first time.

---

## Future Improvements

- Integrate Authentication
- Basic role-based auth (worker vs supervisor)
- GraphQL (Apollo Server) when project will be more complex requests 
    * Complex relationships or nested data
    * Dynamic filtering/sorting/pagination
    * Multiple frontend consumers (e.g., web + mobile app)
    * Real-time dashboard updates
- Errors handling, and error pages
- Validation functionality (e.g. check-in before check-out)
