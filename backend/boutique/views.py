from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from .models import *
from .serializers import *


class Product(View):
    def get(self, req):
        products = Produit.objects.all()
        produits_serializers = ProduitSerial(products, many=True)
        return JsonResponse(produits_serializers.data, safe=False)



class User(View):
    def get(self, req):
        user = Utilisateur.objects.first()
        user_serializer = UserSerial(user)
        return JsonResponse(user_serializer.data)

    def post(self, req):
        try:
            data = JSONParser().parse(req)
            dark_mode = data.get('dark_mode')
            user = Utilisateur.objects.first()
            user.dark_mode = dark_mode
            user.save()
            print(user.dark_mode)
            return JsonResponse({'message':'ok'})
        except Exception as e:
            print(e)