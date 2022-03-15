from django.urls import path
from .views import Write

urlpatterns = [
    path('add-board/', Write.as_view()),
]