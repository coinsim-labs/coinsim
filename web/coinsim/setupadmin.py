import os
import django



os.environ.setdefault("DJANGO_SETTINGS_MODULE", "coinsim.settings")
django.setup()

from django.contrib.auth.models import User

u = User(username='admin')
u.set_password('VIlevwgfNzz!GSmBxfZrfGtOvEja1BNt')
u.is_superuser = True
u.is_staff = True
u.save()
