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


#  Get and Post HTTP Methods using API For Reserving Devices  

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
