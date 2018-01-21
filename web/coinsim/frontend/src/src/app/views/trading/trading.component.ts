import { Component, OnInit } from '@angular/core';
import { CoinsimService } from '../../coinsim.service';
import * as $ from 'jquery'; // SORRY :(

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit {

  private model = {
    trading: {
      buy: [],
      sell: [],
    },
    wallet: {
      currencies: []
    },
    bank: {
      currencies: []
    }
  };

  constructor(private cs: CoinsimService) {
  }


  ngOnInit() {
    this.cs.balances().subscribe((balanceResult) => {
      Object.keys(balanceResult).forEach(function(key) {
        balanceResult[key].selected = false;
        });
      this.model.wallet.currencies = balanceResult;
    });
    this.cs.currencies().subscribe((currenciesResult) => {
      Object.keys(currenciesResult).forEach(function(key) {
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
      if (buyLength > 0 ) {
        if (sellLength <= 1 ) { return true; }
        return false;
      } 
    }

    if (targetModel === 'sell') {
      if (sellLength === 0) { return true; }
      if (sellLength > 0 ) {
        if (buyLength <= 1 ) { return true; }
        return false;
      } 
    }
  }

  /**
   * Called when item from wallet was selected
   * TODO: highlight presssed currency from wallet
   * creates Object in tradingModel
   * @param target domElem that called function
   * @param item  model of that item
   */
  createSellObject(target, item) {
    if (!item.selected) {
      // add item to tradingmodel
      const allowed = this.canAddTradingObject('sell');
      if (!allowed) { return; }
      const listElement = this.getListElement(target);
      const currency = {
        'name': 'PLACEHOLDER',
        'sym': item.currency,
        'balance': item.amount,
        'amount': item.amount
      };
      this.model.trading.sell.push(currency);
      item.selected = true;
    } else {
        // remove item from tradingmodel
        const sym = item.currency;
        let sellModel = this.model.trading.sell;
        sellModel = sellModel.filter((el) => {
            return el.sym !== sym;
          }
        );
        
        this.model.trading.sell = sellModel;
        item.selected = false;
    }
  }

  /**
  * Called when item from bank was selected
   * TODO: highlight presssed currency from wallet
   * creates Object in tradingModel
   * @param target domElem that called function
   * @param item  model of that item
   */
  createBuyObject(target, item) {
    if (!item.selected) {
      // add item to buymodel
      const allowed = this.canAddTradingObject('buy');
      if (!allowed) { return; }

      const currency = {
        'name': item.name,
        'sym': item.sym
      };
      this.model.trading.buy.push(currency);
      item.selected = true;
    } else {
      // remove item from boyModel
      const sym = item.currency;
      let buyModel = this.model.trading.sell;
      buyModel = buyModel.filter((el) => {
          return el.sym !== sym;
        }
      );
      
      this.model.trading.buy = buyModel;
      item.selected = false;
    }
  }

  /**
   * Called when slider changes
   * @param value new valuw
   * @param item currency
   */
  updateSlider(value, item) {
    console.log(item, value)
    item.amount = value;
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
    const slider = $(this.getSliderId(item.sym, list));
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
          this.updateSlider(data.from, item.sym, list);
        }
      });
    } else {
      sliderElement.update({
        from: newValue,
      });
    }
  }

  /**
   * Called when reset button was pressed
   * empties all models
   */
  reset() {
    console.log(this.model);
    // this.model.trading.sell = [];
    // this.model.trading.buy = [];
  }

}