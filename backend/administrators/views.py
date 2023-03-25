from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import SuspiciousOperation, PermissionDenied

from helpers.views import JSONView


class Sessions(JSONView):
    http_method_names = ['post', 'delete']

    def post(self, *args, **kwargs):
        try:
            data = self.get_json_body()['data']
            username = data['username']
            password = data['password']
        except KeyError:
            raise SuspiciousOperation
        user = authenticate(username=username, password=password)
        if user is not None:
            login(self.request, user)
            return {'data': 'ok'}
        else:
            raise PermissionDenied

    def delete(self, *args, **kwargs):
        logout(self.request)
        return {'data': 'ok'}
