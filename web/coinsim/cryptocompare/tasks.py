# Create your tasks here
from celery import task

from ..coinsim.celery import app
import requests

@app.task(name="minutePrice")
def minutePrice():
    print("Running Task!!")
    r = requests.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETC,ETH,BCH,XRP,LTC,QTUM,IOT,XMR,DASH,ZEC,EOS,MONA,NEO,OMG,XLM,BTG,ADA,POWR,WTC&tsyms=USD,BTC,ETC,ETH,BCH,XRP,LTC,QTUM,IOT,XMR,DASH,ZEC,EOS,MONA,NEO,OMG,XLM,BTG,ADA,POWR,WTC')
    return r.json()
