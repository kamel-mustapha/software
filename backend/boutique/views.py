from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse, JsonResponse
from .models import *
from .serializers import *


class Product(View):
    def get(self, req):
        products = Produit.objects.all()
        produits_serializers = ProduitSerial(products, many=True)
        return JsonResponse(produits_serializers.data, safe=False)