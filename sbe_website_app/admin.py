from .models import *
from django.contrib import admin
from django.contrib.auth.hashers import make_password

class PersonAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        if len(obj.password) < 80:
            obj.password = make_password(obj.password) 
        super().save_model(request, obj, form, change)

# Register your models here.
class StaffAdmin(admin.ModelAdmin):
    fieldsets = (
        ["Personal Information",{'fields':["fname","lname","password","email","gender","birthdate","address","phone_number"]}],
    )
    def save_model(self, request, obj, form, change):
        if len(obj.password) < 80:
            obj.password = make_password(obj.password)
        super().save_model(request, obj, form, change)


class StudentAdmin(admin.ModelAdmin):
    fieldsets = (
        ["Personal Information",{'fields':["fname","lname","password","email","gender","birthdate","address","phone_number","graduate","year_of_graduation"]}],
    )
    def save_model(self, request, obj, form, change):
        if len(obj.password) < 80:
            obj.password = make_password(obj.password)
        super().save_model(request, obj, form, change)
        
class FacEmpAdmin(admin.ModelAdmin):
    fieldsets = (
        ["Personal Information",{'fields':["fname","lname","password","email","gender","birthdate","address","phone_number","title"]}],
    )
    def save_model(self, request, obj, form, change):
        if len(obj.password) < 80:
            obj.password = make_password(obj.password)
        super().save_model(request, obj, form, change)
        
admin.site.register(Person,PersonAdmin)  
admin.site.register(Staff,StaffAdmin)
admin.site.register(Student,StudentAdmin)
admin.site.register(FacultyEmp,FacEmpAdmin)
admin.site.register(OfficeHours)
admin.site.register(Course)
admin.site.register(CourseHistory)
admin.site.register(Schedule)
admin.site.register(Hall)
admin.site.register(ReserveHall)
admin.site.register(Lab)
admin.site.register(ReserveLab)
admin.site.register(Device)
admin.site.register(ReserveDevice)
admin.site.register(TimeSlot)
admin.site.register(New)
admin.site.register(Event)





