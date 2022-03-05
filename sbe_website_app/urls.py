from django.urls import path 
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('students/', views.StudentList.as_view()),
    path('staff/', views.StaffList.as_view()),
    path('facultyemps/', views.FacultyEmpList.as_view()),
    path('courses/', views.CourseList.as_view()),
    path('halls/', views.HallList.as_view()),
    path('devices/', views.DeviceList.as_view()),
    path('labs/', views.LabList.as_view()),
    path('reservedhalls/', views.ReserveHallList.as_view()),
    path('reserveddevices/', views.ReserveDeviceList.as_view()),
    path('reservedlabs/', views.ReserveLabList.as_view()),
    path('student/<int:pk>', views.StudentDetails.as_view()),
    path('onestaff/<int:pk>', views.StaffDetails.as_view()),
    path('facultyemp/<int:pk>', views.FacultyEmpDetails.as_view()),
    path('course/<int:pk>', views.CourseDetails.as_view()),
    path('hall/<int:id>', views.HallDetails.as_view()),
    path('device/<int:id>', views.DeviceList.as_view()),
    path('lab/<int:id>', views.LabDetails.as_view()),
    path('reservedhall/<int:id>', views.ReserveHallDetails.as_view()),
    path('reserveddevice/<int:id>', views.ReserveDeviceDetails.as_view()),
    path('reservedlab/<int:id>', views.ReserveLabDetails.as_view()),
    path('news/', views.News.as_view()),
    path('news/<int:pk>', views.NewDetails.as_view()),
    path('events/', views.Events.as_view()),
    path('event/<int:pk>', views.EventsDetails.as_view()),
    path('timeslots/', views.TimeSlotsView.as_view()),
    path('newsgraduate/', views.NewsGraduateView.as_view()),
    path('newsundergraduate/', views.NewsUnderGraduateView.as_view()),
    path('coursegraduate/', views.CourseGraduateView.as_view()),
    path('courseungraduate/', views.CourseUngraduateView.as_view()),




]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)