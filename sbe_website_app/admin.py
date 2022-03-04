from django.contrib import admin
from .models import *

# Register your models here.
class StaffAdmin(admin.ModelAdmin):
    fieldsets = (
        ["Personal Information",{'fields':["fname","lname","password","email","gender","birthdate","address","phone_number"]}],
        ["Office Hours",{'fields':["office_hours"]}]
    )

class StudentAdmin(admin.ModelAdmin):
    fieldsets = (
        ["Personal Information",{'fields':["fname","lname","password","email","gender","birthdate","address","phone_number","graduate","year_of_graduation"]}],
    )

class FacEmpAdmin(admin.ModelAdmin):
    fieldsets = (
        ["Personal Information",{'fields':["fname","lname","password","email","gender","birthdate","address","phone_number","title"]}],
    )
    
admin.site.register(Person)  
admin.site.register(Staff,StaffAdmin)
admin.site.register(Student,StudentAdmin)
admin.site.register(OfficeHours)
admin.site.register(FacultyEmp,FacEmpAdmin)
admin.site.register(Course)
admin.site.register(Hall)
admin.site.register(ReserveHall)
admin.site.register(Lab)
admin.site.register(ReserveLab)
admin.site.register(Device)
admin.site.register(ReserveDevice)
admin.site.register(New)
admin.site.register(Event)


