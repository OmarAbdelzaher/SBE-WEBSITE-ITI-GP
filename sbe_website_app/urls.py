from django.urls import path 
from django.conf import settings
from django.conf.urls.static import static
from .Devices.devicesviews import *
from .Halls.hallsviews import *
from .Labs.labsviews import *
from .Person.personviews import *
from .Courses.coursesviews import *
from .Events.eventsviews import *
from .News.newsviews import *
from .OffHoursandTimeSlots.hoursandslotsviews import *




urlpatterns = [
    path('students/',StudentList.as_view()),
    path('staff/',StaffList.as_view()),
    path('facultyemps/',FacultyEmpList.as_view()),
    path('courses/',CourseList.as_view()),
    path('halls/',HallList.as_view()),
    path('devices/',DeviceList.as_view()),
    path('labs/',LabList.as_view()),
    path('reservedhalls/',ReserveHallList.as_view()),
    path('reserveddevices/',ReserveDeviceList.as_view()),
    path('reservedlabs/',ReserveLabList.as_view()),
    path('student/<int:pk>',StudentDetails.as_view()),
    path('onestaff/<int:pk>',StaffDetails.as_view()),
    path('facultyemp/<int:pk>',FacultyEmpDetails.as_view()),
    path('course/<int:pk>',CourseDetails.as_view()),
    path('hall/<int:id>',HallDetails.as_view()),
    path('device/<int:id>',DeviceList.as_view()),
    path('lab/<int:id>',LabDetails.as_view()),
    path('reservedhall/<int:id>',ReserveHallDetails.as_view()),
    path('reserveddevice/<int:id>',ReserveDeviceDetails.as_view()),
    path('reservedlab/<int:id>',ReserveLabDetails.as_view()),
    path('news/',News.as_view()),
    path('news/<int:pk>',NewDetails.as_view()),
    path('events/',Events.as_view()),
    path('event/<int:pk>',EventsDetails.as_view()),
    path('timeslots/',TimeSlotsView.as_view()),
    path('newsgraduate/',NewsGraduateView.as_view()),
    path('newsundergraduate/',NewsUnderGraduateView.as_view()),
    path('coursegraduate/',CourseGraduateView.as_view()),
    path('courseungraduate/',CourseUngraduateView.as_view()),
    path('courseungraduateyearone/',CourseUngraduateYearOne.as_view()),

    path('courseungraduateyeartwo/',CourseUngraduateYearTwo.as_view()),
    path('courseungraduateyearthree/',CourseUngraduateYearThree.as_view()),
    path('courseungraduateyearfour/',CourseUngraduateYearFour.as_view()),

    path('coursehistory/',CourseHistoryView.as_view()),
    path('coursehistory/<int:pk>',CourseHistoryDetailsView.as_view()),
    
    path('officehours/',OfficeHoursList.as_view()),
    path('officehourdetails/<int:pk>',OfficeHoursDetails.as_view()),




]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)