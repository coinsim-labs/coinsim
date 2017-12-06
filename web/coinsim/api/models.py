from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

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
    from_currency = models.CharField(max_length=32, null=False)
    to_currency = models.CharField(max_length=32, null=False)
    amount = models.FloatField(null=False)
    new_balance_from = models.FloatField(null=False)
    new_balance_to = models.FloatField(null=False)

    def __str__(self):
        return "{user}: {amount} {fr} -> {to}".format(
            user = str(self.user),
            amount = self.amount,
            fr=self.from_currency,
            to=self.to_currency)


class Balance(models.Model):
    user = models.ForeignKey(to=Profile, related_name='balances')
    currency = models.CharField(max_length=32)
    amount = models.FloatField()

    def __str__(self):
        return "{user}: {amount} {curr}".format(
            user = str(self.user),
            amount = self.amount,
            curr=self.currency)