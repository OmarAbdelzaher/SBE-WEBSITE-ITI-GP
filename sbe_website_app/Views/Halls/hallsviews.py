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
            return Response(serializer.validated_data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        hall = self.get_object(pk)
        hall.delete()
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
        print(request.data)
        # print(Staff.objects.filter(id = reserved_hall.staff_id))
        print(reserved_hall.timeslot)
        
        field_name = 'staff_id'
        field_value = getattr(reserved_hall, field_name)
        print(field_value)
        
        serializer = ReserveHallSerializer(reserved_hall, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        reserved_hall = self.get_object(pk)
        reserved_hall.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
