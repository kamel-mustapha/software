from django.db import models


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
    code_barre = models.CharField(unique=True, max_length=250, blank=True, null=True)
    stock = models.FloatField(blank=True, null=True)
    reference = models.CharField(unique=True ,max_length=250, blank=True, null=True)
    fournisseur = models.ForeignKey(Fournisseur, on_delete=models.CASCADE, blank=True, null=True)

    @property
    def quantite(self):
        return 1