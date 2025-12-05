# app/config.py
# Compatible with both pydantic v1 and v2+ (pydantic-settings)
from typing import Any
from pydantic import Field

# Try to import BaseSettings from pydantic (v1). If that fails (v2), import from pydantic-settings.
try:
    # In pydantic v1 this succeeds. In v2 it raises a PydanticImportError.
    from pydantic import BaseSettings  # type: ignore
except Exception:
    # pydantic v2 users should install pydantic-settings
    from pydantic_settings import BaseSettings  # type: ignore

class Settings(BaseSettings):
    MONGO_URI: str = "mongodb+srv://gandhisuman10_db_user:uWCApYtkMtbN39ap@cluster0.pbqhanv.mongodb.net/?appName=Cluster0"
    DB_NAME: str = "pdf_extractor"
    UPLOAD_DIR: str = "./data/uploads"
    MAX_UPLOAD_SIZE: int = 20 * 1024 * 1024  # 20 MB

    class Config:
        env_file = ".env"

settings = Settings()
