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



    
class Admission(models.Model):
    CATEGORY_CHOICES = (
        ('graduate', 'Graduate'),
        ('undergraduate', 'Undergraduate'),
    )
    title = models.CharField(max_length=255)
    description = models.TextField(max_length=1000,blank=True)
    instructions = models.TextField(max_length=1000,blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    
    def __str__(self):
        return self.title