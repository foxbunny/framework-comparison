from django.db import models


class Product(models.Model):
    UNIT_CHOICES = (
        ('l', 'liter'),
        ('kg', 'kg'),
        ('pc', 'piece'),
        ('pair', 'pair'),
    )

    sku = models.CharField(max_length=12, primary_key=True, null=False, blank=False)
    name = models.TextField(null=False, blank=False)
    description = models.TextField(blank=True, null=True)
    unit = models.CharField(max_length=4, choices=UNIT_CHOICES)
    stock = models.PositiveIntegerField(default=0)
    price = models.PositiveIntegerField(default=0)
    updated = models.DateTimeField(auto_now=True)

    def to_dict(self):
        return {
            'sku': self.sku,
            'name': self.name,
            'description': self.description,
            'unit': self.unit,
            'stock': self.stock,
            'price': self.price,
            'updated': self.updated,
        }

    def __str__(self):
        return '{} ({})'.format(self.name, self.sku)

    class Meta:
        ordering = ['-updated']


class ProductHighlight(models.Model):
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    order = models.PositiveIntegerField(unique=True)

    @staticmethod
    def is_full(self):
        return self.objects.count() >= 10

    class Meta:
        ordering = ['order']
