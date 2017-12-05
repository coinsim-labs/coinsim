import shlex
import subprocess

from django.core.management.base import BaseCommand
from django.utils import autoreload


def restart_celery():
    cmd = "pkill -9 -f 'celery worker'"
    subprocess.call(shlex.split(cmd))
    cmd = 'celery worker -l info -A coinsim'
    subprocess.call(shlex.split(cmd))


class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Starting celery worker with autoreload...')
        autoreload.main(restart_celery)
