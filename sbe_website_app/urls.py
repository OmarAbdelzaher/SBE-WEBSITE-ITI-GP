from django.urls import path 
from django.conf import settings
from django.conf.urls.static import static
from .Views.devicesviews import *
from .Views.hallsviews import *
from .Views.labsviews import *
from .Views.personviews import *
from .Views.coursesviews import *
from .Views.eventsviews import *
from .Views.newsviews import *
from .Views.hoursandslotsviews import *
from .Views.schedulesviews import *
from .Views.admissionsview import *




urlpatterns = [
    path('persons/',PersonList.as_view()),
    path('students/', StudentList.as_view()),
    path('staff/', StaffList.as_view()),
    path('facultyemps/', FacultyEmpList.as_view()),
    path('courses/', CourseList.as_view()),
    path('halls/', HallList.as_view()),
    path('devices/', DeviceList.as_view()),
    path('labs/', LabList.as_view()),
    path('reservedhalls/', ReserveHallList.as_view()),
    path('reserveddevices/', ReserveDeviceList.as_view()),
    path('reservedlabs/', ReserveLabList.as_view()),
    path('person/<int:pk>', PersonDetails.as_view()),
    path('student/<int:pk>', StudentDetails.as_view()),
    path('onestaff/<int:pk>', StaffDetails.as_view()),
    path('facultyemp/<int:pk>', FacultyEmpDetails.as_view()),
    path('course/<int:pk>', CourseDetails.as_view()),
    path('hall/<int:pk>', HallDetails.as_view()),
    path('device/<int:pk>', DeviceDetails.as_view()),
    path('lab/<int:pk>', LabDetails.as_view()),
    path('reservedhall/<int:pk>', ReserveHallDetails.as_view()),
    path('reserveddevice/<int:pk>', ReserveDeviceDetails.as_view()),
    path('reservedlab/<int:pk>', ReserveLabDetails.as_view()),
    path('news/', News.as_view()),
    path('news/<int:pk>', NewDetails.as_view()),
    path('events/', Events.as_view()),
    path('event/<int:pk>', EventsDetails.as_view()),
    path('timeslots/', TimeSlotsView.as_view()),
    path('newsgraduate/', NewsGraduateView.as_view()),
    path('newsundergraduate/', NewsUnderGraduateView.as_view()),
    path('coursegraduate/', CourseGraduateView.as_view()),
    path('courseungraduate/', CourseUngraduateView.as_view()),
    path('courseungraduateyearone/', CourseUngraduateYearOne.as_view()),

    path('courseungraduateyeartwo/', CourseUngraduateYearTwo.as_view()),
    path('courseungraduateyearthree/', CourseUngraduateYearThree.as_view()),
    path('courseungraduateyearfour/', CourseUngraduateYearFour.as_view()),
    path('officehours/',OfficeHoursList.as_view()),
    path('officehourdetails/<int:pk>',OfficeHoursDetails.as_view()),

    path('coursehistory/',CourseHistoryView.as_view()),
    path('coursehistory/<int:pk>',CourseHistoryDetailsView.as_view()),
    path('download/<int:pk>/<str:type>',DownloadPDF, name='download_pdf'),
    
    path('uploadmaterials/',MaterialfileView.as_view()),
    path('uploadmaterial/<int:pk>',MaterialfileDetailsView.as_view()),
    
    path('lecschedules/',LecSchedulesList.as_view()),
    path('lecschedulesundergraduate/',LecSchedulesUnderGraduate.as_view()),
    path('lecschedulesgraduate/',LecSchedulesGraduate.as_view()),
    path('lecschedule/<int:pk>',LecSchedulesDetails.as_view()),
    path('examschedules/',ExamSchedulesList.as_view()),
    path('examschedulesgraduate/',ExamSchedulesGraduate.as_view()),
    path('examschedulesundergraduate/',ExamSchedulesUnderGraduate.as_view()),
    path('examschedule/<int:pk>',ExamSchedulesDetails.as_view()),
    path('download-exam-lec/<str:year>/<str:type>',DownloadPDFSchedules, name='download_pdf'),

]
urlpatterns+= static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)
