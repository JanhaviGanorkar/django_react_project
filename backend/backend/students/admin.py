from django.contrib import admin
from .models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('roll_num', 'name', 'city')  # Display columns in admin panel
    search_fields = ('name', 'city')  # Enable search by name and city
    list_filter = ('city',)  # Add filter by city
