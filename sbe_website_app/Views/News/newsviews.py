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