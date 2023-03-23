from django import views
from django.core.exceptions import SuspiciousOperation
from django.forms import models

from helpers.views import JSONView

from .models import Product


class ProductList(JSONView, views.generic.list.MultipleObjectMixin):
    model = Product
    http_method_names = ['get', 'post']
    paginate_by = 40

    def get(self, *args, **kwargs):
        self.object_list = self.get_queryset()
        ctx = self.get_context_data()
        return {
            'data': [x.to_dict() for x in ctx['page_obj'].object_list],
            'page': {
                'current': ctx['page_obj'].number,
                'total': ctx['paginator'].count,
            }
        }

    def post(self, *args, **kwargs):
        product_details = self.get_json_body()
        product = Product(**product_details)
        try:
            product.full_clean()
            product.save()
        except models.ValidationError:
            raise SuspiciousOperation
        return {'data': product.to_dict()}
