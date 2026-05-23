from django.urls import path
from .views import activity

urlpatterns = [
    path("activity/<str:username>/", activity), #ao acessar a url, execute a função activity
]