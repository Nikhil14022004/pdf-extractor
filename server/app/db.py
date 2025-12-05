import logging
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import PyMongoError
from .config import settings

logger = logging.getLogger("uvicorn.error")

_client: AsyncIOMotorClient | None = None
db = None


def init_db():
    """
    Initialize MongoDB connection with error handling & logging.
    """
    global _client, db

    if _client is not None:
        return db  # Already initialized

    try:
        logger.info(f"Connecting to MongoDB at: {settings.MONGO_URI}")

        # Create client
        _client = AsyncIOMotorClient(settings.MONGO_URI)

        # Select database
        db = _client[settings.DB_NAME]

        # OPTIONAL: Test the connection with a ping
        # Note: Must run inside event loop later, so log only
        logger.info(f"MongoDB client created successfully for DB: {settings.DB_NAME}")

    except PyMongoError as e:
        logger.error("❌ MongoDB connection failed!", exc_info=True)
        raise RuntimeError(f"Failed to initialize MongoDB: {e}") from e

    except Exception as e:
        logger.error("❌ Unexpected error while initializing MongoDB!", exc_info=True)
        raise RuntimeError(f"Unexpected DB initialization error: {e}") from e

    return db
