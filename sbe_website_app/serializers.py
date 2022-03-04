from rest_framework import serializers
from .models import * 

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['fname','lname','email','gender','birthdate','address','phone_number','password']

        def create(self, validated_data):
            user = Person.objects.create(
                fname = validated_data['fname'],
                lname = validated_data['lname'],
                email = validated_data['email'],
                phone_number= validated_data['phone_number'],
                gender = validated_data['gender'],
                birthdate = validated_data['birthdate'],
                address = validated_data['address'],
            )
            user.set_password(validated_data['password'])
            user.save()
            return user
    
    
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['fname','lname','email','gender','birthdate','address','phone_number','graduate','year_of_graduation']

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ['fname','lname','email','gender','birthdate','address','phone_number','position','office_hours']

class FacultyEmpSerializer(serializers.ModelSerializer):
    class Meta :
        model = FacultyEmp
        fields = ['fname','lname','email','gender','birthdate','address','phone_number','title']


class CourseSerializer(serializers.ModelSerializer):
    class Meta :
        model = Course
        fields = ['name','total_grade','stds_grades','schedule','instructions','materials','staff_id']


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
        fields = ['hall_id','staff_id','start','end','cancelled']

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
