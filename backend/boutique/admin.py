from django.contrib import admin
from .models import *

@admin.register(Produit)
class ProduitAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom', 'categorie', 'prix_vente', 'prix_achat', 'date_peremption', 'stock', 'reference')
    list_display_links = ('id', 'nom')
    list_editable = ('stock', 'date_peremption')
    list_filter = ('categorie',)

admin.site.register(Categorie)
admin.site.register(Fournisseur)