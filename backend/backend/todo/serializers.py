from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        # 'user' ko chhod kar baaki saare fields rakh rahe hain
        fields = ['id', 'title', 'description', 'priority', 'is_completed', 'created_at', 'updated_at']