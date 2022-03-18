
# Project Title
SBME Website

# Table of contents
- [Project Description](#project-description)
- [Project Overview](#project-overview)
- [Problem to be solved](#problem-to-be-solved)
- [Functional requirements](#functional-requirements)
- [Non Functional requirements](#non-functional-requirements)
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

## Problem to be solved
The project aims to build a website to reduce the paper and manual work for managing the department. Also, it helps to end the complexities involved in communication between the staff and the students. It provides convenient access to the needed information for students and makes it easier for the staff to upload and deliver it for them. So, the website saves time and distance and improve the interaction between the staff and the students

## Functional requirements
- Signup and Login
- View and Edit profile
- Request a registration/ reservation
- Confirm for a registration /reservation
- Add and assign courses to members
- Add course materials, grades and history
- Add/edit/delete news, events and schedules
- Add/edit/delete office hours
- Download and Upload Documents

## Non Functional requirements
- Good performance
- Security
- Reliability
- Maintainability
- Usability

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

 #### News sections
 ![HomeNews](https://user-images.githubusercontent.com/61268414/158979156-52ed0129-a421-4418-9131-024d5bbc91dd.png)

 
 #### Events sections
 ![HomeEvents](https://user-images.githubusercontent.com/61268414/158979248-14a45398-4646-49c0-9850-f2869fae6c90.png)



 #### About and Footer sections
![footer](https://user-images.githubusercontent.com/61268414/158468825-c93bdc82-12ac-4b73-9bc0-3f29b9ff0fe0.png)


 ### Registration and Login Forms
 #### Registration Form

![SignUp](https://user-images.githubusercontent.com/61268414/158795758-4837a0f2-0fce-4bb7-b4c8-87c5a61d34c7.png)


 #### Login Form
![login](https://user-images.githubusercontent.com/61268414/158468857-02347ad3-62ec-4eb4-b29e-75da9d6abd3e.png)


 ### Reset Password
 ![reset-pass](https://user-images.githubusercontent.com/61268414/158795807-dac21f21-e145-46e9-b377-49ae9420b64d.png)
 
 ### Confirm Reset Password
 ![confirmpass](https://user-images.githubusercontent.com/61268414/158981864-52bf1c8a-dbcd-47cb-9ff9-340671aeef0e.png)


 ### Profile Page
 ![Profile](https://user-images.githubusercontent.com/61268414/158991897-5cafeb89-3587-45fe-ada3-acf58fd5b015.png)

 ### Edit Profile
 ![EditProfile](https://user-images.githubusercontent.com/61268414/158991921-88011b06-2d50-40ef-bf4a-3603b2236f8d.png)

 ### System Staff
 ![Staff](https://user-images.githubusercontent.com/61268414/158979901-ba3eae81-7544-448d-b0cb-0086756a4bbe.png)
 
  ### Staff Office Hours
  ![officehours](https://user-images.githubusercontent.com/61268414/158981973-5d04bb2f-b634-4d93-8072-1eafcb3ead81.png)




### Graduate and Undergraduate Admission
#### Graduate Admission
![GraduateAdmission](https://user-images.githubusercontent.com/61268414/158979329-24bcbde8-0e1f-4c28-8379-d0c13adb40c6.png)


#### Undergraduate Admission
![UnderGraduateAdmission](https://user-images.githubusercontent.com/61268414/158979394-4784ecb6-6fec-4d6d-961b-8df7fdf88d19.png)


### Graduate and Undergraduate News
#### Graduate News
![GraduateNews](https://user-images.githubusercontent.com/61268414/158992198-21863c18-8e27-4b61-b9cd-d3add725790d.png)

#### Undergraduate News
![UnderGraduateNews](https://user-images.githubusercontent.com/61268414/158992226-3d8386ff-01aa-45d4-ad4b-17cb63fbb0fb.png)



### Graduate and Undergraduate Exams Schedule
#### Graduate Exams Schedule
![graduateexamscheduale](https://user-images.githubusercontent.com/61268414/158979467-c580b15c-e9de-461a-a54d-807dec9d5943.png)

#### Undergraduate Exams Schedule
![UnderGraduateExam](https://user-images.githubusercontent.com/61268414/158991541-37be7ce9-76bd-4c34-be3e-2533dc7f0faf.png)

### Graduate and Undergraduate Lectures
#### Graduate Lectures Schedule

![GraduateScheduale](https://user-images.githubusercontent.com/61268414/158979697-129201c3-6af5-4e6a-8c54-0c74dca4919f.png)

#### Undergraduate Lectures Schedule
![LectureSchedule](https://user-images.githubusercontent.com/61268414/158979774-293b715d-03e7-405a-80ba-e17b4b577d38.png)


### Reservations schedule
#### Halls Reservations
![Hall-reservation](https://user-images.githubusercontent.com/61268414/158991773-d2a714fe-7fa4-4007-bdad-5d02f5dd8094.png)

#### Labs Reservations
![lab-reservations](https://user-images.githubusercontent.com/61268414/158991762-b8f92d66-6542-4565-8ee8-5f988db3eae2.png)

#### Devices Reservations
![Device-reservation](https://user-images.githubusercontent.com/61268414/158991745-664a4b44-cfc2-41de-a2d4-d4e5ea731296.png)

### Courses Pages

####  Courses Menu
![course-menu](https://user-images.githubusercontent.com/61268414/158796652-4b14ebab-6955-4d4e-b636-fd2265d76153.png)


 #### Specific year and semester courses
 
![Courses](https://user-images.githubusercontent.com/61268414/158991305-f7848747-e223-41f7-b45b-597331f3c59e.png)


 #### Add Courses
![Add-course](https://user-images.githubusercontent.com/61268414/158991831-612a4ab8-935e-47f9-afca-ab70ba410961.png)



 
###  Course Details
![CourseDetails](https://user-images.githubusercontent.com/61268414/158991329-9adb8ec7-ea74-46b4-bcc1-a44dd40684f0.png)


###  Reservation Forms
#### Reserve A Hall

![Reserve_hall](https://user-images.githubusercontent.com/61268414/158469576-4f805546-02d2-4bc6-b5fd-8940194f3890.png)

#### Reserve A Lab
![ReserveLab](https://user-images.githubusercontent.com/61268414/158469566-f711750a-385e-4a12-853c-48c129b804bb.png)


#### Reserve A Device
![ReserveDevice](https://user-images.githubusercontent.com/61268414/158469554-c0168c76-8ea8-428c-ba8a-1df412016023.png)


### Staff Office Hours
![officehours](https://user-images.githubusercontent.com/61268414/158991246-da7a9589-5487-4e59-bff8-2fb1ca61dac1.png)

#### Add Office Hours
![add-office-hours](https://user-images.githubusercontent.com/61268414/158795881-e15e9c26-16b1-4ec6-96bb-8237bf7fff7b.png)

 
### Moderator Panel
![moderator-panel](https://user-images.githubusercontent.com/61268414/158796080-ef7e494d-b980-4395-b441-287dd4a78fba.png)

#### Add News
![add-news-moderator](https://user-images.githubusercontent.com/61268414/158796068-174f4650-d96f-4bc6-98f5-f07203c31aaf.png)

#### Add Hall
![add-hall](https://user-images.githubusercontent.com/61268414/158991186-3b3d3162-d477-4e4b-aa1b-b1a58082f8c0.png)




## Demo

