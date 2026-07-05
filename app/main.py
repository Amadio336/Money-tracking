from fastapi import FastAPI, HTTPException, Depends, status

from sqlalchemy.orm import Session

from typing import Annotated

import models 
from database import engine
from database import db_dependency

from schema import UserIn, ExpenseRecord, Token, UserOut, ExpenseOut

from datetime import timedelta
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.exc import IntegrityError

from sqlalchemy import func

from auth import create_access_token, hash_password, oauth2_scheme, verify_access_token, verify_password #auth è il file auth.py

from config import settings 

from auth import current_user

app = FastAPI()
models.Base.metadata.create_all(bind=engine)





# ROUTES

# users related routes
@app.post("/create_user", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserIn, db:db_dependency):
    
    db_user = models.User(
        username = user.username,
        email = user.email,
        hashed_pwd = hash_password(user.plain_text_pwd) #la funzione hash_passowrd hasha la password in chiaro
    ) 
    
    try:
        db.add(db_user)
        db.commit()
    
        return {
            "success": True,
            "password_per_ricordarsela": user.plain_text_pwd}
    except IntegrityError:
       
        db.rollback() 
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Username o Email già in uso."
        )


@app.post("/login", response_model= Token)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],db: db_dependency):
   
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    
    
    if not user or not verify_password(form_data.password, str(user.hashed_pwd)):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Username o password errati",
            headers={"WWW-Authenticate": "Bearer"}, # Header standard quando fallisce l'auth
        )
        
   
    access_token = create_access_token(data={"sub": user.username})
    
   
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/me", response_model=UserOut)
def get_me(current_user : current_user, db:db_dependency):

    #rember that current user is a sqlalchemy object containing the data of the user. The properties are the names of the column
    return current_user



@app.get("/get_all_user", response_model=list[UserOut])
def get_all_user(current_user: current_user, db:db_dependency):
    
    
        if bool(current_user.is_admin):
                all_users = db.query(models.User).all()
                return all_users
        else:
             raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail = "only admin can get all users")


# insert an expense record
@app.post("/insert_expense", response_model=ExpenseOut)
def insert_expense(record: ExpenseRecord, current_user: current_user  ,db:db_dependency):
    
    if record is None:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="error in submitting record")

    
    expense_record = models.ExpenseRecords(
        id_user = current_user.id_user,
        reason = record.reason,
        category = record.category,
        amount = record.amount,
        when = record.when
    )
    try:    
        db.add(expense_record)
        db.commit()
    
        return expense_record
    except Exception as e:
        raise e 