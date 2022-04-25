from asyncio import constants
from urllib import response
from django.shortcuts import render
from rest_framework.views import APIView
from ..serializers import *
from rest_framework.response import Response
from ..models import *
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

# import file stuff
from django.core.files import File
from django.http import HttpResponse
from rest_framework.decorators import api_view
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
            if len(request.FILES.getlist('stds_grades')) > 0:
                course.stds_grades = request.FILES.getlist('stds_grades')[0]
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        course = self.get_object(pk)
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class GraduateView(APIView):
    def get(self,request):
        courses = GraduateCourse.objects.all()
        serializer = GraduateCourseSerializer(courses,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = GraduateCourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GraduateCourseDetails(APIView):
    def get_object(self, pk):
        try:
            return GraduateCourse.objects.get(pk=pk)
        except GraduateCourse.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        course = self.get_object(pk)
        serializer = GraduateCourseSerializer(course)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        course = self.get_object(pk)
        
        serializer = GraduateCourseSerializer(course, data=request.data)
        if serializer.is_valid():
            if len(request.FILES.getlist('stds_grades')) > 0:
                course.stds_grades = request.FILES.getlist('stds_grades')[0]
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
        course = Course.objects.filter(year='Year 1')
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
        course = Course.objects.filter(year='Year 2')
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
        course = Course.objects.filter(year='Year 3')
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
        course = Course.objects.filter(year='Year 4')
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

# Graduate Course History
class CourseHistoryGradView(APIView):
    def get(self,request):
        courses = CourseHistoryGrad.objects.all()
        serializer = CourseHistoryGradSerializer(courses,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = CourseHistoryGradSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseHistoryGradDetailsView(APIView):
    def get_object(self, pk):
        try:
            return CourseHistoryGrad.objects.get(pk=pk)
        except CourseHistoryGrad.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        course = self.get_object(pk)
        serializer = CourseHistoryGradSerializer(course)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        course = self.get_object(pk)
        serializer = CourseHistoryGradSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        course = self.get_object(pk)
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def DownloadPDF(self,pk,type):

    if type == "grade":
        course=Course.objects.get(pk=pk)
        path_to_file = MEDIA_ROOT + f'/{course.stds_grades}'
    elif type == "mat":
        mat=MaterialFile.objects.get(pk=pk)
        path_to_file = MEDIA_ROOT + f'/{mat.material_upload}'
    f = open(path_to_file, 'rb')
    pdfFile = File(f)
    response = HttpResponse(pdfFile.read())
    response['Content-Disposition'] = 'attachment'
 
    return response


class MaterialfileView(APIView):
    def get(self,request):
        courses = MaterialFile.objects.all()
        serializer = MaterialfileSerializer(courses,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = MaterialfileSerializer(data=request.data)
        
        print(request.FILES.getlist('material_upload'))
        
        course = Course.objects.get(id=int(request.data["course_id"]))
        if serializer.is_valid():
            for file in request.FILES.getlist('material_upload'):
                MaterialFile.objects.create(material_upload=file,course_id=course)
                # serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MaterialfileDetailsView(APIView):
    def get_object(self, pk):
        try:
            return MaterialFile.objects.get(pk=pk)
        except MaterialFile.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        material = self.get_object(pk)
        serializer = MaterialfileSerializer(material)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        material = self.get_object(pk)
        serializer = MaterialfileSerializer(material, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        material = self.get_object(pk)
        material.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Material Files for Graduate Courses 

class MaterialfileGradView(APIView):
    def get(self,request):
        courses = MaterialFileGrad.objects.all()
        serializer = MaterialfileGradSerializer(courses,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = MaterialfileGradSerializer(data=request.data)
        
        print(request.FILES.getlist('material_upload'))
        
        course = GraduateCourse.objects.get(id=int(request.data["course_id"]))
        if serializer.is_valid():
            for file in request.FILES.getlist('material_upload'):
                MaterialFileGrad.objects.create(material_upload=file,course_id=course)
                # serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MaterialfileDetailsGradView(APIView):
    def get_object(self, pk):
        try:
            return MaterialFileGrad.objects.get(pk=pk)
        except MaterialFileGrad.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        material = self.get_object(pk)
        serializer = MaterialfileGradSerializer(material)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        material = self.get_object(pk)
        serializer = MaterialfileGradSerializer(material, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        material = self.get_object(pk)
        material.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)