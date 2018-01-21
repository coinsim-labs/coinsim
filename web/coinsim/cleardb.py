
"""
Script to create mock data for API testing purposes.
It will create a user with username 'user' and password 'user',
some currencies, balances and transactions belonging to this user

usage: docker exec -it coinsim_web_1 python mockdata.py
"""

import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "coinsim.settings")
django.setup()

from api.models import *

u, _ = User.objects.get_or_create(username='user')
u.set_password('user')
u.save()

profile = u.profile

Currency.objects.all().delete()
profile.balances.all().delete()
profile.transactions.all().delete()
