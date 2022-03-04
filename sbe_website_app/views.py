from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import CourseSerializer, DeviceSerializer, FacultyEmpSerializer, HallSerializer, LabSerializer, ReserveDeviceSerializer, ReserveHallSerializer, ReserveLabSerializer, StaffSerializer, StudentSerializer
from rest_framework.response import Response
from .models import *
from rest_framework import status
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from braces.views import CsrfExemptMixin


# Create your views here.

# Get and Post HTTP Methods using API For Students 
class StudentList(CsrfExemptMixin,APIView):
    
    def get(self,request):
        students = Student.objects.all()
        serializer = StudentSerializer(students,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get , Put and delete HTTP Methods using API For a specific student  

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
        serializer = StaffSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        serializer = FacultyEmpSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        serializer = ReserveHallSerializer(reserved_halls,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = ReserveHallSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
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