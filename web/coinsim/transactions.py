
"""
Script to create mock data for API testing purposes.
It will create a user with username 'user' and password 'user',
some currencies, balances and transactions belonging to this user

usage: docker exec -it coinsim_web_1 python mockdata.py
"""

import os
import django
from datetime import datetime

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "coinsim.settings")
django.setup()

from api.models import *

u, _ = User.objects.get_or_create(username='user')


profile = u.profile


Transaction(user=profile, source_currency='USD', dest_currency='BCH', amount=100.0, new_balance_source=2200.0, dest_price=1448.610009443, new_balance_dest=0.34615846, timestamp=datetime.strptime('Jan 3 2018  1:33PM', '%b %d %Y %I:%M%p')).save()

