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

    
class New(models.Model):
    title = models.CharField(max_length=100)
    
    description = models.CharField(max_length=1000)

    picture = models.ImageField(upload_to='images', default='images/sbe-white.jpeg' , blank=True, null=True) 
    CATEGORY_CHOICES = (
        ('graduate', 'Graduate'),
        ('undergraduate', 'Undergraduate'),
    )

    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

       
    def __str__(self):
        return self.title

class Event(models.Model):
    name = models.CharField(max_length=100)
    details = models.CharField(max_length=1000)
    picture = models.ImageField(null=True,upload_to='images/',default='images/sbe-white.jpeg' , blank=True) 
       
    def __str__(self):
        return self.name

    