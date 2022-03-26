from django.contrib import admin
from .models import *
from django.contrib.auth.models import Group


@admin.register(Produit)
class ProduitAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom', 'categorie', 'prix_vente', 'prix_achat', 'date_peremption', 'stock', 'reference')
    list_display_links = ('id', 'nom')
    list_editable = ('stock', 'date_peremption', 'reference')
    list_filter = ('categorie',)

@admin.register(Utilisateur)
class UtilisateurAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'dark_mode')



admin.site.register(Categorie)
admin.site.register(Fournisseur)
admin.site.unregister(Group)