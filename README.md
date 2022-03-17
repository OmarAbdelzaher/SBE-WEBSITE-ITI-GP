
# Project Title
SBME Website

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
SBME is a website for systems and biomedical engineering at Cairo University. It's an ITI graduation project, a 3-months intensive training program, Full-stack Development using Python Track.

## Project Overview
The proposed website was made for the sbe department. It will be used by the department staff and employees with all their roles. Also, by the student that will interact with the department. The website's main objective is to facilitate communication between the department, the staff, and the students.
 The department information, news, and events will be available to the students to be more familiar with the department.
 The department staff can upload materials and grades for the courses they teach. Also, they can reserve a hall/lab/device for a specific course.
Moreover, the student can view grades, material, and history for each course

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

#### Staff members:
- Member (reservation - office hours - upload courses contents assigned by coordinator)
- Coordinator (add courses - assign courses to members) and coordinator has the same services of regular members
#### Employees :
- Member
- Moderators ( employees have frontend admin privileges to approve requests such as registration) and member has the same services of regular members

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
Zeina Ayman | zeinaayman14@gmail.com
Samiha Hesham | samihahesham9@gmail.com
Saeed Adel | sashsadel7@gmail.com
Omar Abdelzaher | omarzaher787@gmail.com



## User Interface
 ### Home Page
![home1](https://user-images.githubusercontent.com/61268414/158468524-d4522838-f175-4e98-8332-a7dfca665cb8.png)

![home2](https://user-images.githubusercontent.com/61268414/158468607-b3e48657-1aba-4af3-b866-b754f0cec489.png)



 #### About and Footer sections
![footer](https://user-images.githubusercontent.com/61268414/158468825-c93bdc82-12ac-4b73-9bc0-3f29b9ff0fe0.png)


 ### Registration and Login Forms
 #### Registration Form

![SignUp](https://user-images.githubusercontent.com/61268414/158795758-4837a0f2-0fce-4bb7-b4c8-87c5a61d34c7.png)


 #### Login Form
![login](https://user-images.githubusercontent.com/61268414/158468857-02347ad3-62ec-4eb4-b29e-75da9d6abd3e.png)


 ### Reset Password
 ![reset-pass](https://user-images.githubusercontent.com/61268414/158795807-dac21f21-e145-46e9-b377-49ae9420b64d.png)

 ### Profile Page


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
![course-menu](https://user-images.githubusercontent.com/61268414/158796652-4b14ebab-6955-4d4e-b636-fd2265d76153.png)


 #### Specific year and semester courses


 #### Add Courses
 ![AddCourse](https://user-images.githubusercontent.com/61268414/158796672-a13d5589-b170-4158-a892-f5e1cb512da0.png)


 
###  Course Details

###  Reservation Forms
#### Reserve A Hall

![Reserve_hall](https://user-images.githubusercontent.com/61268414/158469576-4f805546-02d2-4bc6-b5fd-8940194f3890.png)

#### Reserve A Lab
![ReserveLab](https://user-images.githubusercontent.com/61268414/158469566-f711750a-385e-4a12-853c-48c129b804bb.png)


#### Reserve A Device
![ReserveDevice](https://user-images.githubusercontent.com/61268414/158469554-c0168c76-8ea8-428c-ba8a-1df412016023.png)


### Staff Office Hours
#### Add Office Hours
![add-office-hours](https://user-images.githubusercontent.com/61268414/158795881-e15e9c26-16b1-4ec6-96bb-8237bf7fff7b.png)
 #### View Office Hours
 
### Moderator Panel
![moderator-panel](https://user-images.githubusercontent.com/61268414/158796080-ef7e494d-b980-4395-b441-287dd4a78fba.png)

#### Add News
![add-news-moderator](https://user-images.githubusercontent.com/61268414/158796068-174f4650-d96f-4bc6-98f5-f07203c31aaf.png)

#### Add Hall



## Demo

