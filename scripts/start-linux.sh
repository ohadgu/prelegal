#!/bin/bash
set -e
echo "Building and starting PreLegal..."
docker compose up -d --build
echo "PreLegal is running at http://localhost:8000"
