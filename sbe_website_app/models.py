from django.db import models, IntegrityError
from django.core.validators import RegexValidator
from django.db.models import Q, Func
from django.contrib.postgres.constraints import ExclusionConstraint
from django.contrib.postgres.fields import DateTimeRangeField, RangeOperators, RangeBoundary
from django.contrib.auth.models import BaseUserManager, PermissionsMixin, AbstractBaseUser

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email,**extra_fields)

        user.set_password(password)
        user.save()
        return user
    
    def create_staffuser(self, email, password,**extra_fields):
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
    
    def create_superuser(self, email, password, **extra_fields):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
            **extra_fields
        )
        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True 
        user.save()
        return user
    
# Create your models here.
class Person(AbstractBaseUser,PermissionsMixin):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    fname = models.CharField(max_length=50)
    lname = models.CharField(max_length=50)
    email = models.EmailField(max_length=255, unique=True)
    
    birthdate = models.DateField(null=True)
    address = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)

    phone_regex = RegexValidator(regex=r'^01[0125][0-9]{8}$', message="Phone number must be 11 digits")
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True) # validators should be a list
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False) # a admin user; non super-user
    is_admin = models.BooleanField(default=False) # a superuser
    is_superuser = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['fname','lname']

    objects = UserAccountManager()
        
    def __str__(self):
        return self.fname + ' ' + self.lname

    
class Student(Person,models.Model):
    GRADE_CHOICES = (
        ('graduate', 'Graduate'),
        ('undergraduate', 'Undergraduate'),
    )
    
    graduate = models.CharField(max_length=20, choices=GRADE_CHOICES)
    year_of_graduation = models.IntegerField()
    
class OfficeHours(models.Model):
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
        unique=True,
        null=True
    )
    from_hour = models.TimeField(null=True)
    to_hour = models.TimeField(null=True)
    
    def __str__(self):
        return self.weekday + ' ' + str(self.from_hour) + ' ' + 'to' + ' ' + str(self.to_hour)

class Staff(Person,models.Model):
    POS_CHOICES = (
        ('Dr', 'Dr'),
        ('TA', 'TA'),
    )
    position = models.CharField(max_length=10, choices=POS_CHOICES)
    office_hours = models.ManyToManyField(OfficeHours)
    def __str__(self):
        return self.fname + ' ' + self.lname
    

class FacultyEmp(Person,models.Model):
    title = models.CharField(max_length=20,null=False)
    
    def __str__(self):
        return self.fname + ' ' + self.lname
    
class Course(models.Model):
    name = models.CharField(max_length=20)
    total_grade = models.IntegerField()
    stds_grades = models.FileField(upload_to='student_grades/')
    schedule = models.FileField(upload_to='courses_schedules/')
    instructions = models.TextField(max_length=255)
    materials = models.CharField(max_length=100)
    staff_id = models.ManyToManyField(Staff)
    
    def __str__(self):
        return self.name
    
class Hall(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class New(models.Model):
    name = models.CharField(max_length=20)
    
    description = models.CharField(max_length=100)

    picture = models.ImageField(null=True,upload_to='images/') 
       
    def __str__(self):
        return self.name
    

    
class TsTzRange(Func):
    function = 'TSTZRANGE'
    output_field = DateTimeRangeField()
    
class ReserveHall(models.Model):
    hall_id = models.ForeignKey(Hall, on_delete=models.CASCADE)
    staff_id = models.ForeignKey(Staff, on_delete=models.CASCADE)

    start = models.DateTimeField()
    end = models.DateTimeField()
    cancelled = models.BooleanField(default=False)

    class Meta:
        constraints = [
            ExclusionConstraint(
                name='exclude_overlapping_reservations_hall',
                expressions=(
                    (TsTzRange('start', 'end', RangeBoundary()), RangeOperators.OVERLAPS),
                    ('hall_id', RangeOperators.EQUAL),
                ),
                condition=Q(cancelled=False),
            )
        ]
    
    def __str__(self):
        return str(self.hall_id)+ ' ' + 'reserved by' + ' ' + str(self.staff_id)
    
class Lab(models.Model):
    name = models.CharField(max_length=20)
    
    def __str__(self):
        return self.name
    
class ReserveLab(models.Model):
    lab_id = models.ForeignKey(Lab, on_delete=models.CASCADE)
    staff_id = models.ForeignKey(Staff, on_delete=models.CASCADE)
    
    start = models.DateTimeField()
    end = models.DateTimeField()
    cancelled = models.BooleanField(default=False)

    class Meta:
        constraints = [
            ExclusionConstraint(
                name='exclude_overlapping_reservations_lab',
                expressions=(
                    (TsTzRange('start', 'end', RangeBoundary()), RangeOperators.OVERLAPS),
                    ('lab_id', RangeOperators.EQUAL),
                ),
                condition=Q(cancelled=False),
            )
        ]
    
    def __str__(self):
        return str(self.lab_id)+ ' ' + 'reserved by' + ' ' + str(self.staff_id)
    
class Device(models.Model):
    name = models.CharField(max_length=20)
    
    def __str__(self):
        return self.name
    
class ReserveDevice(models.Model):
    device_id = models.ForeignKey(Device, on_delete=models.CASCADE)
    staff_id = models.ForeignKey(Staff, on_delete=models.CASCADE)
    
    start = models.DateTimeField()
    end = models.DateTimeField()
    cancelled = models.BooleanField(default=False)

    class Meta:
        constraints = [
            ExclusionConstraint(
                name='exclude_overlapping_reservations_device',
                expressions=(
                    (TsTzRange('start', 'end', RangeBoundary()), RangeOperators.OVERLAPS),
                    ('device_id', RangeOperators.EQUAL),
                ),
                condition=Q(cancelled=False),
            )
        ]
    
    def __str__(self):
        return str(self.device_id)+ ' ' + 'reserved by' + ' ' + str(self.staff_id)


class Event(models.Model):
    name = models.CharField(max_length=20)
    
    details = models.CharField(max_length=100)

    picture = models.ImageField(null=True,upload_to='images/') 
       
    def __str__(self):
        return self.name