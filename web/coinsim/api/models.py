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

@receiver(post_save, sender=Profile)
def create_start_balance(sender, instance, created, **kwargs):
    if created:
        Balance(user=instance, currency='USD', amount=5000).save()

class Transaction(models.Model):
    user = models.ForeignKey(to=Profile, related_name='transactions')
    source_currency = models.CharField(max_length=32, null=False)
    dest_currency = models.CharField(max_length=32, null=False)
    amount = models.FloatField(null=False)
    dest_price = models.FloatField(null=True)
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


class Ranking(models.Model):
    user = models.ForeignKey(to=Profile, related_name='rank')
    pos = models.SmallIntegerField()
    # roi = models.FloatField(default=0)
    # totalBTC = models.FloatField(default=0)
    totalUSD = models.FloatField(default=0)

    class Meta:
        ordering = ['pos']

    def __str__(self):
        return "{user} : #{pos} totalUSD:{totalUSD}".format(
            user=str(self.user),
            pos=self.pos,
            #roi=self.roi,
            # totalBTC=self.totalBTC,
            totalUSD=self.totalUSD)


class Balance(models.Model):
    user = models.ForeignKey(to=Profile, related_name='balances')
    currency = models.CharField(max_length=32)
    amount = models.FloatField(default=0)
    created = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['created']

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


class CryptoDescription(models.Model):
    currency = models.CharField(max_length=32, null=False)
    text = models.TextField(null=False)
    lang = models.CharField(max_length=32, default='en_US')

    def __str__(self):
        return "{currency}: {text}".format(
            currency = self.currency,
            text = self.text)