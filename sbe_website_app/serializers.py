from rest_framework import serializers
from .models import * 
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from .models.person import * 
from .models.device import * 
from .models.admission import * 
from .models.course import * 
from .models.hall import * 
from .models.lab import * 
from .models.lec_exam_schedule import *
from .models.new_event import *
from .models.officehours_timeslot import *

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ['id', 'fname','lname','email','gender','birthdate','address','phone_number','password' ,'role','is_coordinator','is_moderator','is_admin','is_active']

        
class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['id','fname','lname','email','gender','profile_img','birthdate','address','phone_number','password','role','is_active','is_admin']
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(PersonSerializer, self).create(validated_data)

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id','fname','lname','email','profile_img','gender','birthdate','address','phone_number','password','graduate','year_of_graduation','is_active','role']
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(StudentSerializer, self).create(validated_data)

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ['id','fname','lname','email','profile_img','password','gender','birthdate','address','phone_number','bio','role','is_active','is_coordinator']
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(StaffSerializer, self).create(validated_data)

class FacultyEmpSerializer(serializers.ModelSerializer):
    class Meta :
        model = FacultyEmp
        fields = ['id','fname','lname','email','profile_img','password','gender','birthdate','address','phone_number','title','role','is_active','is_moderator']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(FacultyEmpSerializer, self).create(validated_data) 

class CourseSerializer(serializers.ModelSerializer):
    class Meta :
        model = Course
        fields = ['id','name','total_grade','stds_grades','instructions','materials','staff_id','category','year','semester']



    def to_representation(self, instance):
        ret = super().to_representation(instance)
        for i in range(len(ret['staff_id'])): 
            ret['staff_id'][i] = (ret['staff_id'][i],instance.staff_id.all()[i].fname + ' ' + instance.staff_id.all()[i].lname)


        return ret

class CourseHistorySerializer(serializers.ModelSerializer):
    class Meta :
        model = CourseHistory
        fields = ['id','year','materials','staff_id','course_id']
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        for i in range(len(ret['staff_id'])): 
            ret['staff_id'][i] = instance.staff_id.all()[i].fname + ' ' + instance.staff_id.all()[i].lname
        return ret

class MaterialfileSerializer(serializers.ModelSerializer):
    class Meta :
        model = MaterialFile
        fields = ['id','course_id','material_upload']


class HallSerializer(serializers.ModelSerializer):
    class Meta :
        model = Hall
        fields = ['id','name']

class LabSerializer(serializers.ModelSerializer):
    class Meta :
        model = Lab
        fields = ['id','name']

class DeviceSerializer(serializers.ModelSerializer):
    class Meta :
        model = Device
        fields = ['id','name']

class ReserveHallSerializer(serializers.ModelSerializer):
    class Meta :
        model = ReserveHall
        fields = ['id','hall_id','staff_id','date','timeslot','is_confirmed']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['hall_id'] = (ret['hall_id'],str(instance.hall_id))
        ret['timeslot'] = (ret['timeslot'],str(instance.timeslot))
        ret['staff_id'] = (ret["staff_id"],str(instance.staff_id))
        return ret
    
class ReserveLabSerializer(serializers.ModelSerializer):
    class Meta :
        model = ReserveLab
        fields = ['id','lab_id','staff_id','date','timeslot','is_confirmed']
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['lab_id'] = (ret['lab_id'],str(instance.lab_id))
        ret['timeslot'] = (ret['timeslot'],str(instance.timeslot))
        ret['staff_id'] = (ret["staff_id"],str(instance.staff_id))
        return ret
    
class ReserveDeviceSerializer(serializers.ModelSerializer):
    class Meta :
        model = ReserveDevice
        fields = ['id','device_id','staff_id','date','timeslot','is_confirmed']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['device_id'] = (ret['device_id'],str(instance.device_id))
        ret['timeslot'] = (ret['timeslot'],str(instance.timeslot))
        ret['staff_id'] = (ret["staff_id"],str(instance.staff_id))
        return ret
    
class NewsSerializer(serializers.ModelSerializer):
    class Meta :
        model = New
        fields = ['id','title','description','picture','category']

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
        

class OfficeHoursSerializer(serializers.ModelSerializer):
    class Meta :
        model = OfficeHours
        fields = ['id','weekday','from_hour','to_hour','staff_id','officehours_type']
        
class LecScheduleSerializer(serializers.ModelSerializer):
    class Meta :
        model = LecSchedule
        fields = ['id','year','semester','schedule_file','category']

class ExamScheduleSerializer(serializers.ModelSerializer):
    class Meta :
        model = ExamSchedule
        fields = ['id','year','semester','exam_file','category']

class AdmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admission
        fields = ['id','title','summary','is_active','category']