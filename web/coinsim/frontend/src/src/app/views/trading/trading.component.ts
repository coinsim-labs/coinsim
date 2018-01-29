import { Component, OnInit } from '@angular/core';
import { CoinsimService } from '../../coinsim.service';
import { CryptoCompareService } from '../../cryptocompare.service';
import { DecimalPipe } from '@angular/common';
import {Observable} from 'rxjs/Observable';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit {

  selectedSellItem: any;

  private model = {
    trading: {
      buy: [],
      sell: [],
    },
    exchange: {

    },
    wallet: {
      currencies: []
    },
    bank: {
      currencies: []
    }
  };

  prices: any;
  public progressModal;
  modalTitle;
  modalText;
  transactionState;

  constructor(private cs: CoinsimService, private ccs: CryptoCompareService) {
    this.transactionState = 0;
  }


  ngOnInit() {
    this.cs.refresh();


    Observable.forkJoin(
      this.cs.balances(),
      this.cs.currencies()
    )
    .subscribe(resp => {
      console.log('resp')
      let balanceResult = resp[0];
      let currenciesResult = resp[1];

      // Load balances into model
      Object.keys(balanceResult).forEach(function (key) {
        balanceResult[key].selected = false;
      });
      this.model.wallet.currencies = balanceResult;
      this.clickSellObject(null, this.model.wallet.currencies[0]);

      // Load currencies into model
      Object.keys(currenciesResult).forEach(function (key) {
        currenciesResult[key].selected = false;
      });
      this.model.bank.currencies = currenciesResult;

      // Get price data from cryptocompare
      let fsyms = currenciesResult.map( b => b.sym).join(',')
      let tosyms = balanceResult.map( b => b.currency).join(',')

      this.ccs.multiCryptoPrice(fsyms, tosyms, null, null,null,null,false).subscribe( prices => {
        this.prices = prices;
      })


    })


    this.cs.balances().subscribe((balanceResult) => {
      Object.keys(balanceResult).forEach(function (key) {
        balanceResult[key].selected = false;
      });
      this.model.wallet.currencies = balanceResult;

      this.clickSellObject(null, this.model.wallet.currencies[0]);
    });
    this.cs.currencies().subscribe((currenciesResult) => {
      Object.keys(currenciesResult).forEach(function (key) {
        currenciesResult[key].selected = false;
      });
      this.model.bank.currencies = currenciesResult;
    })
  }

  getInputId(sym, string) {
    return '#' + sym + string + 'Input';
  }

  getSliderId(sym, string) {
    return '#' + sym + string + 'Slider'
  }


  /**
   * Helper for getting Listelement that was clicked
   * (depending on where user clicks, a domElem inside of the listelement can call the event)
   * @param domElem Element that called the function "createBuyObject" or "createSellObject"
   */
  getListElement(domElem) {
    while (domElem.tagName !== 'LI') {
      domElem = domElem.parentElement;
      if (domElem == null) {
        console.warn('Failed finding Listelement')
        return;
      }
    }
    return domElem;
  }

  /**
   * checks that there is always a 1:n or n:1 relationship between
   * model.trading.buy and model.trading.sell
   * returns boolean
   * @param targetModel 'buy' or 'sell'
   */
  canAddTradingObject(targetModel) {
    const sellLength = this.model.trading.sell.length;
    const buyLength = this.model.trading.buy.length;

    if (targetModel === 'buy') {
      if (buyLength === 0) { return true; }
      if (buyLength > 0) {
        if (sellLength <= 1) { return true; }
        return false;
      }
    }

    if (targetModel === 'sell') {
      if (sellLength === 0) { return true; }
      if (sellLength > 0) {
        if (buyLength <= 1) { return true; }
        return false;
      }
    }
  }

  /**
   * Called when item from wallet was selected
   * creates Object in tradingModel
   * @param target domElem that called function
   * @param item  model of that item
   */
  clickSellObject(target, item) {

    if (item != this.selectedSellItem) {
      if (!this.selectedSellItem) {
        this.selectedSellItem = item
      }
      const sym = this.selectedSellItem.currency;
      let sellModel = this.model.trading.sell;
      sellModel = sellModel.filter((el) => {
        return el.sym !== sym;
      }
      );

      this.selectedSellItem = item;
      const currency = {
        'name': 'PLACEHOLDER',
        'sym': item.currency,
        'balance': item.amount,
        'amount': item.amount
      };

      sellModel.push(currency);

      this.model.trading.sell = sellModel;


    }

  }

  /**
  * Called when item from bank was selected
   * creates Object in tradingModel
   * @param target domElem that called function
   * @param item  model of that item
   */
  clickBuyObject(target, item) {
    if (!item.selected) {
      // add item to buymodel
      if (this.selectedSellItem.currency == item.sym) return;

      const length = this.model.trading.buy.length + 1;
      this.model.trading.buy.forEach(element => {
        element.percent = 100 / length;
      });

      const currency = {
        'sym': item.sym,
        'amount': item.amount,
        'percent': 100 / length
      };
      this.model.trading.buy.push(currency);

    } else {
      // remove item from buymModel
      const sym = item.sym;
      let buyModel = this.model.trading.buy;
      buyModel = buyModel.filter((el) => {
        return el.sym !== sym;
      }
      );

      const length = this.model.trading.buy.length - 1;
      this.model.trading.buy.forEach(element => {
        element.percent = 100 / length;
      });

      this.model.trading.buy = buyModel;
    }
    item.selected = !item.selected;
  }

  formatAmount(value, d) {
    return value.toFixed(d)
  }

  updateWalletItemValue(value, item) {
    item.amount = value
  }

  updateBuyItemValue(value, item) {
    item.percent = value
  }


  /**
   * Called when slider from SellItem changes
   * @param value new value
   * @param item currency
   */
  updateSlider(value, item) {
    item.amount = value;
  }

  sliderMoveStart: number;

  sliderInput(value, item) {
    //if (this.model.trading.buy.length == 1)
    if (!this.sliderMoveStart) {
      this.sliderMoveStart = item.percent;
      console.log('start', this.sliderMoveStart)
    }
  }


  /**
   * Called when slider from BuyItem changing
   * calculate new percentamount for each
   * @param value new Percent as int (90% = 90)
   * @param item item in model
   */
  onPercentChanges(value, item) {
    console.log('------------- changed')
    //console.log(item, value)
    if (!isNaN(value) && (this.sliderMoveStart != null)) {
      const items = this.model.trading.buy;
      let numberOfItems = items.length - 1;
      let delta = value - this.sliderMoveStart;
      this.sliderMoveStart = null;

      console.log('numerofitems', numberOfItems)
      console.log('delta', delta)

      let others = 100 - value
      let count, count_next = numberOfItems;

      while (delta > 0.0001 || delta < -0.001) {

        count = count_next;
        count_next = numberOfItems;
        if (!count) break;
        let part = delta / count;

        for (var i=0; i<items.length; i++) {
          let el = items[i]
          if (el.sym == item.sym) continue
          if (delta > 0 && el.percent == 0) {
            count_next--;
            continue
          }
          if (delta < 0 && el.percent == 100) continue
          let change = Math.min(part, el.percent)
          delta -= change
          el.percent = el.percent-change;
          if (delta == 0) break;
          if (el.percent == 0) count_next--;
        }
      }

      console.log('TOTAL before', this.model.trading.buy.reduce((acc, i) => acc + i.percent, 0))
      let total =  this.model.trading.buy.reduce((acc, i) => acc + i.percent, 0)

      let diff = 100 - total;

      console.log('diff', diff)
      let last = this.model.trading.buy[numberOfItems]
      if (diff < 0 && last.percent >= -diff) last.percent -= diff
      if (diff > 0 && last.percent <= 100-diff) last.percent += diff

      console.log('TOTAL', this.model.trading.buy.reduce((acc, i) => acc + i.percent, 0))

    }

    return false;
  }

  /**
   * Called when inputfield is changed
   * Changes Slidervalue
   *
   * @param event Clickevent
   * @param item the Currencyitem which the slider belongs to
   * @param list in which list the clickevent happend
   */
  onInputChange(event, item, list) {
    let newValue = event.srcElement.value;
    const slider = null;
    const sliderElement = slider.data('ionRangeSlider');

    // check for invalid input
    if (item.balance < newValue) {
      event.srcElement.value = item.balance;
      newValue = item.balance;
    }
    if (newValue < 0) {
      event.srcElement.value = 0;
      newValue = 0;
    }

    if (!sliderElement) {
      // Initialize Rangeslider
      (slider as any).ionRangeSlider({
        type: 'single',
        step: 0.0001,
        min: 0,
        from: newValue,
        max: item.balance,
        onChange: (data) => {
          this.updateSlider(data.from, item.sym);
        }
      });
    } else {
      sliderElement.update({
        from: newValue,
      });
    }
  }

  /**
   * Called after exchange model sucessfully updated
   * calculates new amounts for the currencies user
   * wants to buy
   */
  updateBuyAmount() {

  }

  /**
   * sets new exchangemodel
   * and calls updatefunction for Buy Objects
   * @param Success Horray
   */
  onExchangeModelSuccess(Success: Object) {
    if (Success.hasOwnProperty('RAW')) {
      const raw = Success['RAW'];
      this.model.exchange = raw;
      this.updateBuyAmount();
    }
  }

  /**
   * gets current exchangerates for
   * currency in the tradingmodel
   */
  updateExchangeModel() {
    let sellSymbols = '';
    let buySymbols = '';
    this.model.trading.sell.forEach((item) => {
      sellSymbols += item.sym + ',';
    });
    this.model.trading.buy.forEach((item) => {
      buySymbols += item.sym + ',';
    })

    this.ccs.multiCryptoPrice(
      sellSymbols, buySymbols,
      null, 'coinsim', null, null, true)
      .map(result => result)
      .subscribe(
      (Success) => { this.onExchangeModelSuccess(Success) },
      (Error) => { console.log(Error); alert('Failed to get ExchangeRates') }
      );
  }

  /**
   * Called when reset button was pressed
   * empties all models
   */
  reset() {
      this.model.trading.buy = []
      this.model.trading.sell = []
      this.model.bank.currencies.forEach(c => {
        c.selected = false;
      })
      this.cs.balances().subscribe(balanceResult => {
        // Load balances into model
          Object.keys(balanceResult).forEach(function (key) {
            balanceResult[key].selected = false;
          });
          this.model.wallet.currencies = balanceResult;

          this.clickSellObject(null, this.model.wallet.currencies[0]);

      })
  }

  finishTransaction(modal) {
    modal.hide()
    this.transactionState = 0;
  }


  processTransaction() {
    this.transactionState = 1;
    let calls = this.model.trading.buy.map(item => {
        let source = this.model.trading.sell[0].sym
        let dest = item.sym
        let amount = this.model.trading.sell[0].amount * (item.percent/100)
        console.log('source',source)
        console.log('dest',dest)
        console.log('amount',amount)
        return this.cs.instant_order(source, dest, amount)
    })

    Observable.forkJoin(calls)
    .subscribe(resp => {
      console.log(resp)
      this.transactionState = 2
      this.reset();
    });

  }



}
