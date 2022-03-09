from django.shortcuts import render
from rest_framework.views import APIView
from  ...serializers import *
from rest_framework.response import Response
from ...models import *
from rest_framework import status
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
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
            serializer = FacultyEmpSerializer(data=request.data)
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


