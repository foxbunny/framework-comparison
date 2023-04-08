from django import db
from django.db.models import Q
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import SuspiciousOperation
from django.forms import models
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.detail import SingleObjectMixin
from django.views.generic.list import MultipleObjectMixin

from helpers.views import JSONView
from .models import Product, ProductHighlight


@method_decorator(csrf_exempt, name='dispatch')
class ProductList(MultipleObjectMixin, LoginRequiredMixin, JSONView):
    model = Product
    http_method_names = ['get', 'post']
    paginate_by = 40
    raise_exception = True

    def get_ordering(self):
        field = self.request.GET.get('order')
        direction = self.request.GET.get('dir', 'asc')
        if field not in Product.VALID_ORDER_FIELDS:
            return
        if direction == 'asc':
            return field,
        return '-' + field,

    def get_queryset(self):
        q = self.request.GET.get('q')
        qs = super().get_queryset()
        if q is None:
            return qs
        return qs.filter(
            Q(sku__startswith=q) |
            Q(name__icontains=q) |
            Q(description__icontains=q)
        )

    def get(self, *args, **kwargs):
        self.object_list = self.get_queryset()
        ctx = self.get_context_data()
        return {
            'data': [x.to_dict() for x in ctx['page_obj'].object_list],
            'page': {
                'current': ctx['page_obj'].number,
                'total': ctx['paginator'].num_pages,
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


@method_decorator(csrf_exempt, name='dispatch')
class ProductDetails(SingleObjectMixin, LoginRequiredMixin, JSONView):
    model = Product
    raise_exception = True

    def get(self, *args, **kwargs):
        return {'data': self.get_object().to_dict()}

    def patch(self, *args, **kwargs):
        product = self.get_object()
        data = self.get_json_body()
        product.from_dict(data)
        try:
            product.full_clean()
            product.save(force_update=True)
        except models.ValidationError:
            raise SuspiciousOperation
        return {'data': product.to_dict()}

    def delete(self, *args, **kwargs):
        self.get_object().delete()
        return {'data': None}


@method_decorator(csrf_exempt, name='dispatch')
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
