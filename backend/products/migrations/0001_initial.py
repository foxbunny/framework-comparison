# Generated by Django 4.1.7 on 2023-03-23 08:18

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('sku', models.CharField(max_length=12, primary_key=True, serialize=False)),
                ('name', models.TextField()),
                ('description', models.TextField(blank=True, null=True)),
                ('unit', models.CharField(choices=[('l', 'liter'), ('kg', 'kg'), ('pc', 'piece'), ('pair', 'pair')], max_length=4)),
                ('stock', models.PositiveIntegerField(default=0)),
                ('price', models.PositiveIntegerField(default=0)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]