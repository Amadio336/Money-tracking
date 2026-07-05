from fastapi import FastAPI, HTTPException, Depends, status

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base

from typing import Annotated

import os
from dotenv import load_dotenv

load_dotenv()

URL_DATABASE = os.getenv("URL_DATABASE")

engine = create_engine(URL_DATABASE)
SessionLocal = sessionmaker(autoflush=False, autocommit = False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal() # Apre la connessione
    try:
        yield db        # "Cede" temporaneamente la connessione all'endpoint
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]