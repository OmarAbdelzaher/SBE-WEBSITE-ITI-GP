from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import BaseUserManager, PermissionsMixin, AbstractBaseUser
from django.contrib.auth.hashers import make_password
from django.db.models.signals import post_save
from django.dispatch import receiver
from .person import *
from sbe_website_app.models.officehours_timeslot import *
from django.core.exceptions import ValidationError

# import email confirmation stuff
from django.core.mail import send_mail
from django.conf import settings
import os




class Device(models.Model):
    name = models.CharField(max_length=20,unique=True)
    
    def __str__(self):
        return self.name
    
class ReserveDevice(models.Model):
    device_id = models.ForeignKey(Device, on_delete=models.CASCADE)
    staff_id = models.ForeignKey(Staff, on_delete=models.CASCADE)
    date = models.DateField(null=True)
    timeslot=models.ForeignKey(TimeSlot,on_delete=models.CASCADE)
    is_confirmed = models.BooleanField(default=False,null=True)

    class Meta:
        unique_together = ('device_id','date','timeslot')
        
    def __str__(self):
        return f'{str(self.device_id)} reserved by {str(self.staff_id)}'

