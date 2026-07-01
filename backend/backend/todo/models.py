from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User # Agar users ko alag-alag tasks dikhane hain

class Todo(models.Model):
    # PRIORITY CHOICES (Task kitna zaroori hai)
    PRIORITY_CHOICES = [
        ('L', 'Low'),
        ('M', 'Medium'),
        ('H', 'High'),
    ]

    # 1. User: Har user ko sirf uski apni todo list dikhegi (Optional par zaroori)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    
    # 2. Title: Task ka naam ya heading
    title = models.CharField(max_length=200)
    
    # 3. Description: Task ki poori detail (agar kuch likhna ho)
    description = models.TextField(null=True, blank=True)
    
    # 4. Completed: Task poora hua ya nahi (Default: False)
    is_completed = models.BooleanField(default=False)
    
    # 5. Priority: Task kitna important hai
    priority = models.CharField(max_length=1, choices=PRIORITY_CHOICES, default='M')
    
    # 6. Timestamps: Kab bana aur kab update hua
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        # Naye tasks list me sabse upar dikhenge
        ordering = ['is_completed', '-created_at']