from asyncio import constants
from urllib import response
from django.shortcuts import render
from rest_framework.views import APIView
from ...serializers import *
from rest_framework.response import Response
from ...models import *
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
# import file staff
from django.core.files import File
from django.http import HttpResponse
from rest_framework.decorators import api_view
# from sbe_website_app.settings import BASE_DIR, MEDIA_ROOT
from sbe_dj_react_proj.settings import BASE_DIR, MEDIA_ROOT
from rest_framework import viewsets



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



@api_view(['GET'])
def DownloadPDF(self,pk):

    course=Course.objects.get(pk=pk)
    print(course)
    path_to_file = MEDIA_ROOT + f'/{course.stds_grades}'
    f = open(path_to_file, 'rb')
    pdfFile = File(f)
    response = HttpResponse(pdfFile.read())
    response['Content-Disposition'] = 'attachment'
    return response


class MatrialfileView(APIView):
    def get(self,request):
        courses = MaterialFile.objects.all()
        serializer = MaterialfileSerializer(courses,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = MaterialfileSerializer(data=request.data)

        if len(request.FILES.getlist('matrial_upload'))>0:
            MaterialFile.objects.create(matrial_upload=matrial_upload)

        print(matrial_upload)


        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

