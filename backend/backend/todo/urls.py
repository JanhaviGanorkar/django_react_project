from django.urls import path
from .views import TodoViewSet

urlpatterns = [
    # Ab is URL par hit karte hi seedhe saare todos ka data (List) milega!
    path('', TodoViewSet.as_view({'get': 'list', 'post': 'create'})),
    
    # Kisi ek todo ko update ya delete karne ke liye
    path('<int:pk>/', TodoViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
]