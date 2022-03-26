from django.db import models
from boutique.common import replace_phrase
from django.contrib.auth.models import AbstractUser


class Categorie(models.Model):
    nom = models.CharField(max_length=250)
    def __str__(self):
        return self.nom

class Fournisseur(models.Model):
    nom = models.CharField(max_length=250)

class Produit(models.Model):
    nom = models.CharField(max_length=250)
    categorie = models.ForeignKey(Categorie, on_delete=models.SET_NULL, blank=True, null=True)
    prix_vente = models.FloatField()
    prix_achat = models.FloatField(blank=True, null=True)
    date_peremption = models.DateField(blank=True, null=True)
    code_barre_lower = models.CharField(unique=True, max_length=250, blank=True, null=True, editable=False)
    stock = models.FloatField(blank=True, null=True)
    reference = models.CharField(unique=True ,max_length=250, blank=True, null=True)
    fournisseur = models.ForeignKey(Fournisseur, on_delete=models.CASCADE, blank=True, null=True)
    code_barre = models.CharField(unique=True, max_length=250, blank=True, null=True)

    @property
    def quantite(self):
        return 1

    def save(self, *args, **kwargs):
        if self.code_barre:
            self.code_barre_lower = replace_phrase(self.code_barre)
        else:
            self.code_barre_lower = None
        super().save(*args, **kwargs)



class Utilisateur(AbstractUser):
    langues = (
        ('fr', 'Français'),
        ('ar', 'Arabic')
    )
    dark_mode = models.BooleanField(default=False)
    langue = models.CharField(max_length=10, default='fr', choices=langues)