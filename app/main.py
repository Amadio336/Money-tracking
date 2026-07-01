from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel 
from typing import Annotated
#import models  TODO: models da creare 
from database import engine, SessionLocal # anche questo è importazione di funzioni di database.py
from sqlalchemy.orm import Session

app = FastAPI()
#models.Base.metadata.create_all(bind=engine) TODO


def get_db():
    db = SessionLocal() # Apre la connessione
    try:
        yield db        # "Cede" temporaneamente la connessione all'endpoint
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]



# Modelli pydantic