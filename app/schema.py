from pydantic import BaseModel, EmailStr
from datetime import date

class UserIn(BaseModel):
    username: str
    email: EmailStr
    plain_text_pwd: str

class UserOut(BaseModel):
    username: str
    email: EmailStr

class ExpenseRecord(BaseModel):
    reason: str
    category:str
    amount:float
    when: date

class ExpenseOut(BaseModel):
    reason: str
    category:str
    amount:float
    when: date

class Category(BaseModel):
    category_name: str


   

class Token(BaseModel):
    success:bool
    access_token:str
    token_type: str