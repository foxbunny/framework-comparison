from django.contrib import admin
from django import forms
from .models import Product, ProductHighlight


class ProductAdminForm(forms.ModelForm):
    name = forms.CharField()

    class Meta:
        model = Product
        exclude = []


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm


@admin.register(ProductHighlight)
class ProductHighlightAdmin(admin.ModelAdmin):
    pass
