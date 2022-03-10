
# Project Title
SBE Website

# Table of contents
- [Project Description](#project-description)
- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Features](#features)
- [Future Work](#future-work)
- [Features](#features)
- [Authors](#authors)
- [User Interface](#user-interface)
- [Demo](#demo)

## Project Description
SBE is a website for systems and biomedical engineering at Cairo University. It's an ITI graduation project, a 3-months intensive training program, Full-stack Development using Python Track.

## Project Overview
The proposed website was made for the sbe department. It will be used by the department staff and employees with all their roles. Also, by the student that will interact with the department.

## Getting Started
### Steps
1. Clone This Project (Make Sure You Have Git Installed):

  `git clone https://github.com/OmarAbdelzaher/SBE-WEBSITE-ITI-GP`

2. Open mysql or any database manager you want ex: postgres, sqlite (Django Default) and create your own database

3. Set the database type in `settings.py` to mysql and set the database name
    - In case you logged in mysql as root, you don't have to specify your username and password to the database in `settings.py`
    - In case you logged in as a user, you have to specify your username and password to the database

4. Set Database (Make Sure you are in directory same as manage.py):

  `python manage.py makemigrations`

  `python manage.py migrate`

5. Create SuperUser to access admin page:

  `python manage.py createsuperuser`

6. Run the server:

  `python manage.py runserver`
  
 9. Enter the front-end directory  :

  `cd sbe-website-frontend`

8. Install React dependencies  :

  `npm install`
  
9. Run React app  :

  `npm start`
  
  
10. Build React app  :

  `npm run build`


### Installation

#### In Django
` pip install djangorestframework`

` pip install djoser`

` pip install django-cors-headers`

`  pip install django-braces`

#### In React
` npm install react-bootstrap bootstrap@5.1.3`

` npm install react-scroll`

` npm install react-daytime --save --force`

## Features


## Future Work
 Deployment of the project

## Authors
- ITI Students & Teammates, we are a Full Stack Web Development students at ITI - Python Back-end Track

Name | Email
------------ | -------------
Nourhan Ibraheem | nouraibraheem82@gmail.com
Samiha Hesham | samihahesham9@gmail.com
Saeed Adel | sashsadel7@gmail.com
Omar Abdelzaher | omarzaher787@gmail.com
Zeina Ayman | zeinaayman14@gmail.com


## User Interface
 #### Home Page
 #### Registration and Login
 #### Reset Password
 #### Profile Page
#### Graduate and Undergraduate Admission
#### Graduate and Undergraduate News
#### Graduate and Undergraduate Events
#### Graduate and Undergraduate Exams
#### Reservation and Registration Approve
####  Courses Menu
 #### Courses Page
####  Course Details
####  Reservation Form
#### Staff Office Hours
#### Admin Panel

## Demo

