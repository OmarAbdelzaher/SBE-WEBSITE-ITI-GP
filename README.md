
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
### Header (Top Navbar)
- It contains links Login/Sign Up
- If the user is already logged in, then the link will be Logout
- If the logged-in user is an admin, then there will be another link called Moderator that will redirect the admin to the administration page to make the admin CRUD Operations
### Bottom Navbar
- It contains links to the Home page sections ( News, Events about, and contact us). On click, the link will move to the desired section.
- It contains Graduates and Under-Graduates menu 
### Body
- It has the top News and Events When clicking on the image or read more button, it will redirect to the details page of the news or events
- It has about department section
### Footer
- It has contact info (phone, mail, Facebook..)
- It has the location and mapping for the department
### Registration Page
- It is a form that takes:
  - First Name
  - Last Name
  - Email
  - Password
  - Password Confirmation
  - Birthdate
  - Address
  - Phone Number
  - Gender
- Also, it contains the role of the person (Student, Dr , TA, or Employee)
  - If the person is a student the dropdown menu if the student is a graduate or undergraduate will appear. and the year of graduation
  - if the person is an employee, input with the title will be shown
  
- After signup, the admin will receive the registration request and he will be able to approve or decline the request
- Email confirmation must be sent to the member after signing in
### Login Page
- After approval, the user can log in to the account
- The form contains two fields: Email and Password
- The password is shown in asterisks
### Reservations Page
- Doctors and TAs can reserve lecture halls/labs by filling out a reservation form
- The reservation form contains:
  - Day and Time
  - Hall/lab/device name
-  Members can't reserve a reserved hall/device
### Courses
- The student will choose the study year and the semester then courses will be shown
- The student can view and download the grades of each course
- Each course has instruction, materials, and history
### Profile
- The user has a profile page with all his information
- The user can edit his information
### Admission
- Both students graduate and under-graduate can view required admission for the department 
### Events and News Page
- Dynamic pages that generate new events and news for both graduate and undergraduate students

### Users and Roles
#### TAs and Drs
- Reserve a hall/lab/device for a specific course
- Define office hours
- Upload courses materials per semester
- Upload grades for students (sheets)
#### Students
- Can view course schedules
- Can view grades
- Admissionon and registration infos 
- Can view Course instructions 
- Can view Courses history and materials 

#### Admin / Employee with specific admin roles
- Approve all reservation requests 
- Avoid collision between TAs and Drs reservations
- Can add/edit/delete members directly from the admin page
- Can add/remove/edit news
- Can add/remove/edit events
- Can add/remove/edit pdf files “exams, tables” 
- Can add/edit/delete reservations
- Can add Labs/Halls to this dropdown menu
- Can add and assign the course to staff members







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
 ### Home Page
 ![home1](https://user-images.githubusercontent.com/61268414/157886381-183c8c6f-9645-4786-a7a6-1216f26a459c.png)
 #### About and Footer sections
![home2](https://user-images.githubusercontent.com/61268414/157886409-5022338a-b9b7-49bd-9061-345d2107227d.png)

 ### Registration and Login Forms
 #### Registration Form
 ![signuupp](https://user-images.githubusercontent.com/61268414/157886338-75d066ef-1d13-448d-9a74-35041b1e2a88.png)
 #### Login Form
![login](https://user-images.githubusercontent.com/61268414/157886426-f27f6308-1890-422a-bb74-d078bc6c2b60.png)

 ### Reset Password
 
 ### Profile Page
 ![profile](https://user-images.githubusercontent.com/61268414/157886730-5d948e5e-82d1-49d9-84ca-f70da91d22c0.png)

### Graduate and Undergraduate Admission
#### Graduate Admission
#### Undergraduate Admission

### Graduate and Undergraduate News
#### Graduate News
#### Undergraduate News

### Graduate and Undergraduate Events
#### Graduate Events
#### Undergraduate Events

### Graduate and Undergraduate Exams
#### Graduate Exams
#### Undergraduate Exams

### Reservation and Registration Approve

### Courses Pages

####  Courses Menu
![courses](https://user-images.githubusercontent.com/61268414/157886655-80134290-ea86-40f6-bb2d-593b0c955b75.png)

 #### Specific year and semester courses
 ![courses-pages](https://user-images.githubusercontent.com/61268414/157888527-2fb49447-1b5d-436d-ae22-e3f3db254ee4.png)

 #### Add Courses
 ![addcourse](https://user-images.githubusercontent.com/61268414/157886889-5989b9fe-5373-4b64-927f-de0019f08aa5.png)

 
###  Course Details

###  Reservation Forms
#### Reserve A Hall
![reserve-hall](https://user-images.githubusercontent.com/61268414/157892089-3fc9803e-111d-42f1-b32e-b3763020cd19.png)

#### Reserve A Lab
![reserve-lab](https://user-images.githubusercontent.com/61268414/157892167-82970c3a-c96f-47f8-9241-e1de3d1646da.png)

#### Reserve A Device
![reserve-device](https://user-images.githubusercontent.com/61268414/157892185-bdf9aacc-6914-4b49-a97e-10751e559617.png)

### Staff Office Hours

### Admin Panel
![admin1](https://user-images.githubusercontent.com/61268414/157886866-8a7366fd-5f30-46ce-a974-6e61ae94f447.png)
#### Halls
![hall-admin](https://user-images.githubusercontent.com/61268414/157886819-1b03b920-805e-4bc3-acad-e58f5c3d12f7.png)
#### Add Hall
![add_hall](https://user-images.githubusercontent.com/61268414/157886846-45e93fd5-5791-42cc-b5f5-a67eeb8ba4ca.png)


## Demo

