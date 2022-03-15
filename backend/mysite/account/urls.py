from django.urls import path
from .views import SignInView,SignUpView

urlpatterns = [
    path('sign-in/', SignInView.as_view()),
    path('sign-up/', SignUpView.as_view()),
]