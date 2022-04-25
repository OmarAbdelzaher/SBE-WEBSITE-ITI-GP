from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import BaseUserManager, PermissionsMixin, AbstractBaseUser
from django.contrib.auth.hashers import make_password
from django.db.models.signals import post_save
from django.dispatch import receiver
from .person import *
from django.core.exceptions import ValidationError
import datetime
from django.utils.translation import gettext as _

# import email confirmation stuff
from django.core.mail import send_mail
from django.conf import settings
import os


class Course(models.Model):
    YEAR_CHOICES = (
        ('Year 1', 'Year 1'),
        ('Year 2', 'Year 2'),
        ('Year 3', 'Year 3'),
        ('Year 4', 'Year 4'),

    )
    name = models.CharField(max_length=50)
    total_grade = models.IntegerField()
    code = models.CharField(max_length=100,unique=True)


    stds_grades = models.FileField(upload_to='student_grades/',null=True,blank=True)

    instructions = models.TextField(max_length=1000)
    materials = models.CharField(max_length=1000,blank=True)
    year = models.CharField( max_length=20,choices=YEAR_CHOICES ,blank=True)
    SEMESTER_CHOICES = (
        ('one', 'One'),
        ('two', 'Two'),
    )

    semester = models.CharField(max_length=20,choices=SEMESTER_CHOICES,blank=True)
    
    staff_id = models.ManyToManyField(Staff)
    CATEGORY_CHOICES = (
        ('graduate', 'Graduate'),
        ('undergraduate', 'Undergraduate'),
    )

    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    
    def __str__(self):
        return self.name


class MaterialFile(models.Model):
    course_id = models.ForeignKey(Course,on_delete=models.CASCADE)
    material_upload = models.FileField(upload_to='student_material/')

    def __str__(self):
        return f'Material for {str(self.course_id)} course'

class CourseHistory(models.Model):
    year = models.IntegerField()
    materials = models.CharField(max_length=500)
    
    staff_id = models.ManyToManyField(Staff)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.course_id)
    
class GraduateCourse(models.Model):
   
    name = models.CharField(max_length=50)
    total_grade = models.IntegerField()
    code = models.CharField(max_length=100,unique=True)


    stds_grades = models.FileField(upload_to='student_grades/',null=True,blank=True)

    instructions = models.TextField(max_length=1000)
    materials = models.CharField(max_length=1000,blank=True)
    
    staff_id = models.ManyToManyField(Staff)
 
    YEAR_CHOICES = []
    for r in range(1980, (datetime.datetime.now().year+1)):
        YEAR_CHOICES.append((r,r))

    year = models.IntegerField(_('year'), choices=YEAR_CHOICES, default=datetime.datetime.now().year)

    def __str__(self):
        return self.name

class MaterialFileGrad(models.Model):
    course_id = models.ForeignKey(GraduateCourse,on_delete=models.CASCADE)
    material_upload = models.FileField(upload_to='student_material/')

    def __str__(self):
        return f'Material for {str(self.course_id)} course'

class CourseHistoryGrad(models.Model):
    year = models.IntegerField()
    materials = models.CharField(max_length=500)
    
    staff_id = models.ManyToManyField(Staff)
    course_id = models.ForeignKey(GraduateCourse, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.course_id)