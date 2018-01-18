from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class Transaction(models.Model):
    user = models.ForeignKey(to=Profile, related_name='transactions')
    source_currency = models.CharField(max_length=32, null=False)
    dest_currency = models.CharField(max_length=32, null=False)
    amount = models.FloatField(null=False)
    dest_price = models.FloatField(null=False)
    new_balance_source = models.FloatField(null=True)
    new_balance_dest = models.FloatField(null=True)
    # timestamp = models.DateTimeField(auto_now_add=True)
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "{user}: {amount} {fr} -> {to}".format(
            user = str(self.user),
            amount = self.amount,
            fr=self.source_currency,
            to=self.dest_currency)


class Balance(models.Model):
    user = models.ForeignKey(to=Profile, related_name='balances')
    currency = models.CharField(max_length=32)
    amount = models.FloatField()

    def __str__(self):
        return "{user} : {amount} {curr}".format(
            user = str(self.user),
            amount = self.amount,
            curr=self.currency)

class Currency(models.Model):
    name = models.CharField(max_length=64)
    sym = models.CharField(max_length=32, unique=True)
    color = models.CharField(max_length=32, default='#C6EB6A')

    def __str__(self):
        return "{name} ({sym})".format(
            name = self.name,
            sym = self.sym)