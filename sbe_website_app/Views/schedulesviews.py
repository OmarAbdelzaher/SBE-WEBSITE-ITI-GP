from django.shortcuts import render
from rest_framework.views import APIView
from  ..serializers import *
from rest_framework.response import Response
from ..models import *
from rest_framework import status
from django.http import Http404
from rest_framework.decorators import api_view
from sbe_dj_react_proj.settings import BASE_DIR, MEDIA_ROOT
from django.core.files import File
from django.http import HttpResponse

class LecSchedulesList(APIView):
    def get(self,request):
        lec_schedule = LecSchedule.objects.all()
        serializer = LecScheduleSerializer(lec_schedule,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = LecScheduleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LecSchedulesDetails(APIView):
    def get_object(self, pk):
        try:
            return LecSchedule.objects.get(pk=pk)
        except LecSchedule.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        lec_schedule = self.get_object(pk)
        serializer = LecScheduleSerializer(lec_schedule)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        lec_schedule = self.get_object(pk)
        serializer = LecScheduleSerializer(lec_schedule, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        lec_schedule = self.get_object(pk)
        lec_schedule.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ExamSchedulesList(APIView):
    def get(self,request):
        exam_schedule = ExamSchedule.objects.all()
        serializer = ExamScheduleSerializer(exam_schedule,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = ExamScheduleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ExamSchedulesDetails(APIView):
    def get_object(self, pk):
        try:
            return ExamSchedule.objects.get(pk=pk)
        except ExamSchedule.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        exam_schedule = self.get_object(pk)
        serializer = ExamScheduleSerializer(exam_schedule)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        exam_schedule = self.get_object(pk)
        serializer = ExamScheduleSerializer(exam_schedule, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        exam_schedule = self.get_object(pk)
        exam_schedule.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def DownloadPDFSchedules(self,year,type):
    if type == "exam":
        if year == "Year 1" or year == "Year 2" or year == "Year 3" or year == "Year 4":
            exam = ExamSchedule.objects.get(year=year)
            path_to_file = MEDIA_ROOT + f'/{exam.exam_file}'
            
        else:
            exam = ExamSchedule.objects.get(id=int(year))
            path_to_file = MEDIA_ROOT + f'/{exam.exam_file}'
        
    elif type == "lec":
        if year == "Year 1" or year == "Year 2" or year == "Year 3" or year == "Year 4":
            lec = LecSchedule.objects.get(year=year)
            path_to_file = MEDIA_ROOT + f'/{lec.schedule_file}'
            
        else:
            lec = LecSchedule.objects.get(id=int(year))
            path_to_file = MEDIA_ROOT + f'/{lec.schedule_file}'
       
    f = open(path_to_file, 'rb')
    pdfFile = File(f)
    response = HttpResponse(pdfFile.read())
    response['Content-Disposition'] = 'attachment'
 
    return response

    