from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import BaseUserManager, PermissionsMixin, AbstractBaseUser
from django.contrib.auth.hashers import make_password
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.core.exceptions import ValidationError

# import email confirmation stuff
from django.core.mail import send_mail
from django.conf import settings
import os


class LecSchedule(models.Model):
    YEAR_CHOICES = (
        ('Year 1', 'Year 1'),
        ('Year 2', 'Year 2'),
        ('Year 3', 'Year 3'),
        ('Year 4', 'Year 4'),
    )
    SEMESTER_CHOICES = (
        ('one', 'One'),
        ('two', 'Two'),
    )
    year = models.CharField( max_length=20,choices=YEAR_CHOICES,blank=True)
    semester = models.CharField(max_length=20,choices=SEMESTER_CHOICES,blank=True)
    schedule_file = models.FileField(upload_to='Lecs_Schedule/')
    
    CATEGORY_CHOICES = (
        ('graduate', 'Graduate'),
        ('undergraduate', 'Undergraduate'),
    )

    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    def __str__(self):
        return os.path.basename(str(self.schedule_file))
    
class ExamSchedule(models.Model):
    YEAR_CHOICES = (
        ('Year 1', 'Year 1'),
        ('Year 2', 'Year 2'),
        ('Year 3', 'Year 3'),
        ('Year 4', 'Year 4'),
    )
    SEMESTER_CHOICES = (
        ('one', 'One'),
        ('two', 'Two'),
    )
    year = models.CharField( max_length=20,choices=YEAR_CHOICES,blank=True)
    semester = models.CharField(max_length=20,choices=SEMESTER_CHOICES,blank=True)
    exam_file = models.FileField(upload_to='Exams_Schedule/')
    
    CATEGORY_CHOICES = (
        ('graduate', 'Graduate'),
        ('undergraduate', 'Undergraduate'),
    )

    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    
    def __str__(self):
        return os.path.basename(str(self.exam_file))
    