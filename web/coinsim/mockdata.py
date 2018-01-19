
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

# Create some Currencies

Currency(sym='USD', name='US Dollar').save()
Currency(sym='BTC', name='Bitcoin').save()
Currency(sym='LTC', name='Litecoin').save()
Currency(sym='ETH', name='Ethereum').save()
Currency(sym='BCH', name='Bitcoincash').save()
Currency(sym='ETC', name='Ethereumclassic').save()
Currency(sym='IOT', name='Iota').save()
Currency(sym='XMR', name='Monero').save()
Currency(sym='QTUM', name='Qtum').save()
Currency(sym='BTG', name='Bitcoingold').save()
Currency(sym='DASH', name='Dash').save()
Currency(sym='XRP', name='Ripple').save()
Currency(sym='EOS', name='Eos').save()
Currency(sym='MEME', name='Memetic').save()
Currency(sym='ZEC', name='Zcash').save()
Currency(sym='XLM', name='Stellarlumens').save()
Currency(sym='NXT', name='Nxt').save()
Currency(sym='STRAT', name='Stratis').save()
Currency(sym='NEO', name='Neo').save()
Currency(sym='MCO', name='Monaco').save()
Currency(sym='XEM', name='Nem').save()
Currency(sym='HSR', name='Hshare').save()
Currency(sym='WAVES', name='Waves').save()
Currency(sym='EMC2', name='Einsteinium').save()
Currency(sym='SAN', name='Santiment').save()
Currency(sym='OMG', name='Omisego').save()
Currency(sym='ADA', name='Cardano').save()
Currency(sym='POWR', name='Powerledger').save()
Currency(sym='BCC', name='Bitconnect').save()
Currency(sym='VTC', name='Vertcoin').save()
Currency(sym='LSK', name='Lisk').save()

# Create some Balances

Balance(user=profile, currency='USD', amount=2300.0).save()
Balance(user=profile, currency='BTC', amount=0.05904303).save()
Balance(user=profile, currency='LTC', amount=2.05742690).save()
Balance(user=profile, currency='ETH', amount=1.28910595).save()
Balance(user=profile, currency='BCH', amount=0.34515846).save()

# Create some Transactions

Transaction(user=profile, source_currency='USD', dest_currency='BTC', amount=1000.0, new_balance_source=4000.0, dest_price=16936.800160832, new_balance_dest=0.05904303).save()
Transaction(user=profile, source_currency='USD', dest_currency='LTC', amount=500.0, new_balance_source=3500.0, dest_price=243.021999955, new_balance_dest=2.05742690).save()
Transaction(user=profile, source_currency='USD', dest_currency='ETH', amount=700.0, new_balance_source=2800.0, dest_price=543.011999906, new_balance_dest=1.28910595).save()
Transaction(user=profile, source_currency='USD', dest_currency='BCH', amount=500.0, new_balance_source=2300.0, dest_price=1448.610009443, new_balance_dest=0.34515846).save()

