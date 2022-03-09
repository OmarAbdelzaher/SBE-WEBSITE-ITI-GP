from asyncio import constants
from urllib import response
from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from .models import *
from rest_framework import status
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from braces.views import CsrfExemptMixin
from django.http import HttpResponse
from django.core.exceptions import ValidationError
import re
# import email confirmation stuff
from django.core.mail import send_mail
from django.conf import settings



# Get and Post HTTP Methods using API For Students 
@method_decorator(csrf_exempt, name='dispatch') 
class StudentList(APIView):

    # @csrf_exempt
    def get(self,request):
        students = Student.objects.all()
        serializer = StudentSerializer(students,many=True)
        return Response(serializer.data)
        
    # @csrf_exempt
    def post(self,request):
        user = Student.objects.filter(email=request.data['email'])
        email_uni1 = re.search("@eng1.cu.edu.eg",request.data['email'])
        email_uni = re.search("@eng.cu.edu.eg" , request.data['email'])
        if email_uni or email_uni1 :
            request.data["is_active"] = True
            serializer = StudentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif not user.exists():
            serializer = StudentSerializer(data=request.data)
            if serializer.is_valid():
                sendActivationRequest(request)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else :
            return Response("this email is already exist")

# Get , Put and delete HTTP Methods using API For a specific student  
def sendActivationRequest(request):
    try:
        send_mail("Activation Request",
            "a new user has signed up called "+request.data["fname"]+" " +request.data["lname"] +" waiting for account activation",
            'settings.EMAIL_HOST_USER', ['djblog2022@gmail.com'],fail_silently=False,)
        
        send_mail("Activation Pending",
            "hello "+request.data["fname"]+" , please wait for account activation",
            'settings.EMAIL_HOST_USER', [request.data["email"]],fail_silently=False,)
        
    except Exception :
        raise ValidationError("Couldn't send the message to the email ! ") 
    
class StudentDetails(APIView):
    def get_object(self, pk):
        try:
            return Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        student = self.get_object(pk)
        serializer = StudentSerializer(student)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        student = self.get_object(pk)
        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        student = self.get_object(pk)
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Get and Post HTTP Methods using API For Staff 


class StaffList(APIView):
        def get(self,request):
            all_staff = Staff.objects.all()
            serializer = StaffSerializer(all_staff,many=True)
            return Response(serializer.data)
        def post(self,request):
            user = Staff.objects.filter(email=request.data['email'])
            email_uni1 = re.search("@eng1.cu.edu.eg",request.data['email'])
            email_uni = re.search("@eng.cu.edu.eg" , request.data['email'])
            if email_uni or email_uni1 :
                request.data["is_active"] = True
                serializer = StaffSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            elif not user.exists():
                serializer = StaffSerializer(data=request.data)
                if serializer.is_valid():
                    sendActivationRequest(request)
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response("this email is already exist")


# Get , Put and delete HTTP Methods using API For a specific staff member  

class StaffDetails(APIView):
    def get_object(self, pk):
        try:
            return Staff.objects.get(pk=pk)
        except Staff.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        one_staff = self.get_object(pk)
        serializer = StaffSerializer(one_staff)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        one_staff = self.get_object(pk)
        serializer = StaffSerializer(one_staff, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        one_staff = self.get_object(pk)
        one_staff.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Get and Post HTTP Methods using API For Faculty Employees 


class FacultyEmpList(APIView):
    def get(self,request):
        faculty_emps = FacultyEmp.objects.all()
        serializer = FacultyEmpSerializer(faculty_emps,many=True)
        return Response(serializer.data)
    def post(self,request):
        user = FacultyEmp.objects.filter(email=request.data['email'])
        email_uni1 = re.search("@eng1.cu.edu.eg",request.data['email'])
        email_uni = re.search("@eng.cu.edu.eg" , request.data['email'])
        if email_uni or email_uni1 :
            request.data["is_active"] = True
            serializer = StudentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif not user.exists():      
            serializer = FacultyEmpSerializer(data=request.data)
            if serializer.is_valid():
                sendActivationRequest(request)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response("this email is already exist")

# Get , Put and delete HTTP Methods using API For a specific Faculty Employee  

class FacultyEmpDetails(APIView):
    def get_object(self, pk):
        try:
            return FacultyEmp.objects.get(pk=pk)
        except FacultyEmp.DoesNotExist: 
            raise Http404

    def get(self, request, pk, format=None):
        emp = self.get_object(pk)
        serializer = FacultyEmpSerializer(emp)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        emp = self.get_object(pk)
        serializer = FacultyEmpSerializer(emp, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        emp = self.get_object(pk)
        emp.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Get and Post HTTP Methods using API For Courses 


class CourseList(APIView):
    def get(self,request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get , Put and delete HTTP Methods using API For a specific course

class CourseDetails(APIView):
    def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        course = self.get_object(pk)
        serializer = CourseSerializer(course)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        course = self.get_object(pk)
        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        course = self.get_object(pk)
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Get and Post HTTP Methods using API For Halls 

class HallList(APIView):
    def get(self,request):
        halls = Hall.objects.all()
        serializer = HallSerializer(halls,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = HallSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get , Put and delete HTTP Methods using API For a specific Hall

class HallDetails(APIView):
    def get_object(self, pk):
        try:
            return Hall.objects.get(pk=pk)
        except Hall.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        hall = self.get_object(pk)
        serializer = HallSerializer(hall)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        hall = self.get_object(pk)
        serializer = HallSerializer(hall, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        hall = self.get_object(pk)
        hall.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Get and Post HTTP Methods using API For Labs 


class LabList(APIView):
    def get(self,request):
        labs = Lab.objects.all()
        serializer = LabSerializer(labs,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = LabSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get , Put and delete HTTP Methods using API For a specific Lab

class LabDetails(APIView):
    def get_object(self, pk):
        try:
            return Lab.objects.get(pk=pk)
        except Lab.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        lab = self.get_object(pk)
        serializer = LabSerializer(lab)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        lab = self.get_object(pk)
        serializer = LabSerializer(lab, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        lab = self.get_object(pk)
        lab.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Get and Post HTTP Methods using API For Devices 


class DeviceList(APIView):
    def get(self,request):
        devices = Device.objects.all()
        serializer = DeviceSerializer(devices,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = DeviceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get , Put and delete HTTP Methods using API For a specific device

class DeviceDetails(APIView):
    def get_object(self, pk):
        try:
            return Device.objects.get(pk=pk)
        except Device.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        lab = self.get_object(pk)
        serializer = DeviceSerializer(lab)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        device = self.get_object(pk)
        serializer = DeviceSerializer(device, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        device = self.get_object(pk)
        device.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Get and Post HTTP Methods using API For Reserving Halls 

class ReserveHallList(APIView):
    def get(self,request):
        reserved_halls = ReserveHall.objects.all()
        # reserved_halls = ReserveHall.objects.filter(is_confirmed = True)
        serializer = ReserveHallSerializer(reserved_halls,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = ReserveHallSerializer(data=request.data)
        if serializer.is_valid():
            sendReservationRequest(request)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def sendReservationRequest(request):
    try:
        staff_name = Person.objects.get(id=request.data["staff_id"])
        
        send_mail("Reservation Request",
            str(staff_name) + " has requested a reservation, confirm or decline his request",
            'settings.EMAIL_HOST_USER', ["omarzaher787@gmail.com"],fail_silently=False,)
        
        send_mail("Reservation Pending",
            "hello "+ staff_name.fname +" , please wait for a confirmation for your reservation. \nThank you for your patience \nSBME Website Managers",
            'settings.EMAIL_HOST_USER', [staff_name.email],fail_silently=False,)
        
    except Exception :
        raise ValidationError("Couldn't send the message to the email ! ") 
    


        
# Get , Put and delete HTTP Methods using API For a specific reserved Hall

class ReserveHallDetails(APIView):
    def get_object(self, pk):
        try:
            return ReserveHall.objects.get(pk=pk)
        except ReserveHall.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        reserved_hall = self.get_object(pk)
        serializer = ReserveHallSerializer(reserved_hall)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        reserved_hall = self.get_object(pk)
        serializer = ReserveHallSerializer(reserved_hall, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        reserved_hall = self.get_object(pk)
        reserved_hall.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Get and Post HTTP Methods using API For Reserving Labs 

class ReserveLabList(APIView):
    def get(self,request):
        reserved_labs = ReserveLab.objects.all()
        serializer = ReserveLabSerializer(reserved_labs,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = ReserveLabSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get , Put and delete HTTP Methods using API For a specific reserved Lab

class ReserveLabDetails(APIView):
    def get_object(self, pk):
        try:
            return ReserveLab.objects.get(pk=pk)
        except ReserveLab.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        reserved_lab= self.get_object(pk)
        serializer = ReserveHallSerializer(reserved_lab)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        reserved_lab = self.get_object(pk)
        serializer = ReserveHallSerializer(reserved_lab, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        reserved_lab = self.get_object(pk)
        reserved_lab.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Get and Post HTTP Methods using API For Reserving Devices  

class ReserveDeviceList(APIView):
    def get(self,request):
        reserved_devices = ReserveDevice.objects.all()
        serializer = ReserveDeviceSerializer(reserved_devices,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = ReserveDeviceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get , Put and delete HTTP Methods using API For a specific reserved device

class ReserveDeviceDetails(APIView):
    def get_object(self, pk):
        try:
            return ReserveLab.objects.get(pk=pk)
        except ReserveLab.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        reserved_device= self.get_object(pk)
        serializer = ReserveDeviceSerializer(reserved_device)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        reserved_device = self.get_object(pk)
        serializer = ReserveDeviceSerializer(reserved_device, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        reserved_device = self.get_object(pk)
        reserved_device.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class News(APIView):
    def get(self,request):
        news = New.objects.all()
        serializer = NewsSerializer(news,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = NewsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NewDetails(APIView):
    def get_object(self, pk):
        try:
            return New.objects.get(pk=pk)
        except New.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        new = self.get_object(pk)
        serializer = NewsSerializer(new)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        new = self.get_object(pk)
        serializer = NewsSerializer(new, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        new = self.get_object(pk)
        new.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class Events(APIView):
    def get(self,request):
        events = Event.objects.all()
        serializer = EventSerializer(events,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventsDetails(APIView):
    def get_object(self, pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        event = self.get_object(pk)
        serializer = Event(event)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        event = self.get_object(pk)
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        event = self.get_object(pk)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TimeSlotsView(APIView):
    def get(self,request):
        timeslots = TimeSlot.objects.all()
        serializer = TimeslotSerializer(timeslots,many=True)
        return Response(serializer.data)



class NewsGraduateView(APIView):
    def get(self,request):
        news = New.objects.filter(category='graduate')

        # news = New.objects.all()
        serializer = NewsSerializer(news,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = NewsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NewsUnderGraduateView(APIView):
    def get(self,request):
        news = New.objects.filter(category='undergraduate')

        # news = New.objects.all()
        serializer = NewsSerializer(news,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = NewsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseGraduateView(APIView):
    def get(self,request):
        course = Course.objects.filter(category='graduate')

        # news = New.objects.all()
        serializer = CourseSerializer(course,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseUngraduateView(APIView):
    def get(self,request):
        course = Course.objects.filter(category='undergraduate')

        # news = New.objects.all()
        serializer = CourseSerializer(course,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseUngraduateYearOne(APIView):
    def get(self,request):
        course = Course.objects.filter(year=1)

        # news = New.objects.all()
        serializer = CourseSerializer(course,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseUngraduateYearTwo(APIView):
    def get(self,request):
        course = Course.objects.filter(year=2)

        # news = New.objects.all()
        serializer = CourseSerializer(course,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseUngraduateYearThree(APIView):
    def get(self,request):
        course = Course.objects.filter(year=3)

        # news = New.objects.all()
        serializer = CourseSerializer(course,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseUngraduateYearFour(APIView):
    def get(self,request):
        course = Course.objects.filter(year=4)

        # news = New.objects.all()
        serializer = CourseSerializer(course,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseHistoryView(APIView):
    def get(self,request):
        courses = CourseHistory.objects.all()
        serializer = CourseHistorySerializer(courses,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = CourseHistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseHistoryDetailsView(APIView):
    def get_object(self, pk):
        try:
            return CourseHistory.objects.get(pk=pk)
        except CourseHistory.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        course = self.get_object(pk)
        serializer = CourseHistorySerializer(course)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        course = self.get_object(pk)
        serializer = CourseHistorySerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        course = self.get_object(pk)
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OfficeHoursList(APIView):
    def get(self,request):
        office_hours = OfficeHours.objects.all()
        serializer = OfficeHoursSerializer(office_hours,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = OfficeHoursSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OfficeHoursDetails(APIView):
    def get_object(self, pk):
        try:
            return OfficeHours.objects.get(pk=pk)
        except OfficeHours.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        office_hour = self.get_object(pk)
        serializer = OfficeHoursSerializer(office_hour)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        office_hour = self.get_object(pk)
        serializer = OfficeHoursSerializer(office_hour, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        office_hour = self.get_object(pk)
        office_hour.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

