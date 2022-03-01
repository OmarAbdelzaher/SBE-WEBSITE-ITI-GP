from django.contrib import admin
from .models import *

# Register your models here.
class StaffAdmin(admin.ModelAdmin):
    fieldsets = (
        ["Personal Information",{'fields':["fname","lname","email","gender","birthdate","address","phone_number"]}],
        ["Office Hours",{'fields':["office_hours"]}]
    )

admin.site.register(Staff,StaffAdmin)
admin.site.register(Student)
admin.site.register(OfficeHours)
admin.site.register(FacultyEmp)
admin.site.register(Course)
admin.site.register(Hall)
admin.site.register(ReserveHall)
admin.site.register(Lab)
admin.site.register(ReserveLab)
admin.site.register(Device)
admin.site.register(ReserveDevice)

