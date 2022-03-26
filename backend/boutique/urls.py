from django.urls import path, include
from boutique.views import *


urlpatterns = [
    path('products/', Product.as_view()),
    path('user/', User.as_view())
] 
