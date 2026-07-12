from datetime import UTC, datetime, timedelta
import jwt
from fastapi.security import OAuth2PasswordBearer
from pwdlib import PasswordHash

from config import settings 

password_hash = PasswordHash.recommended() 

from typing import Annotated 
from fastapi import Depends, HTTPException, status 

import models
from main import db_dependency

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login") 


def hash_password(password:str)->str:
    return password_hash.hash(password)

def verify_password(plain_password:str, hashed_password: str) -> bool: 
    """ it take the plain_password and compares it to the hashed version stored in the db """
    return password_hash.verify(plain_password, hashed_password)


# creiamo la funzione che genera il token di accesso, ossia il jwt token
def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """ it takes a dict and returns the jwt """
    to_encode = data.copy()
    

    if expires_delta:
        expire = datetime.now(UTC) + expires_delta
    else:
       
        expire = datetime.now(UTC) + timedelta(minutes=settings.access_token_expire_minutes)
    

    to_encode.update({"exp": expire})
    
    # 4. Generiamo e firmiamo il token JWT
    encoded_jwt = jwt.encode(
        to_encode, 
        settings.secret_key.get_secret_value(), 
        algorithm=settings.algorithm
    )
    
    return encoded_jwt

def verify_access_token(token: str) -> str | None:
    """ it takes the jwt and returns the payload """
    try:
        payload = jwt.decode(
            token, 
            settings.secret_key.get_secret_value(),
            algorithms=[settings.algorithm],
            options={"require":["exp", "sub"]}
        )
    except jwt.InvalidTokenError:
        return None
    else:
        return payload.get("sub")
    

def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: db_dependency) -> models.User:
    username_from_jwt = verify_access_token(token)
    
    if username_from_jwt is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail= "token non valido o scaduto")
    
    # dentro username_from_jwt abbiamo lo usernamente recuperato dal token, cerchiamo tale utente nel db
    user_retrieved = db.query(models.User).filter(models.User.username == username_from_jwt).first()
    
    if user_retrieved is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail= "token non valido o scaduto")
    
    return user_retrieved


current_user = Annotated[models.User, Depends(get_current_user)]
