from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import BaseUserManager, PermissionsMixin, AbstractBaseUser
from django.contrib.auth.hashers import make_password
from django.db.models.signals import post_save
from django.dispatch import receiver
from .person import *
from django.core.exceptions import ValidationError

# import email confirmation stuff
from django.core.mail import send_mail
from django.conf import settings
import os


class OfficeHours(models.Model):
    TYPE_CHOICES = (
        ('Online', 'Online'),
        ('Offline', 'Offline'),
    )
    WEEKDAYS = [
        ('Monday', "Monday"),
        ('Tuesday', "Tuesday"),
        ('Wednesday', "Wednesday"),
        ('Thursday', "Thursday"),
        ('Friday', "Friday"),
        ('Saturday', "Saturday"),
        ('Sunday', "Sunday"),
    ]
    weekday = models.CharField(
        max_length=20,
        choices=WEEKDAYS,
        null=True
    )
    officehours_type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        null=True
    )
    from_hour = models.TimeField(null=True)
    to_hour = models.TimeField(null=True)
    staff_id = models.ForeignKey(Staff ,on_delete =models.CASCADE)

    class Meta : 
        unique_together =("weekday","from_hour","to_hour","staff_id","officehours_type")

    def __str__(self):
        return f'{self.staff_id} office hours : {self.weekday} , {str(self.from_hour)} to {str(self.to_hour)}' 

        
class TimeSlot(models.Model):
    TIMESLOT_LIST = (
        (0, '08:30 - 10:00 AM'),
        (1, '10:15 - 11:45 AM'),
        (2, '12:15 - 01:45 PM'),
        (3, '02:00 - 03:30 PM'),
        (4, '03:45 - 05:45 PM'),
        (5, '06:00 - 07:30 PM'),
    )
    timeslot = models.IntegerField(choices=TIMESLOT_LIST)

    def __str__(self):
        return str(self.time)

    @property
    def time(self):
        return self.TIMESLOT_LIST[self.timeslot][1]