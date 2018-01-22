
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


# Test Szenarios:
# 0) Eine einzelne Transaktion an einem Tag
# 1) Beliebige Transaktionen von einer Currency zu einer Currency an einem Tag
# 2) Beliebige Transaktionen von einer Currency zu verschiedenen anderen Currencies an einem Tag
# 3) Beliebige Transaktionen von beliebigen Currencies zu einer Currency an einem Tag
# 4) Beliebige Transaktionen von beliebigen Currencies zu anderen beliebigen Currencies.*

# *) Hin-Rück Transaktionen zu testen:
#   a) Einzelne direkte Hin-Rück Transaktionen (USD->BTC->USD)
#   b) Mehrere direkte Hin-Rück Transaktionen (USD->BTC->USD->BTC->USD)
#   c) Hin-Rück über Dreiecksbeziehung (USD->BTC->ETH->USD)
#   d) Mehrere Hin-Rück über Dreiecksbeziehung (USD->BTC->ETH->USD->ETH->BTC->USD)

# Weiterhin ist für alle Szenarien (außer 0) zu testen:
# i) mehrfach die "gleiche" Transaktion zur selben Zeit
# ii) mehrfach die "gleiche" Transaktion zeitversetzt
# iii) mehrere untereinander verschiedene Transaktion zur selben Zeit (Nicht Szenario 1)
# iv) mehrere untereinander verschiedene Transaktion zeitversetzt (Nicht Szenario 1)

# Create some Transactions
# Start: USD: 10000 Rest: 0

# 03.01.2018
# Test Szenario 2
Transaction(user=profile, source_currency='USD', dest_currency='BTC', amount=1000.0, new_balance_source=9000.0, dest_price=15015.05271124, new_balance_dest=0.0665998327, timestamp=datetime.strptime('Dec 23 2017  1:33PM', '%b %d %Y %I:%M%p')).save() #i
Transaction(user=profile, source_currency='USD', dest_currency='BTC', amount=1000.0, new_balance_source=8000.0, dest_price=15045.55271124, new_balance_dest=0.1330249215, timestamp=datetime.strptime('Dec 23 2017  1:33PM', '%b %d %Y %I:%M%p')).save() #i, iii
Transaction(user=profile, source_currency='USD', dest_currency='ETH', amount=2000.0, new_balance_source=6000.0, dest_price=724.23228238, new_balance_dest=2.76154494713, timestamp=datetime.strptime('Dec 23 2017  1:33PM', '%b %d %Y %I:%M%p')).save() #iii, ii
Transaction(user=profile, source_currency='USD', dest_currency='ETH', amount=1000.0, new_balance_source=5000.0, dest_price=700.23228238, new_balance_dest=4.18964248734, timestamp=datetime.strptime('Dec 23 2017  1:45PM', '%b %d %Y %I:%M%p')).save() #ii, iv
Transaction(user=profile, source_currency='USD', dest_currency='DASH', amount=1000.0, new_balance_source=4000.0, dest_price=1266.53730554, new_balance_dest=0.789554319, timestamp=datetime.strptime('Dec 23 2017  2:50PM', '%b %d %Y %I:%M%p')).save() #iv

# 06.01.2018
# Test Szenario 0
Transaction(user=profile, source_currency='BTC', dest_currency='XRP', amount=0.03, new_balance_source=0.1030249215, dest_price=0.00007108, new_balance_dest=422.059651, timestamp=datetime.strptime('Dec 25 2017  2:33PM', '%b %d %Y %I:%M%p')).save()

# Test Szenario 1
Transaction(user=profile, source_currency='BTC', dest_currency='EOS', amount=0.01, new_balance_source=0.0930249215, dest_price=0.00056341, new_balance_dest=17.7490637, timestamp=datetime.strptime('Dec 28 2017  2:33PM', '%b %d %Y %I:%M%p')).save() #i
Transaction(user=profile, source_currency='BTC', dest_currency='EOS', amount=0.02, new_balance_source=0.0730249215, dest_price=0.00055100, new_balance_dest=54.04670439, timestamp=datetime.strptime('Dec 28 2017  2:33PM', '%b %d %Y %I:%M%p')).save() #i, ii
Transaction(user=profile, source_currency='BTC', dest_currency='EOS', amount=0.005, new_balance_source=0.0680249215, dest_price=0.00058300, new_balance_dest=62.6230337, timestamp=datetime.strptime('Dec 28 2017  3:45PM', '%b %d %Y %I:%M%p')).save() #ii

# Test Szenario 3
Transaction(user=profile, source_currency='DASH', dest_currency='USD', amount=0.1, new_balance_source=0.689554319, dest_price=0.00090190843, new_balance_dest=4110.876, timestamp=datetime.strptime('Jan 3 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #i
Transaction(user=profile, source_currency='DASH', dest_currency='USD', amount=0.05, new_balance_source=0.639554319, dest_price=0.00093944347, new_balance_dest=4164.099, timestamp=datetime.strptime('Jan 3 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #i, iii
Transaction(user=profile, source_currency='XRP', dest_currency='USD', amount=50.0, new_balance_source=372.059651, dest_price=0.35294909830, new_balance_dest=4305.7624, timestamp=datetime.strptime('Jan 3 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #iii, ii
Transaction(user=profile, source_currency='XRP', dest_currency='USD', amount=70.0, new_balance_source=302.059651, dest_price=0.38278977185, new_balance_dest=4488.6304, timestamp=datetime.strptime('Jan 3 2018  1:45PM', '%b %d %Y %I:%M%p')).save() #ii, iv
Transaction(user=profile, source_currency='BTC', dest_currency='USD', amount=0.008, new_balance_source=0.0600249215, dest_price=0.000067579163, new_balance_dest=4607.01, timestamp=datetime.strptime('Jan 3 2018  1:45PM', '%b %d %Y %I:%M%p')).save() #iv

# Test Szenario 4a
Transaction(user=profile, source_currency='EOS', dest_currency='USD', amount=30, new_balance_source=32.6230337, dest_price=0.11111111, new_balance_dest=4877.01, timestamp=datetime.strptime('Jan 5 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #i
Transaction(user=profile, source_currency='USD', dest_currency='EOS', amount=200.0, new_balance_source=4277.01, dest_price=8.95628473, new_balance_dest=66.119065, timestamp=datetime.strptime('Jan 5 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #i, iii
Transaction(user=profile, source_currency='BTC', dest_currency='ETH', amount=0.03, new_balance_source=0.0300249215, dest_price=0.05875353, new_balance_dest=4.70025, timestamp=datetime.strptime('Jan 5 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #iii, ii
Transaction(user=profile, source_currency='ETH', dest_currency='BTC', amount=0.7, new_balance_source=4.00025, dest_price=17.0096, new_balance_dest=0.0711781526, timestamp=datetime.strptime('Jan 5 2018  1:45PM', '%b %d %Y %I:%M%p')).save() #ii, iv
Transaction(user=profile, source_currency='BTC', dest_currency='BCH', amount=0.02, new_balance_source=0.0511781526, dest_price=0.14399066, new_balance_dest=0.13889789, timestamp=datetime.strptime('Jan 5 2018  2:45PM', '%b %d %Y %I:%M%p')).save() #iv

# Test Szenario 4b
Transaction(user=profile, source_currency='BTC', dest_currency='USD', amount=0.0511781526, new_balance_source=0, dest_price=0.0000594399, new_balance_dest=5738.0154257, timestamp=datetime.strptime('Jan 6 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #i
Transaction(user=profile, source_currency='USD', dest_currency='BTC', amount=3000.0, new_balance_source=2738.0154257, dest_price=16800.5148, new_balance_dest=0.178565956, timestamp=datetime.strptime('Jan 6 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #i, iii
Transaction(user=profile, source_currency='BTC', dest_currency='USD', amount=0.07, new_balance_source=0.108565956, dest_price=0.0000574399, new_balance_dest=3956.68, timestamp=datetime.strptime('Jan 6 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #iii, ii
Transaction(user=profile, source_currency='USD', dest_currency='BTC', amount=2000.0, new_balance_source=1956.68, dest_price=16753.123654, new_balance_dest=0.227946678, timestamp=datetime.strptime('Jan 6 2018  1:45PM', '%b %d %Y %I:%M%p')).save() #ii, iv

# Test Szenario 4c_i, 4c_iii
Transaction(user=profile, source_currency='USD', dest_currency='BTC', amount=956.68, new_balance_source=1000.0, dest_price=15210.20329487, new_balance_dest=0.29084393, timestamp=datetime.strptime('Jan 8 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #i
Transaction(user=profile, source_currency='BTC', dest_currency='ETH', amount=0.09, new_balance_source=0.20084393, dest_price=0.07596994, new_balance_dest=5.184929, timestamp=datetime.strptime('Jan 8 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #i, iii
Transaction(user=profile, source_currency='ETH', dest_currency='USD', amount=1.184929, new_balance_source=4.00, dest_price=0.00086541248, new_balance_dest=2369.2072, timestamp=datetime.strptime('Jan 8 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #iii

# Test Szenario 4c_ii, 4c_iv
Transaction(user=profile, source_currency='XRP', dest_currency='BTC', amount=202.059651, new_balance_source=100.0, dest_price=7427.764985515, new_balance_dest=0.2280472208, timestamp=datetime.strptime('Jan 10 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #ii
Transaction(user=profile, source_currency='BTC', dest_currency='DASH', amount=0.078, new_balance_source=0.1500472208, dest_price=0.07425307, new_balance_dest=1.69001593, timestamp=datetime.strptime('Jan 10 2018  1:50PM', '%b %d %Y %I:%M%p')).save() #i, iv
Transaction(user=profile, source_currency='DASH', dest_currency='USD', amount=0.69001593, new_balance_source=1.0, dest_price=0.00093331412, new_balance_dest=3108.5252, timestamp=datetime.strptime('Jan 10 2018  1:50PM', '%b %d %Y %I:%M%p')).save() #i, iv
Transaction(user=profile, source_currency='USD', dest_currency='XRP', amount=1008.5252, new_balance_source=2000.0, dest_price=1.94225293, new_balance_dest=619.25533715, timestamp=datetime.strptime('Jan 10 2018  2:55PM', '%b %d %Y %I:%M%p')).save() #iv

# Test Szenario 4d_i, 4d_iii
Transaction(user=profile, source_currency='USD', dest_currency='BTC', amount=1000.0, new_balance_source=1000.0, dest_price=13451.66964456, new_balance_dest=0.22438743, timestamp=datetime.strptime('Jan 14 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #i
Transaction(user=profile, source_currency='BTC', dest_currency='ETH', amount=0.074, new_balance_source=0.15038743, dest_price=0.09823844, new_balance_dest=4.75326929, timestamp=datetime.strptime('Jan 14 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #i, iii
Transaction(user=profile, source_currency='ETH', dest_currency='USD', amount=0.75326929, new_balance_source=4.0, dest_price=0.0007565343, new_balance_dest=1999.568425, timestamp=datetime.strptime('Jan 14 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #iii
Transaction(user=profile, source_currency='USD', dest_currency='BTC', amount=999.568425, new_balance_source=1000.0, dest_price=13351.445568, new_balance_dest=0.225253362, timestamp=datetime.strptime('Jan 14 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #i
Transaction(user=profile, source_currency='BTC', dest_currency='ETH', amount=0.075253362, new_balance_source=0.15, dest_price=0.09410543, new_balance_dest=4.7996707735, timestamp=datetime.strptime('Jan 14 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #i, iii
Transaction(user=profile, source_currency='ETH', dest_currency='USD', amount=0.7996707735, new_balance_source=4.0, dest_price=0.00076854464, new_balance_dest=2040.50, timestamp=datetime.strptime('Jan 14 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #iii

# Test Szenario 4d_ii, 4c_iv
Transaction(user=profile, source_currency='USD', dest_currency='BTC', amount=2000.0, new_balance_source=40.0, dest_price=11794.29946195, new_balance_dest=0.31957344, timestamp=datetime.strptime('Jan 18 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #i
Transaction(user=profile, source_currency='BTC', dest_currency='ETH', amount=0.11957344, new_balance_source=0.2, dest_price=0.0911052, new_balance_dest=5.3124765, timestamp=datetime.strptime('Jan 18 2018  1:34PM', '%b %d %Y %I:%M%p')).save() #i, iii
Transaction(user=profile, source_currency='ETH', dest_currency='USD', amount=1.3124765, new_balance_source=4.0, dest_price=0.000930620194, new_balance_dest=1450.3245, timestamp=datetime.strptime('Jan 18 2018  1:35PM', '%b %d %Y %I:%M%p')).save() #iii
Transaction(user=profile, source_currency='USD', dest_currency='BTC', amount=450.3245, new_balance_source=1000.0, dest_price=11980.2046195, new_balance_dest=0.237589, timestamp=datetime.strptime('Jan 18 2018  1:36PM', '%b %d %Y %I:%M%p')).save() #i
Transaction(user=profile, source_currency='BTC', dest_currency='ETH', amount=0.037589, new_balance_source=0.2, dest_price=0.0920012, new_balance_dest=4.40857075, timestamp=datetime.strptime('Jan 18 2018  1:37PM', '%b %d %Y %I:%M%p')).save() #i, iii
Transaction(user=profile, source_currency='ETH', dest_currency='USD', amount=0.90857075, new_balance_source=3.5, dest_price=0.0009136602, new_balance_dest=1994.429, timestamp=datetime.strptime('Jan 18 2018  1:38PM', '%b %d %Y %I:%M%p')).save() #iii

# Test Szenario komplex zusammengewürfelt
Transaction(user=profile, source_currency='USD', dest_currency='BTC', amount=994.429, new_balance_source=1000.0, dest_price=11542.22521844, new_balance_dest=0.28615574, timestamp=datetime.strptime('Jan 22 2018  1:33PM', '%b %d %Y %I:%M%p')).save() #i
Transaction(user=profile, source_currency='BTC', dest_currency='ETH', amount=0.08, new_balance_source=0.20615574, dest_price=0.08978586, new_balance_dest=4.391008896, timestamp=datetime.strptime('Jan 22 2018  1:35PM', '%b %d %Y %I:%M%p')).save() #i, iii
Transaction(user=profile, source_currency='BTC', dest_currency='XRP', amount=0.1, new_balance_source=0.10615574, dest_price=0.00011936, new_balance_dest=1457.0569457, timestamp=datetime.strptime('Jan 22 2018  1:35PM', '%b %d %Y %I:%M%p')).save() #iii
Transaction(user=profile, source_currency='XRP', dest_currency='ETH', amount=957.0569457, new_balance_source=500.0, dest_price=764.596140, new_balance_dest=5.64272453, timestamp=datetime.strptime('Jan 22 2018  1:36PM', '%b %d %Y %I:%M%p')).save() #i
Transaction(user=profile, source_currency='ETH', dest_currency='DASH', amount=0.64272453, new_balance_source=5.0, dest_price=0.77266372, new_balance_dest=1.83182957, timestamp=datetime.strptime('Jan 22 2018  1:37PM', '%b %d %Y %I:%M%p')).save() #i, iii
Transaction(user=profile, source_currency='ETH', dest_currency='USD', amount=1.0, new_balance_source=4.0, dest_price=0.0009493739285, new_balance_dest=2053.3257444, timestamp=datetime.strptime('Jan 22 2018  1:37PM', '%b %d %Y %I:%M%p')).save() #iii
Transaction(user=profile, source_currency='USD', dest_currency='DASH', amount=1000.0, new_balance_source=1053.3257444, dest_price=813.90127899, new_balance_dest=3.0604798, timestamp=datetime.strptime('Jan 22 2018  3:38PM', '%b %d %Y %I:%M%p')).save() #iii

# Create some Balances

Balance(user=profile, currency='USD', amount=1053.3257444).save()
Balance(user=profile, currency='BTC', amount=0.10615574).save()
Balance(user=profile, currency='ETH', amount=4.0).save()
Balance(user=profile, currency='XRP', amount=500).save()
Balance(user=profile, currency='EOS', amount=66.119065).save()
Balance(user=profile, currency='DASH', amount=3.0604798).save()
Balance(user=profile, currency='BCH', amount=0.13889789).save()

# Transaction(user=profile, source_currency='USD', dest_currency='BTC', amount=1000.0, new_balance_source=4000.0, dest_price=16936.800160832, new_balance_dest=0.05904303).save()
# Transaction(user=profile, source_currency='USD', dest_currency='LTC', amount=500.0, new_balance_source=3500.0, dest_price=243.021999955, new_balance_dest=2.05742690).save()
# Transaction(user=profile, source_currency='USD', dest_currency='ETH', amount=700.0, new_balance_source=2800.0, dest_price=543.011999906, new_balance_dest=1.28910595).save()
# Transaction(user=profile, source_currency='USD', dest_currency='BCH', amount=500.0, new_balance_source=2300.0, dest_price=1448.610009443, new_balance_dest=0.34515846).save()

