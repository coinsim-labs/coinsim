# Create your tasks here
from __future__ import absolute_import, unicode_literals
from celery import task
import requests

@task
def minutePrice():
    r = requests.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETC,ETH,BCH,XRP,LTC,QTUM,IOT,XMR,DASH,ZEC,EOS,MONA,NEO,OMG,XLM,BTG,ADA,POWR,WTC&tsyms=USD,BTC,ETC,ETH,BCH,XRP,LTC,QTUM,IOT,XMR,DASH,ZEC,EOS,MONA,NEO,OMG,XLM,BTG,ADA,POWR,WTC')
    return r.json()
