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
    list_display = ('username', )
    exclude = ('is_active', 'is_superuser', 'joined_date', 'last_login', 'groups', 'user_permissions', 'first_name', 'last_name', 'email', 'is_staff', 'date_joined', 'dark_mode', 'langue')


admin.site.register(Categorie)
admin.site.register(Fournisseur)
admin.site.unregister(Group)