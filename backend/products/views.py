from django import db
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import SuspiciousOperation
from django.forms import models
from django.views.generic.detail import SingleObjectMixin
from django.views.generic.list import MultipleObjectMixin

from helpers.views import JSONView

from .models import Product, ProductHighlight


class ProductList(MultipleObjectMixin, LoginRequiredMixin, JSONView):
    model = Product
    http_method_names = ['get', 'post']
    paginate_by = 40
    raise_exception = True

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


class ProductDetails(SingleObjectMixin, LoginRequiredMixin, JSONView):
    model = Product
    raise_exception = True

    def get(self, *args, **kwargs):
        return {'data': self.get_object().to_dict()}

    def patch(self, *args, **kwargs):
        product = self.get_object()
        data = self.get_json_body()
        for k, v in data.items():
            if k in ['pk', 'id']:
                continue
            setattr(product, k, v)
        try:
            product.full_clean()
            product.save(force_update=True)
        except models.ValidationError:
            raise SuspiciousOperation
        return {'data': product.to_dict()}

    def delete(self, *args, **kwargs):
        self.get_object().delete()
        return {'data': None}


class ProductHighlightList(MultipleObjectMixin, LoginRequiredMixin, JSONView):
    model = ProductHighlight
    raise_exception = True

    def get(self, *args, **kwargs):
        return {'data': [x.to_dict() for x in self.get_queryset()]}

    def put(self, *args, **kwargs):
        data = self.get_json_body().get('data', []) or []
        with db.transaction.atomic():
            self.model.objects.all().delete()
            if len(data):
                highlights = []
                for h in data:
                    highlights.append(self.model(
                        product_id=h['product_id'],
                        order=h['order']
                    ))
                try:
                    self.model.objects.bulk_create(highlights)
                except (models.ValidationError, KeyError, ValueError, db.utils.IntegrityError):
                    raise SuspiciousOperation
        return self.get(*args, **kwargs)
