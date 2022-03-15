from django.urls import path
from .views import Addchild,Deletechild

urlpatterns = [
    path('add-child/', Addchild.as_view()),
    path('delete-child/', Deletechild.as_view()),
]