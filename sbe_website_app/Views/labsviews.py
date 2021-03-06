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
from django.views.decorators.csrf import csrf_exempt
import re

# import email confirmation stuff
from django.core.mail import send_mail
from django.conf import settings


#  Get and Post HTTP Methods using API For Labs 


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




# Get and Post HTTP Methods using API For Reserving Labs 
class ReserveLabList(APIView):
    @csrf_exempt    
    def get(self,request):
        reserved_labs = ReserveLab.objects.all()
        serializer = ReserveLabSerializer(reserved_labs,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = ReserveLabSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            sendReservationRequest(request)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get , Put and delete HTTP Methods using API For a specific reserved Lab
def sendReservationRequest(request):
    try:
        staff_name = Person.objects.get(id=request.data["staff_id"])
        
        send_mail("Reservation Request",
            str(staff_name) + " has requested a reservation, confirm or decline his/her request",
            'settings.EMAIL_HOST_USER', ["omarzaher787@gmail.com"],fail_silently=False,)
        
        send_mail("Reservation Pending",
            "hello "+ staff_name.fname +" , please wait for a confirmation for your reservation. \nThank you for your patience \nSBME Website Managers",
            'settings.EMAIL_HOST_USER', [staff_name.email],fail_silently=False,)
        
    except Exception :
        raise ValidationError("Couldn't send the message to the email ! ") 
    
class ReserveLabDetails(APIView):
    @csrf_exempt    
    def get_object(self, pk):
        try:
            return ReserveLab.objects.get(pk=pk)
        except ReserveLab.DoesNotExist:
            raise Http404

    @csrf_exempt    
    def get(self, request, pk, format=None):
        reserved_lab= self.get_object(pk)
        serializer = ReserveLabSerializer(reserved_lab)
        return Response(serializer.data)

    @csrf_exempt    
    def put(self, request, pk, format=None):
        reserved_lab = self.get_object(pk)
        serializer = ReserveLabSerializer(reserved_lab, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @csrf_exempt   
    def delete(self, request, pk, format=None):
        reserved_lab = self.get_object(pk)
        reserved_lab.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

