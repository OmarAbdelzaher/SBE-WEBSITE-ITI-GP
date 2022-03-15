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


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email,**extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_staffuser(self, email, password=None,**extra_fields):
        """
        Creates and saves a staff user with the given email and password.
        """

        user = self.create_user(
            email,
            password=password,  
            **extra_fields
        )
        user.is_staff = True
        user.save()
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(

            email,
            password=password,
            **extra_fields
        )
        user.is_active = True
        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True 
        user.is_active = True 

        user.save()
        return user

# Create your models here.
class Person(AbstractBaseUser,PermissionsMixin):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    ROLES_CHOICES = (
        ('student', 'student'),
        ('dr', 'dr'),
        ('ta', 'ta'),
        ('employee','employee')
    )

    fname = models.CharField(max_length=50)
    lname = models.CharField(max_length=50)
    email = models.EmailField(max_length=255, unique=True)
    
    profile_img = models.ImageField(null=True, upload_to='images', blank=True, default='images/user.png') 
    birthdate = models.DateField(null=True)
    address = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    role = models.CharField(max_length=100, choices=ROLES_CHOICES)


    phone_regex = RegexValidator(regex=r'^01[0125][0-9]{8}$', message="Phone number must be 11 digits")
    phone_number = models.CharField(validators=[phone_regex], max_length=17) # validators should be a list
    
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False) 
    is_admin = models.BooleanField(default=False) 
    is_superuser = models.BooleanField(default=False)
    is_coordinator = models.BooleanField(default=False)
    is_moderator = models.BooleanField(default=False)
    is_activated = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['fname','lname']

    objects = UserAccountManager()
        
    def __str__(self):
        return  f'{self.fname} {self.lname}'


@receiver(post_save, sender=Person)
def send_activation_email(sender, instance, created, **kwargs):
    if not instance.is_activated:
        if instance.is_active:
            try:
                send_mail("Activation Done",
                        "hello " +instance.fname+ " , Your account has been activated",
                        'settings.EMAIL_HOST_USER',[instance.email] ,fail_silently=False,)
                
                instance.is_activated = True
                instance.save()
            except Exception :
                raise ValidationError("Couldn't send the message to the email ! ")
    else:
        print("already activated")
    
class Student(Person,models.Model):
    GRADE_CHOICES = (
        ('graduate', 'graduate'),
        ('undergraduate', 'undergraduate'),
    )
    
    graduate = models.CharField(max_length=20, choices=GRADE_CHOICES)
    year_of_graduation = models.IntegerField()


class Staff(Person,models.Model):
    POS_CHOICES = (
        ('Dr', 'Dr'),
        ('TA', 'TA'),
    )
    position = models.CharField(max_length=10, choices=POS_CHOICES)
    bio = models.TextField(blank=True , max_length=500)

        
    def __str__(self):
        return self.fname + ' ' + self.lname


class FacultyEmp(Person,models.Model):
    title = models.CharField(max_length=20,null=False)
    # is_moderator = models.BooleanField(default=False,null=True)
    
    def __str__(self):
        return f'{self.fname} {self.lname}'