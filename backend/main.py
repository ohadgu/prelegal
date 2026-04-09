from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from database import init_db

OUT_DIR = Path(__file__).parent / "out"


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(lifespan=lifespan)


@app.get("/api/health")
def health():
    return {"status": "ok"}


# Serve Next.js static assets (_next/static/*)
app.mount("/_next", StaticFiles(directory=OUT_DIR / "_next"), name="nextjs-assets")


@app.get("/{full_path:path}")
async def serve_frontend(full_path: str = ""):
    if not full_path:
        return FileResponse(OUT_DIR / "index.html")
    # Try exact file match (e.g. favicon.ico, *.txt)
    exact = OUT_DIR / full_path
    if exact.is_file():
        return FileResponse(exact)
    # Try directory index (e.g. /login -> login/index.html)
    idx = OUT_DIR / full_path / "index.html"
    if idx.is_file():
        return FileResponse(idx)
    # SPA fallback
    return FileResponse(OUT_DIR / "index.html")
