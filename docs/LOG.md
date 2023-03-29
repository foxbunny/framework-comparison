# Introduction

The framework comparison project is my own learning exercise. Can I learn all
popular frameworks at the same time (or re-learn in case of React), and how does
that compare to vanilla, which is how I prefer to work these days.

## The frameworks

The following frameworks will participate in this comparison:

- Angular
- Astro
- React
- SolidJS
- Svelte (SvelteKit)
- React (NextJS)
- VueJS

Additionally, I will also code the same app using vanilla JS, and a full
progressively enhanced app using Django and vanilla JS.

### Why is framework X not included?

First, there's only one of me. 😂 Secondly, I only included the frameworks I
keep hearing about. If yours wasn't included, it's because I either haven't
heard about it, or haven't *kept* hearing about it. This isn't (necessarily)
a list of "good" frameworks. It's a list of the most popular ones from my
perspective.

## The app

The application is a small product list management app. It's an internal tool
used by an imaginary shop to manage their inventory.

It will have two pages (or "pages" in case of SPAs). It will list products
stored in a SQLite database and served by a REST server.

### Screen 1

The first screen is a typical CRUD interface. It will allow us to:

- View a list of products
- Edit product details
- Add a product
- Delete a product

Additionally, it will allow the user to:

- Search for a particular product or SKU
- Filter products by price range
- Visualize the price distribution using a charting library
- Sort in both direction by price and update date
- Navigate the paginated list

The screen also has a drop target and a modal dialog which allow the user to
create and modify the product highlight list. Products from the main list can be
dropped onto a small drop target on the page. Clicking the drop target opens a
modal dialog that displays the highlighted products, and allows the user to
reorder them using keyboard shortcuts and drag & drop gesture.

### Screen 2

The second screen is a login form. It has the username and password fields.

Authentication system consists of user log-in and log-out. There is no sign-up
feature as this is an internal app. Accounts are created by the super-admin
using hte Django's admin interface.

### Session management

To avoid managing the user session on the client side, we will use a session
cookie, a feature that comes with Django out of the box.

### Styling

Although we won't go overboard with styling, we will add some basic styling as
well as the styling necessary to provide the necessary UI cues. We will apply
the rule of least power, and will not implement in JavaScript things that can be
done in CSS. In cases where JavaScript needs to provide information about
styling, we will do that using CSS custom properties set through the element's
style attribute/property.

### Device support

The application is desktop-only.

## Judging the framework performance

We will judge the framework performance according to the following criteria:

- The amount of code written by the developer
- The amount of non-coding work required of the developer
- The bundle size
- Lighthouse metrics
- Build time
- Code maintenance:
  - Number of dependencies
  - Ability to make changes to different parts without affecting other parts
  - Ability to develop separate parts of the application in parallel
  - Ability to scaffold the interfaces first, and fill in the blanks later
- Flexibility:
  - Ability to swap out different parts of the framework and granularity thereof
  - Ability to accommodate foreign code and methods

## Ground rules

We will adhere to the following rules:

- We always do things with the least amount of work (code written) possible
- We do not resort to using additional 3rd party libraries except for
  visualization
- To the best of our ability, we will adhere to the practices recommended by the
  official documentation.
- If the official recommendation will put the framework at a disadvantage in any
  way, we will explore our options and use the most optimal method we can come
  up with.

## Workflow

We will first develop the Django backend, and also the progressively enhanced
app. Then we'll develop apps in each of the frameworks (plus vanilla) in
alphabetical order starting with Astro, and ending with VueJS.

We will adhere to the following workflow:

- Plan the UI structure
- Plan the state management strategy
- Create the basic page structure in HTML (or view)
- Add interaction
- Add styling

For content-oriented web pages, we would do the last two in the reverse order,
but for app-like pages, I prefer to do them in this order because the more
complex interaction may require additional visual cues.

I will not bother creating designs up-front. I will simply use the final design
of the first app (the Angular one) as the basis for other apps, and otherwise
design on the fly using CSS.

# Day 1: Scaffolding the projects

We scaffold projects using the framework's documented method. If given a choice,
we scaffold without test tools, and we always opt into using a router, plain
CSS, TypeScript, and ESLint, but not Prettier. For everything else, we go with
the defaults.

For all projects, we use `npm` as that is the first documented package manager
in most frameworks' documentation.

### Angular

Angular provides a script for scaffolding new projects. It is tightly coupled
with TypeScript, so we are given no other option during scaffolding.

```shell
npm init @angular angular
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? CSS
```

The project is created with the source code in `src/`, with dependencies
installed, and with integration for EditorConfig, TypeScript, and VSCode.

### Astro

Astro provides a scaffolding script. It has an option to use TypeScript, and
unlike other frameworks it gives us an option to specify the desired strictness.
We will go with strict, though, which is the same as the defaults for other
frameworks. It also provides an option to select different types of templates,
including a blog template.

```shell
npm create astro@latest astro
 astro   v2.1.5 Launch sequence initiated.
  tmpl   How would you like to start your new project?
         Include sample files
  deps   Install dependencies?
         Yes
    ts   Do you plan to write TypeScript?
         Yes
   use   How strict should TypeScript be?
         Strict
   git   Initialize a new git repository?
         No
```

The scaffolded project comes with Astro and TypeScript configuration.

### React (Next.js)

React does not offer itself as a stand-alone framework anymore, but instead
delegates to one of the more fully-featured ones like Next.js, Remix, Gatsby,
and openly recommends going that route. In this comparison, we will use Next. js
as it is the most popular choice. The scaffolding script offered by Next gives
us a choice of including TypeScript integration, as well as ESLint. It gives us
an option to use the experimental `app` directory, which gives us features
different than the default set-up, but we opted out of it as that's the default.

```shell
npx create-next-app react
√ Would you like to use TypeScript with this project? ... Yes
√ Would you like to use ESLint with this project? ... Yes
√ Would you like to use `src/` directory with this project? ... No
√ Would you like to use experimental `app/` directory with this project? ... No
√ What import alias would you like configured? ... @/*
```

The Next app is scaffolded with Next configuration and TypeScript configuration.

### SolidJS

SolidJS does not have an app for scaffolding the project. It, instead, uses
[degit](https://github.com/Rich-Harris/degit).

```shell
npx degit solidjs/templates/ts solidjs
cd solidjs
npm install
```

The project directory is created with TypeScript and Vite configuration files.

### Svelte (SvelteKit)

Like React, Svelte recommends using SvelteKit, a fully-featured framework
developed by the Svelte developers. The scaffolding script offered by SvelteKit
gives us an option to use TypeScript, and several additional options like using
ESLint (selected), Prettier and testing frameworks. It also provides several
templates. We went with the default one, which is the demo app.

```shell
npm create svelte@latest svelte
<  Which Svelte app template?
|  SvelteKit demo app
<  Add type checking with TypeScript?
|  Yes, using TypeScript syntax
<  Select additional options (use arrow keys/space bar)
|  Add ESlint for code linting
```

The project is scaffolded noticeably more quickly than the other frameworks
(except SolidJS which uses degit). The notable files that are included by
default are ESLint, Svelte, Vite and TypeScript config files.

### Vanilla

Vanilla JS does not have (or need) any scaffolding. We merely create a set of
three files (I will probably add more later), and we use the stock browser
technologies (plain HTML, plain CSS, plain JavaScript). We also do not use any
routing, and instead will rely on file names for that.

The naming convention for files is as follows:

- `index.*` is always the root of hte site
- `*.screen.css` for screen CSS (basically `*.(media target).css`)
- `*.client.js` for JavaScript files (if I ever upgrade to a SSR setup, I might
  also have `*.server.js` modules)

```shell
mkdir vanilla
touch vanilla/index.html
touch vanilla/index.screen.css
touch vanilla/index.client.js
```

Edit `index.html`

Add the basic HTML5 skeleton:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Product List</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" media="screen" href="index.screen.css">
    <script defer src="index.client.js"></script>
  </head>
  <body>
    <h1>Product List</h1>
  </body>
</html>
```

Edit `index.client.js` and make it an empty block.

```javascript
{
  'use strict'

}
```

Edit CSS to include (for now) a simple reset:

```css
*
{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

label, button
{
  cursor: pointer;
}

button, input, textarea, select
{
  font: inherit;
}

h1, h2, h3, h4, h5, h6
{
  font-weight: normal;
  font-size: inherit;
}
```

### VueJS

```shell
npm init vue@latest vuejs
√ Add TypeScript? ... Yes
√ Add JSX Support? ... No
√ Add Vue Router for Single Page Application development? ... Yes
√ Add Pinia for state management? ... No
√ Add Vitest for Unit Testing? ... No
√ Add an End-to-End Testing Solution? » No
√ Add ESLint for code quality? ... Yes
√ Add Prettier for code formatting? ... No
```

VueJS project scaffolds with VSCode, TypeScript, and ESLint integration. It also
includes Vite configuration.

# Day 2: The backend

We go through the usual routine of setting up a Django project in the `backend`
directory.

```shell
python -m venv venv
venv\Scripts\activate # Windows, cmd.exe
# or source venv/bin/activate in bash/zsh
pip install django
pip freeze > requirements.txt
django-admin startproject product_list .
```

By default, Django is configured to use a SQLite database, which is perfectly
fine for this project.

We create an app called `products`

```shell
(venv) python manage.py startapp products
```

We add the app to the list of installed apps in `settings.py`:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    # ....
    'products.apps.ProductsConfig',
]
```

First we'll take care of the `Product` model. In the `products/model.py` I 
write this bit of OOP loveliness:

```python
class Product(models.Model):
    UNIT_CHOICES = (
        ('l', 'liter'),
        ('kg', 'kg'),
        ('pc', 'piece'),
        ('pair', 'pair'),
    )

    sku = models.CharField(max_length=12, primary_key=True)
    name = models.TextField()
    description = models.TextField(blank=True, null=True)
    unit = models.CharField(max_length=4, choices=UNIT_CHOICES)
    stock = models.PositiveIntegerField(default=0)
    price = models.PositiveIntegerField(default=0)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{} ({})'.format(self.name, self.sku)
```

Next we create an run the migrations for this model:

```shell
(venv) python manage.py makemigrations products
(venv) python manage.py migrate
```

Now, this is all already set up for the Django's built-in admin interface, so
we'll create the admin user and check it out.

```shell
(venv) python manage.py createsuperuser
Username (leave blank to use 'foxbunny'): admin
Email address: admin@admin.com
Password:
Password (again):
The password is too similar to the email address.
This password is too short. It must contain at least 8 characters.
This password is too common.
Bypass password validation and create user anyway? [y/N]: y
```

Remember, always use a long secure password. 😋

The admin shows the big textarea control for the `name` field as we've 
declared it a `model.TextField()`. We will fix this in the `products/admin.py`:

```python
from django.contrib import admin
from django import forms
from .models import Product


class ProductAdminForm(forms.ModelForm):
    name = forms.CharField()

    class Meta:
        model = Product
        exclude = []


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm
```

Essentially, we created a custom model form for the admin interface and 
supplied a `forms.CharField()` override for the `name` field. The field now 
looks as it should.

Next, we want to create the `ProdcutHighlight` model. Back in 
`products/models.py` we write start by adding the model and the two fields we 
know we're going to need.

```python
class ProductHighlight(models.Model):
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    order = models.PositiveIntegerField(unique=True)

    class Meta:
        ordering = ['order']
```

The `order` column is marked as `unique`. We also specify that we would like 
the order to be by the `order` column (ascending).

We have a 10-row constraint on this table. We'll make this task a bit easier by
adding a static method that will give us the information we need:

```python
class ProductHighlight(models.Model):
    # ....

    @staticmethod
    def is_full(self):
        return self.objects.count() >= 10
```

This allows the view to say something like `ProductHighlight.is_full()`. 
Time to run the migrations:

```shell
(venv) python manage.py makemigrations products
(venv) python manage.py migrate
```

We'll just register this model with the admin for now and won't customize 
anything. In `products/admin.py` we add:

```python
@admin.register(ProductHighlight)
class ProductHighlightAdmin(admin.ModelAdmin):
    pass
```

Moving on to the views. We'll have (for now) 3 endpoints:

- `/products/` - product list
  - GET - get the products
  - POST - create a new product
- `/products/{id}` - a product
  - GET - get the product details
  - PUT - update the product details
  - DELETE - delete a product
- `/highlights/` - product highlights
  - GET - get all product highlights
  - PUT - update the highlights

We're going to assume that we won't need to be dealing with individual 
highlights. In the UI we always work with the highlights as a list. We use 
the `GET` method to retrieve the list, and we use the `PUT` method to update 
the list.

We've implemented a class-based base view called `JSONView` in the 
`helpers/views.py` to serve as the base view for all endpoints. This will 
probably be an issue later when we start supporting both JSON and HTML 
responses, but we'll worry about it then.

The `JSONView` is a `views.generic.base.View` subclass and is responsible 
for serializing responses and deserializing request bodies. It allows 
verb-specific methods to return a Python dict and takes care of sending an 
appropriate JSON response.

To serialize the JSON, we use a custom JSON encoder class. For now, it 
transforms the `datetime` objects to UNIX timestamps in milliseconds.

```python
import time
from datetime import datetime
from json import JSONEncoder


class CustomEncoder(JSONEncoder):
    def default(self, o):
        try:
            return super().default(o)
        except TypeError:
            if isinstance(o, datetime):
                return int(time.mktime(o.timetuple()) * 1000)
            return o.__dict__
```

The base view implements a `dump_json()` method which provides the default 
way of encoding JSON:

```python
from django import views


class JSONView(views.generic.base.View):
    def dump_json(self, data):
        return dumps(data, cls=CustomEncoder)
```

We also implement a separate `render_to_json()` method which converts the 
JSON string into a response:

```python
from django.http import HttpResponse

class JSONView(views.generic.base.View):
    # ....

    def render_to_json(self, data):
        return HttpResponse(self.dump_json(data),
                            content_type='application/json')
```

This method is invoked from `render_to_response(self, ctx)`. We keep this 
method separate so that, once we start returning HTML as well, we have a 
good place to implement the choice of output format.

```python
class JSONView(views.generic.base.View):
    # ....

    def render_to_response(self, ctx):
        return self.render_to_json(ctx)
```

The final piece is the overload for the `dispatch()` method:

```python
from django.views.decorators.csrf import csrf_exempt


class JSONView(views.generic.base.View):
    # ....

    @csrf_exempt
    def dispatch(self, *args, **kwargs):
        ctx = super().dispatch(*args, **kwargs)
        return self.render_to_json(ctx)
```

The `dispatch()` method is marked as CSRF-exempt for now, so we don't need 
to deal with CSRF client-side. We'll restore CSRF protection later.

Lastly, we provide a method for converting JSON bodies:

```python
from json import loads, JSONDecodeError

from django.core.exceptions import SuspiciousOperation


class JSONView(views.generic.base.View):
    # ....

    def get_json_body(self):
        try:
            return loads(self.request.body)
        except JSONDecodeError:
            raise SuspiciousOperation
```

The `SuspiciousOperation` exception cases Django to return a 
`HttpResponseBadRequest` error.

With the base view in place, we can implement the first view that would 
handle `GET /products/` and `POST /products/` endpoints. In addition to the 
base view, we also use a `view.generic.list.MultipleObjectMixin` which is 
responsible for managing paginated lists of database records.

```python
from django import views

from helpers.views import JSONView

from .models import Product


class ProductList(JSONView, views.generic.list.MultipleObjectMixin):
    model = Product
    http_method_names = ['get', 'post']
    paginate_by = 40
```

We start by specifying the model. This is used by the `MultipleObjectMixin`. We
also specify that we only support GET and POST for this view. The page size 
is (for now) hard-coded to 40 records per page.

We also need to add one more thing to the model, which is a method 
that converts it into a plain dict:

```python
class Product(models.Model):
    # ....
    
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
```

With the correct base views and mixins, we can trivially implement the `get()` 
method:

```python
class ProductList(JSONView, views.generic.list.MultipleObjectMixin):
    # ....

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
```

We use the `get_queryset()` and `get_context_data()` from the 
`MultipleOjbectMixin` to retrieve the records and also take care of the 
pagination. Then we transform this data into the desired output for 
JSON response.

The data has the following layout:

```json
{
  "data": [Product],
  "page": {
    "current": (number),
    "total": (number)
  }
}
```

The `post()` method is relatively straightforward:

```python
from django.core.exceptions import SuspiciousOperation
from django.forms import models

from .models import Product


class ProductList(JSONView, views.generic.list.MultipleObjectMixin):
    # ....
    
    def post(self, *args, **kwargs):
        product_details = self.get_json_body()
        product = Product(**product_details)
        try:
            product.full_clean()
            product.save()
        except models.ValidationError:
            raise SuspiciousOperation
        return {'data': product.to_dict()}
```

We fist grab the decoded JSON body, and we populate the model object. Then 
we validate and save it. If there are validation errors, then we throw a 
`SuspiciousOperation` exception. If all goes well, we return the product 
details including the timestamp.

We then hook the views up using url configuration. In `products/urls.py` 
(created), we add:

```python
from django.urls import path

from .views import ProductList

urlpatterns = [
    path('products/', ProductList.as_view(), name='product_list'),
]
```

Then we include this in the main URL configuration in `product_list/urls.py`:

```python
from django.urls import include

urlpatterns = [
    # ....
    path('', include('products.urls')),
]
```

With all of this in place, we can now test the view. 

NB: If you are using a JetBrains IDE, you can test it using the 
`backend/htto_requests/product_list.http` file.

# Day 3: Backend, continued

Today we're adding the product details view, which handles the `/products/{id}`
endpoint. Thanks to the work we've done yesterday, this is going to be quick.
The view looks pretty much like the product list view, but instead of a 
`MultipleOjbectMixin` we are using the `SingleObjectMixin`.

```python
class ProductDetails(JSONView, views.generic.detail.SingleObjectMixin):
    model = Product
```

The get method is simpler than the product list because this one does not 
involve any pagination.

```python
class ProductDetails(JSONView, views.generic.detail.SingleObjectMixin):
    # ....
    
    def get(self, *args, **kwargs):
        return {'data': self.get_object().to_dict()}
```

The `get_object()` method from the `SingleObjectMixin` will get the 
product id from the URL, so we will need to make sure that the URL has a 
segment named `pk`. (This can be customized, but we don't really need to. 
It's our internal implementation detail not visible to the user.) We'll 
update the model's validation code so that the `sku` field only contains 
letters, numbers, and dashes. This is because it is intended to go into the 
URL. We could technically encode the SKU for use in the URL, but it just 
adds more code, and it's not necessary. Technically, SKU is a completely 
arbitrary identifier, and technically vendors could use characters other 
than the ones we specified, but this is an example app, so we won't go too 
pedantic about these things.

I've changed my mind about the `PUT` verb for this endpoint. Instead, I 
will use `PATCH`. The difference is that `PUT` replaces the data with 
request data, while `PATCH` updates the attributes contained in the request 
data and keeps the rest as is. With `PATCH` we will be able to send requests 
for updating individual fields without sending the whole product. So, the 
`patch()` method looks like this:

```python
class ProductDetails(JSONView, views.generic.detail.SingleObjectMixin):
    # ....
    
    def patch(self, *args, **kwargs):
        product = self.get_object()
        data = self.get_json_body()
        for k, v in data.items():
            setattr(product, k, v)
        try:
            product.full_clean()
            product.save(force_update=True)
        except models.ValidationError:
            raise SuspiciousOperation
        return {'data': product.to_dict()}
```

As with the `get()` method, we are able to call `get_object()` to 
retrieve the product record. We then iterate over the data sent by the 
client and set the matching attributes. This means that if the data only has 
one key, only one attribute is updated. Note that we allow the SKU to be 
updated as well, even though it's the primary key.

As with the `post()` method on the product list, we raise 
`SuspiciousOperation` on validation failure.

Finally, we return the updated record in whole.

The last method we intended to implement on this endpoint is `delete()`:

```python
class ProductDetails(JSONView, views.generic.detail.SingleObjectMixin):
    # ....
    
    def delete(self, *args, **kwargs):
        self.get_context_data()['object'].delete()
        return {'data': None}
```

Out of sheer laziness, and the headache of choosing the correct response 
code, we'll just use `{'data': None}` as the response payload. Data is gone, 
poof! What this does for us is that we can have a single handler on the 
client side that receives the response in `{data: ...}` format, and decides 
whether to remove or update the row based on the value.

Now we can add this view to our `products/urls.py` module:

```python
urlpatterns = [
    # ....
    path('products/<str:pk>', ProductDetails.as_view(), name='product_details'),
]
```

The `backend/http_requests/product_details.http` file contains the HTTP 
requests we used for testing.

After testing, we've discovered that using the SKU as the primary key isn't 
a very good idea if we want to allow the user to edit the SKU. Django will 
either miss the update tyring to update a record with the *updated* SKU 
(which does not yet exists) or it will create a new record and leave the old 
one in place. We can work around this several ways:

1. write some code to remove the existing record completely and save a new one
2. not use SKU as the primary key

The first option does not require dramatic changes to the database, and the 
existing data can be kept as is. The disadvantage is that the cascading 
update cannot be done. We would need to retrieve all related highlights 
first, create a new object with the updated SKU, and then drop the old 
record. And then we would need to point the retrieved highlights to point at 
the new SKU and save them. It sounds quite inefficient compared to simply 
updating the SKU field. In our case, we don't have any data in the database 
yet, and it's not a production database, so we can live with just dropping 
the whole database and redoing the schema from scratch. We'll make the 
following changes to the `Product` model.

We remove the `primary_key=True` option from the `sku` field and replace it 
with `unique=True`:

```python
class Product(models.Model):
    # ....
    sku = models.CharField(max_length=12, unique=True, null=False, blank=False)
    # ....
```

And we also add the `id` key to the dict generated in the `to_dict()` method:

```python
class Product(models.Model):
    # ....
    
    def to_dict(self):
        return {
            'id': self.pk,
            # ....
        }
```

We then "drop" the database by removing the `db.sqlite3` file. We 
also remove all existing migrations in the `products/migrations`. We then 
create and run the new migrations:

```shell
python manage.py makemigrations
python manake.py migrate
```

After this is done, we have a new empty database. We need to create the 
admin user again, as we did before. We make one last twak to the `patch()` 
method in `ProductDetails` view:

```python
class ProductDetails(JSONView, views.generic.detail.SingleObjectMixin):
    # ....
    
    def patch(self, *args, **kwargs):
        # ....
        for k, v in data.items():
            if k in ['pk', 'id']:
                continue
            # ....
        # ....
```

We make sure that `pk` and `id` keys in the request data are ignored.

We test and make sure these changes work as expected.

Next, we're going to work on the product highlights endpoint. This endpoint 
has two verbs, `GET` and `PUT`. The `GET` verb simply retrieves a list of 
highlights in the correct order. The `PUT` will required a bit more work as 
we're replacing the whole table. (Having said that, it's just 10 rows max, 
so not a huge deal.)

As a matter of naming convention, we suffix list-based endpoints with `List`.
So our view class is going to be:

```python
from .models import ProductHighlight


class ProductHighlightList(JSONView, views.generic.list.MultipleObjectMixin):
    model = ProductHighlight
```

The `get()` method simply returns a list of highlights in correct order. 
We'll first add a `to_dict()` method to the model. In `products/models.py` 
we make the following change:

```python
class ProductHighlight(models.Model):
    # ....
    
    def to_dict(self):
        return {
            'id': self.pk,
            'sku': self.product.sku,
            'name': self.product.name,
            'order': self.order,
        }
```

For the `get()` method, we use a simpler logic than in the product list view 
because we do not require any pagination. 

```python
class ProductHighlightList(JSONView, views.generic.list.MultipleObjectMixin):
    # ....

    def get(self, *args, **kwargs):
        return {'data': [x.to_dict() for x in self.get_queryset()]}
```

Now we can focus on the `put()` method. This method receives a list of 
highlights and replaces all existing rows with it. Let's take a look at it.

```python
from django import db


class ProductHighlightList(JSONView, views.generic.list.MultipleObjectMixin):
    # ....
    
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
                except (models.ValidationError, ValueError, db.utils.IntegrityError):
                    raise SuspiciousOperation
        return self.get(*args, **kwargs)
```

We are wrapping delete and bulk create operations in a transaction so that 
they are both rolled back if bulk create fails. This is because, if we are 
unable to cleanly replace the list, we want to keep the previous list of 
highlights rather than end up with an empty one.

If the request payload contains no items, or we receive a null instead of a 
list, we assume that the user wants to delete the list.

# Day 4: Backend, continued

Not a whole lot of time, so today we'll just implement the log-in and 
log-out views as quickly as possible. As before, these are going to be 
`JSONView` subclasses.

We want to use a single endpoint:

- /sessions/
  - POST - create a new session (log in)
  - DELETE - delete the current session (log out)

First we want to create a separate app for it. Lacking a better name, we'll 
use 'administrators'. We don't want to use names like 'auth' because that 
might be confusing given that Django itself has an 'auth' module. We won't 
use 'users' for the same reason.

```shell
(venv) python manage.py startapp administrators
```

Next we will add the new app to the list of installed apps in the 
`product_list/settings.py` module.

```python
INSTALLED_APPS = [
    # ....
    'administrators.apps.AdministratorsConfig',
]
```

We then create the new view class in the `administrators/views.py`:

```python
from helpers.views import JSONView


class Sessions(JSONView):
    http_method_names = ['post', 'delete']
```

We do not need any models as we are simply interacting with the Django's 
built-in authentication API. Django already provides a LoginView, but we 
will not use that as it is a very concrete view and not a lot of opportunity 
for customization. Instead, we will adapt the example code from the 
[documentation](https://docs.djangoproject.com/en/4.1/topics/auth/default/#how-to-log-a-user-in).

```python
from django.contrib.auth import authenticate, login
from django.core.exceptions import SuspiciousOperation, PermissionDenied


class Sessions(JSONView):
    # ....

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
```

If the JSON is malformed in any way, we will raise a `SuspiciousOperation` 
exception to cause Django to respond with 400. If authentication fails, we 
raise the `PermissionDenied` exception, which will result in a 403 response.

Otherwise, we log the user in and respond with `{'data': 'ok'}` payload. 
Users do not really need any information they don't already have, so we are 
not going to invent stuff. A simple 'ok' is fine.

Django has sessions enabled by default. Logging the user using the `login()` 
method will set a session cookie. This means that any requests the user 
makes from this point on will include this cookie.

For the `delete()` method, we will similarly use the example for the 
[documentation](https://docs.djangoproject.com/en/4.1/topics/auth/default/#how-to-log-a-user-out).

```python
from django.contrib.auth import logout


class Sessions(JSONView):
    # ....

    def delete(self, *args, **kwargs):
        logout(self.request)
        return {'data': 'ok'}
```

We can now map this view to a URL. We create a file, `administrators/urls.py`:

```python
from django.urls import path

from .views import Sessions

urlpatterns = [
    path('login/', Sessions.as_view(), name='product_list'),
]
```

We also include this module in the main `product_list/urls.py`.

```python
urlpatterns = [
    # ....
    path('', include('administrators.urls')),
]
```

Now that we have the methods we need, we can test the implementation. The 
`http_requests/sessions.http` contains the requests we use in order to test it.

# Day 5, Backend, finish

The last bit of work we have to do on the backend is to protect the product 
views from unauthorized access. Django already provides the 
`LoginRequiredMixin` for this purpose, so we will use that. In 
`products/views.py`, we make the following changes:

```python
from django.contrib.auth.mixins import LoginRequiredMixin


class ProductList(MultipleObjectMixin, LoginRequiredMixin, JSONView):
    # ....
    raise_exception = True
    # ....


class ProductDetails(SingleObjectMixin, LoginRequiredMixin, JSONView):
    # ....
    raise_exception = True
    # ....


class ProductHighlightList(MultipleObjectMixin, LoginRequiredMixin, JSONView):
    # ....
    raise_exception = True
    # ....
```

Firstly, we fixed a mistake in the ordering of mixins and superclasses in 
the class inheritance chain. I forgot that the superclass goes last, not first.
With the inheritance chain corrected, the `dispatch()` overload in 
`JSONView` should now correctly invoke the `dispatch()` method of the 
`LoginRequiredMixin`.

The `raise_exception` flag instructs the underlying mixin to throw a 
`PermissionDenied` exception instead of redirecting to the login view.

We then test the views to make sure a 403 response is returned when 
requesting these resources without first logging in. Everything checks out, 
so that concludes the minimal implementation of the backend.

# Day 6, Angular

We start by planning our application. The first thing we want to define is 
our domain model. The example app is relatively simple, and it only has two 
entities, a product and a product highlights list.

We create a module that will hold our interfaces. Let's name it "entities" 
and place it into the `src/app` directory.

First, we have a few numeric fields that we know are stored as 
`PositiveIntegerField` in the database. While that's a useful distinction 
for storage purposes, we have to think whether we also need to make the same 
distinction in our model. Sure it is more *accurate*, but pragmatically, do 
we have any operations that are likely to fail if we don't distinguish 
between positive and negative values. Since it does not appear (right now) 
that that would be the case, we will use `number` for fields like `stock` 
and `price`.

We are going to use a separate type for the units. Unit represents a set of 
strings we can use to denote units. This is more likely to be useful in our app.

```typescript
export type Unit = 'kg' | 'l' | 'pc' | 'pair';
```

The interface for the `Product` objects looks like this:

```typescript
export interface Product {
  name: string,
  description: string | null,
  sku: string,
  unit: Unit,
  stock: number,
  price: number,
}
```

Now each product has an `id` field, but not always. We have to decide 
whether we would like to have a nullable `id` field in the `Product` 
interface, or have a subtype that has that field. The latter approach is 
probably closer to the domain model, so we'll go with that for now.

```typescript
export interface SavedProduct extends Product {
  id: number,
}
```

As long as our code is good about using the correct version of `Product`, we 
should be able to catch cases where the code assumes there's an `id` but it 
isn't really there (well, for the most part).

We are not prefixing the interface name with an "I" as that's how it is done 
in the official Angular documentation, and we are wanting to write idiomatic 
code.

Next we'll define an interface for a product highlight item.

```typescript
export interface ProductHighlight {
  id?: number,
  productId: number,
  order: number,
}
```

As with the product, we have a special case of `ProductHighlight` that 
represents a saved version. However, it does not look like we would actually 
benefit from having a separate interface for it. Instead, we opted for an
optional `id` field.

For now, we will not bother creating a separate administrator model, as 
that's only going to be used in the log-in form.

We will proceed to create the products service.

First we edit the `src/app/app.module.ts` and add the `HttpClientModule` 
injector to the list of imports:

```typescript
// ....
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  // ....
  imports: [
    // ....
    HttpClientModule,
    // ....
  ],
```

This will allow us to use the `HttpClient` service in our own service.

Before we go further, we want to pause and decide how we want our service to 
work. We know that the service uses an endpoint that is login-protected. If 
the user isn't authenticated, we will receive a 403 response whatever we do. 
In that case, we want to redirect the user to the login view. The redirect 
is not a concern that we want to handle in this service as it's not part of 
the business logic, but we need some information passed to the service's 
consumer (component) so that it can perform the redirect.

We could create a separate service for handling permission errors. However, 
this will not give the products service an opportunity to store information 
about incomplete requests. Therefore, we will not abstract error handling.

As far as the concrete functionality of the service goes, we need to be able to:

- Get a list of paginated products
- Update a specific saved product
- Create a new product

```shell
npm run ng generate service products

CREATE src/app/products.service.spec.ts (367 bytes)
CREATE src/app/products.service.ts (137 bytes)
```

In the `src/app/products.service.ts` we add the following:

```typescript
// ....
import { HttpClient } from '@angular/common/http'

import { SavedProduct } from './entities'

// ....
export class ProductsService {
  productList: SavedProduct[] = []
  currentPage = 1
  totalPages = 1

  constructor(private httpClient: HttpClient) { }
}
```

We implement the method to fetch the products. This method will update the 
`productList`, `currentPage` and `totalPages` properties using the response 
data, and return a observable that emits the error code. The error code 0 is 
used to indicate no errors. It takes a set of named parameters, which will 
only have a `page` key for now. We will add sorting and filtering to this later,
but that requires changes in the backend.

Before we implement this method, we'll define an interface for the response 
data. In the same module we define:

```typescript
interface ProductListResponse {
  data: Array<SavedProduct>,
  page: {
    current: number,
    total: number,
  },
}
```

We can now implement the method:

```typescript
export class ProductsService {
  // ....
  
  fetchProducts({ page = 1 }) {
    return new Observable<number>(subscriber => {
      this.httpClient.get<ProductListResponse>('http://127.0.0.1:8000/products/', {
        responseType: 'json',
        params: { page },
      })
        .subscribe({
          next: data => {
            this.productList = data.data
            this.currentPage = data.page.current
            this.totalPages = data.page.total
            subscriber.next(0)
            subscriber.complete()
          },
          error: err => {
            subscriber.error(err.status)
            subscriber.complete()
          },
        })
    })
  }
}
```

Angular uses RxJS under the hood, rather than the standard `fetch()` call. 
With RxJS, once the observable is subscribed to, it cannot be chained to 
anymore. Thus, we wrap it in a new `Observable` instance so that the caller 
can observe the end of the transaction. The inner observable will emit the 
error codes for the outer observable.

We generate the product list component just to check how our service feels 
when integrated (not testing it yet).

```shell
npm run ng generate component product-list
```

We import the product service and make the following changes in the 
`src/app/product-list/product-list.component.ts`:

```typescript
import { Component, OnInit } from '@angular/core'

import { ProductsService } from '../products.service'
import { ActivatedRoute, Router } from '@angular/router'

// ....
export class ProductListComponent implements OnInit {
  productList = this.productsService.productList

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
}
```

When the component initializes, we want to update the product list. For this,
we implement the `ngOnInit()` hook.

```typescript
export class ProductListComponent implements OnInit {
  // ....

  ngOnInit() {
    let params = this.route.snapshot.paramMap
    this.productsService.fetchProducts({ page: params.get('id') })
      .subscribe({
        next: () => {
          this.productList = this.productsService.productList
        },
        err: err => {
          if (err.status === 403) this.router.navigateByUrl('/login')
        },
      })
  }
}
```

# Day 7, Angular

The code we wrote yesterday isn't very good. There are two things that 
bother me. First, the `fetchProducts()` method clearly doesn't fetch 
products, but error codes. Secondly the error handling code is going to end 
up being scattered all over the place if we have to repeat it for each endpoint.
We need to rework the code.

We'll make the `Router` service a dependency of the `ProductService`, and 
move error handling to the service as well.

First, we make the following changes to the service:

```typescript
// ....
import { Router } from '@angular/router'
import { catchError, of, tap, throwError } from 'rxjs'

// ....

function createBlankResponse(): ProductListResponse {
  return {
    data: [],
    page: {
      current: 0,
      total: 0,
    }
  }
}

// ....
export class ProductsService {
  // ....
  
  constructor(
    // ....
    private router: Router,
  ) { }

  private handleUnauthorized() {
    this.router.navigateByUrl('/login')
  }
  
  getProductList({ page = 1 }) {
    return this.httpClient.get<ProductListResponse>('http://127.0.0.1:8000/products/', {
      responseType: 'json',
      params: { page },
    })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 403) this.handleUnauthorized()
          else throwError(() => err)
          return of(createBlankResponse())
        }),
        tap(data => {
          this.productList = data.data
          this.currentPage = data.page.current
          this.totalPages = data.page.total
        }),
      )
  }
}
```

We change the default values of `currentPage` and `totalPages` to 0. The 
zero value will serve as a signal that we have not loaded any data. We 
defined a function called `createBlankResponse()` which returns the reponse 
that represent no data. We use that in case we run into errors.

We rename the `fetchProducts()` method to `getProductList()` as we'll make 
it actually do that.

We import the `Router` service and make it a dependency of this service. It 
doesn't feel entirely clean, but it looks better than what we had 
yesterday. Secondly, we remove the outer `Observable` from the 
`getProductList()` method, and re replace it with a pipe. 

The pipe uses a `catchError()` operator to handle the redirect using the 
private `handleUnauthorized()` method. It returns blank response data on error. 
This eliminates special cases from the next step.

The `tap()` operator is used to set the correct service properties, but will 
otherwise pass the data on to the subscriber if needed.

Overall the code now looks a lot more like it's supposed to. Now we move on 
the `src/app/product-list/product-list.component.ts` module to address the 
other side.

```typescript
import { ActivatedRoute } from '@angular/router'

// ....

export class ProductListComponent implements OnInit {
  // ....
  
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
  ) {}
  
  ngOnInit() {
    let params = this.route.snapshot.queryParams
    this.productsService.getProductList({ page: Number(params['page']) })
      .subscribe(() => {
        this.productList = this.productsService.productList
      })
  }
}
```

We've removed the `Router` from dependencies and also the associated import.
We can also simplify the consumption of the `getProductList()` method. We fix 
the type mismatch from yesterday by coercing the `page` parameter to a 
number and fix its name (it was 'id' before). 

We also switch it to use query parameters instead of path parameters. This is
more idiomatic and semantically more correct. Query parameters select different
views of the same resource, and our resource is a product list, not a specific
page of the product list.

The subscriber now does only one thing, which is update the `productList` 
property of the component.

There's still one little detail, which is the following line from the service:

```typescript
catchError(err => {
  // ....
  else throwError(() => err)
  // ....
})
```

This line will cause the service to throw an error, but that error is not 
handled anywhere (yet). These are errors we don't (yet) know what to do with,
so we are deliberately allowing them to break our code. We don't want to do 
something arbitrary like silence and log. At some point in the future, we'll 
likely have a toast service or something to notify the user of the error, 
but, for now, we'll just let it propagate and throw an exception so we're 
painfully aware of them.

Now we can test whether all of this works. We'll set up routing and then try 
to access the product list page. The routing is defined in the 
`src/app/app-routing.module.ts` module.

```typescript
// ....

import { ProductListComponent } from './product-list/product-list.component'

const routes: Routes = [
  { path: '', component: ProductListComponent },
]

// ....
```

We're also going to modify the application template in 
`src/app/app.component.html` to look like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Product List Manager</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <h1>Product list manager</h1>

    <main>
      <router-outlet></router-outlet>
    </main>
  </body>
</html>
```

We'll stub out the login component so we can test the redirect.

```shell
npm run ng generate component login
```

Then we add this component to the routing table in 
`src/app/app-routing.module.ts`:

```typescript
// ....
import { LoginComponent } from './login/login.component'

const routes: Routes = [
  // ....
  { path: 'login', component: LoginComponent },
]
```

Before we test this, there's one thing we forgot to do, which is to allow 
CORS in the backend. Switching to the backend directory we do:

```shell
venv\Scripts\activate.bat
# on Linux/Mac: source venv/bin/activate
(venv) pip install django-cors-headers
(venv) pip freeze > requirements.txt
```

In the `product_list/settings.py` module, we make the following changes:

```python
INSTALLED_APPS = [
    # ....
    'corsheaders',
    'products.apps.ProductsConfig',
    'administrators.apps.AdministratorsConfig',
]

# ....

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ....
]

# ....

CORS_ORIGIN_ALLOW_ALL = True
```

We bring up the backend:

```shell
(venv) python manage.py runserver
```

and ten the angular dev server

```shell
npm run start
```

When we visit the root page, we are immediately redirected to `/login`. We 
are good to go.
