from django.urls import path
from .views import *

urlpatterns = [
    path('', index),
    path('activate/', activation),
    path('server/', check_server)
]