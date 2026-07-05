# Specs

* [Goal of the project](#goal-of-the-project)



## Goal of the project
This project aims to deliver the most minimal possible money tracking app. 

## Basic functionalities and workflow
This money tracking app (from now simply "app") has to track **only the expenses** in the smoothiest way. The workflow designed for the app is the following (**see also sketch.svg**).

The app will show three possibilities:
1. normal insertion: it requires to specify the amount of money spent, the reason, the category the expense belong to and the timestamp (it'll be taken automatically)
2. quick insertion: it presents to the users only few buttons of pre-set type of expenditures and the user can quickly click on some of these and insert quickly a record 
3. controll pannel: it requires authentication and will provide the user with some statistical tools in order to analyse the expenses


## Backend
**Python** is the language chosen for the backend of this application, specifically the APIs will be managed by **FastApi framework** and the app is backed by a sql-type database (**Mariadb**)


The app first will ask to log in or sign in, this is in case someone else wants to use it. **Note that the registration doesn't create new tables**, the tables for the record is unique, the record is semply associated with the correspondent user

The database structure is simple:
- table 1: table "users" to keep track of the users 
---------------------------------------------
|**Columns**: id (pk), name, email, password    |
--------------------------------------------- 
        
- table 2: table "expenses"
---------------------------------------------------------------------------------
|**Columns**: id_expense, user_id_associated, reason, category, amount, date    |
---------------------------------------------------------------------------------
        
