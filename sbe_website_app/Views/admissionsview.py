from rest_framework.views import APIView
from ..serializers import *
from rest_framework.response import Response
from ..models import *
from rest_framework import status
from django.http import Http404
from django.http import HttpResponse

# Get and Post HTTP Methods using API For Admissions 

class AdmissionList(APIView):
    def get(self,request):
        admissions = Admission.objects.all()
        serializer = AdmissionSerializer(admissions,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = AdmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get , Put and delete HTTP Methods using API For a specific admission

class AdmissionDetails(APIView):
    def get_object(self, pk):
        try:
            return Admission.objects.get(pk=pk)
        except Admission.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        admission = self.get_object(pk)
        serializer = AdmissionSerializer(admission)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        admission = self.get_object(pk)
        
        serializer = AdmissionSerializer(admission, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        admission = self.get_object(pk)
        admission.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)