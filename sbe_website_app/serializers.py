from rest_framework import serializers
from .models import * 

from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ['id', 'fname','lname','email','gender','birthdate','address','phone_number','password']
        
class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['fname','lname','email','gender','birthdate','address','phone_number','password']
    
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(PersonSerializer, self).create(validated_data) 
    
    
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id','fname','lname','email','gender','birthdate','address','phone_number','graduate','year_of_graduation','password','is_active']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(StudentSerializer, self).create(validated_data) 
    
class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ['fname','lname','email','gender','birthdate','address','phone_number','password']
    
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(StaffSerializer, self).create(validated_data) 
    
class FacultyEmpSerializer(serializers.ModelSerializer):
    class Meta :
        model = FacultyEmp
        fields = ['fname','lname','email','gender','birthdate','address','phone_number','title','password']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(FacultyEmpSerializer, self).create(validated_data) 

class CourseSerializer(serializers.ModelSerializer):
    class Meta :
        model = Course
        fields = ['id','name','total_grade','stds_grades','schedule','instructions','materials','staff_id']


class HallSerializer(serializers.ModelSerializer):
    class Meta :
        model = Hall
        fields = ['name']

class LabSerializer(serializers.ModelSerializer):
    class Meta :
        model = Lab
        fields = ['name']

class DeviceSerializer(serializers.ModelSerializer):
    class Meta :
        model = Device
        fields = ['name']

class DeviceSerializer(serializers.ModelSerializer):
    class Meta :
        model = Device
        fields = ['name']

class ReserveHallSerializer(serializers.ModelSerializer):
     class Meta :
        model = ReserveHall
        fields = ['hall_id','staff_id','timeslot']

class ReserveLabSerializer(serializers.ModelSerializer):
     class Meta :
        model = ReserveLab
        fields = ['hall_id','staff_id','start','end','cancelled']

class ReserveDeviceSerializer(serializers.ModelSerializer):
     class Meta :
        model = ReserveDevice
        fields = ['hall_id','staff_id','start','end','cancelled']

class NewsSerializer(serializers.ModelSerializer):
     class Meta :
        model = New
        fields = ['id','name','description','picture']

class EventSerializer(serializers.ModelSerializer):
     class Meta :
        model = Event
        fields = ['id','name','details','picture']

class TimeslotSerializer(serializers.ModelSerializer):
    class Meta :
        model = TimeSlot
        fields = ['id','timeslot']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['timeslot'] = str(instance)

        return ret
        