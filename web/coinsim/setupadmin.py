
"""
Script to setup admin account for databse debugging purposes.
Admin username: 'admin', password: 'VIlevwgfNzz!GSmBxfZrfGtOvEja1BNt'
After creation, the admin user can be used to login at the admin interface at /admin

usage: docker exec -it coinsim_web_1 python setupadmin.py
"""

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

