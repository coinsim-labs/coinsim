from django.db import models

class Currency(models.Model):
    name = models.CharField(max_length=64)
    symbol = models.CharField(max_length=64)
    latest_price = models.FloatField(default=0)
    day_high = models.FloatField(default=0)
    day_low = models.FloatField(default=0)
    day_pct = models.FloatField(default=0)
    market_cap = models.PositiveIntegerField(default=0)
    coins = models.PositiveIntegerField(default=0)


class Price(models.Model):
    currency_from = models.ForeignKey(to=Currency, related_name='from')
    currency_to = models.ForeignKey(to=Currency, related_name='to')
    price = models.FloatField(default=0)