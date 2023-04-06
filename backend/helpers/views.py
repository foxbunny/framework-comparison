import time
from datetime import datetime
from json import dumps, loads, JSONDecodeError, JSONEncoder

from django import views
from django.core.exceptions import SuspiciousOperation
from django.http import HttpResponse


class CustomEncoder(JSONEncoder):
    def default(self, o):
        try:
            return super().default(o)
        except TypeError:
            if isinstance(o, datetime):
                return int(time.mktime(o.timetuple()) * 1000)
            return o.__dict__


class JSONView(views.generic.base.View):
    def dump_json(self, data):
        return dumps(data, cls=CustomEncoder)

    def get_json_body(self):
        try:
            return loads(self.request.body)
        except JSONDecodeError:
            raise SuspiciousOperation

    def render_to_json(self, data):
        return HttpResponse(self.dump_json(data),
                            content_type='application/json')

    def render_to_response(self, ctx):
        return self.render_to_json(ctx)

    def dispatch(self, *args, **kwargs):
        ctx = super().dispatch(*args, **kwargs)
        return self.render_to_json(ctx)
