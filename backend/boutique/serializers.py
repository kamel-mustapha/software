from rest_framework import serializers
from .models import *

class ProduitSerial(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = ('id', 'nom', 'categorie', 'prix_vente', 'reference', 'quantite')