from django.urls import path
from .views import student_api, edit_student, StudentDetailView, delete_student

urlpatterns = [
    path('students/', student_api),
    path('students/<int:roll_num>/', edit_student, name="edit-student"),
    path('students/<int:roll_num>/', StudentDetailView.as_view(), name="student-detail"),
    path('students/<int:roll_num>/delete/', delete_student, name='delete_student'),
]
