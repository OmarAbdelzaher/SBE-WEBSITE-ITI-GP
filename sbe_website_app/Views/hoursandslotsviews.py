from django.shortcuts import render
from rest_framework.views import APIView
from  ..serializers import *
from rest_framework.response import Response
from ..models import *
from rest_framework import status
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.exceptions import ValidationError
import re

# import email confirmation stuff
from django.core.mail import send_mail
from django.conf import settings


class TimeSlotsView(APIView):
    def get(self,request):
        timeslots = TimeSlot.objects.all()
        serializer = TimeslotSerializer(timeslots,many=True)
        return Response(serializer.data)






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

