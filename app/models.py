from sqlalchemy import Column, Boolean, Integer,String,Date, ForeignKey, Float
from database import Base # nota che database è il file database.py creato da te


class User(Base):
    __tablename__ = "users"
    
    id_user = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique = True, nullable=False)
    email = Column(String(50), unique=True, nullable=False)
    hashed_pwd = Column(String(255), nullable=False)
    is_admin = Column(Boolean, default=False)

class ExpenseRecords(Base):
    __tablename__ = "expenses"

    id_expense = Column(Integer, primary_key=True, index=True, unique=True)
    id_user = Column(Integer, ForeignKey("users.id_user"), nullable=False)
    reason = Column(String(255), nullable=False)
    category = Column(String(50), nullable=False)
    amount = Column(Float, nullable=False)
    when = Column(Date, nullable=False)

class DefaultCategoriesPerUser(Base):
    __tablename__ = "default_categories_per_user"
    
    id_category = Column(Integer, primary_key=True, index=True, unique=True)
    category_name = Column(String(255), nullable=False, unique=True)
    id_user = Column(Integer, ForeignKey("users.id_user"), nullable=False)
    