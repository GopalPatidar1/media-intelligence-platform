# Nuxt Monorepo Application

This project is a **monorepo-based application** built with **Nuxt 3 framework**, integrated with:

* Object storage using **MinIO**
* Message queue using **RabbitMQ**
* Containerized using **Docker**

---

## Features

* Modern frontend with Nuxt 3
* File upload & storage using MinIO
* Background processing via RabbitMQ
* Global error handling & toast notifications
* Confirmation modal for user actions
* Scalable monorepo structure

---

## Project Structure

```id="o84jmw"
.
├── apps/
│   └── nuxt-app/        # Nuxt frontend application
├── docker-compose.yml   # Multi-service setup
└── README.md
```

---

## Services Overview

### 1. Frontend (Nuxt App)

* Runs on: `http://localhost:3000`
* Hot reload enabled
* Uses volume mounting for development

---

### 2. MinIO (Object Storage)

* API: `http://localhost:9000`
* Console UI: `http://localhost:9001`

Used for:

* File uploads
* Media storage

---

### 3. RabbitMQ (Message Queue)

* AMQP: `localhost:5672`
* Dashboard: `http://localhost:15672`

Used for:

* Background jobs
* Async processing

---

## Environment Variables

Create a `.env` file in root:

```id="dw4h8q"
MINIO_ROOT_USER=admin
MINIO_ROOT_PASSWORD=password

RABBITMQ_USER=admin
RABBITMQ_PASS=password
```

---

## Getting Started

### 1. Clone the repository

```bash id="4n3y7g"
git clone <your-repo-url>
cd <project-folder>
```

---

### 2. Start all services

```bash id="o9h9v7"
docker-compose up --build
```

---

### 3. Access applications

| Service       | URL                                              |
| ------------- | ------------------------------------------------ |
| Nuxt App      | [http://localhost:3000](http://localhost:3000)   |
| MinIO Console | [http://localhost:9001](http://localhost:9001)   |
| RabbitMQ UI   | [http://localhost:15672](http://localhost:15672) |

---

## Development Notes

* Frontend runs in **development mode inside Docker**
* Uses:

```id="w9nq38"
npm run dev -- --host 0.0.0.0
```

* File changes reflect instantly due to volume mounting

---

## Architecture Overview

```id="nhzklx"
User → Nuxt App → API → RabbitMQ → Worker → MinIO
```

---

## ⚡ Key Implementations

* Global error handling (UI + API)
* Toast notification system
* Reusable confirmation modal
* API response standardization
* Upcoming: caching improvements

---

## Future Improvements

* API response caching
* State management using Pinia or built-in composables
* Background worker service for RabbitMQ
* Logging & monitoring

---

## Troubleshooting

### Port already in use

```bash id="r1ex4l"
sudo lsof -i :3000
```

---

### Rebuild containers

```bash id="1b7j5k"
docker-compose down -v
docker-compose up --build
```

---

## 📌 Notes

* This project currently includes an **MVP implementation**
* Ongoing work focuses on performance and scalability improvements

---

## 📄 License

This project is for assignment/demo purposes.
