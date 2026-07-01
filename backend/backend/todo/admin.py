from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import Todo # Apne Todo model ko import kiya

# Model ko admin site me register karein
admin.site.register(Todo)