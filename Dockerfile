# Stage 1: Build Next.js frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: FastAPI backend
FROM python:3.12-slim
WORKDIR /app

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Install Python dependencies
COPY backend/pyproject.toml ./
RUN uv pip install fastapi "uvicorn[standard]" --system --no-cache

# Copy backend source and frontend static build
COPY backend/ ./
COPY --from=frontend-builder /app/frontend/out ./out

# Data directory for SQLite (mounted as volume in docker-compose)
RUN mkdir -p /app/data

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
