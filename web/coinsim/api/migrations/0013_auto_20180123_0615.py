# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2018-01-23 06:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_auto_20180118_2143'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='dest_price',
            field=models.FloatField(null=True),
        ),
    ]