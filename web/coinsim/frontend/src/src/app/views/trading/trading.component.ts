import { Component, OnInit } from '@angular/core';
import { CoinsimService } from '../../coinsim.service';
import * as $ from 'jquery'; // SORRY :(

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit {

  private tradingModel = {
    sell: [],
    buy: []
  }
  private walletModel = {
    currencies: []
  };
  private bankModel = {
    currencies: []
  };

  constructor(private cs: CoinsimService) {
  }


  ngOnInit() {
    this.cs.balances().subscribe((balanceResult) => {
      this.walletModel.currencies = balanceResult;
    });
    this.cs.currencies().subscribe((currenciesResult) => {
      this.bankModel.currencies = currenciesResult;
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
   * Called when item from wallet was selected
   * TODO: highlight presssed currency from wallet
   * creates Object in tradingModel
   * @param target domElem that called function
   * @param item  model of that item
   */
  createSellObject(target, item) {
    const listElement = this.getListElement(target);
    listElement.className += ' selected';

    const currency = {
      'name': 'PLACEHOLDER',
      'sym': item.currency,
      'balance': item.amount,
      'amount': item.amount
    };

    this.tradingModel.sell.push(currency)
  }

  /**
  * Called when item from bank was selected
   * TODO: highlight presssed currency from wallet
   * creates Object in tradingModel
   * @param target domElem that called function
   * @param item  model of that item
   */
  createBuyObject(target, item) {
    const currency = {
      'name': item.name,
      'sym': item.sym
    };
    this.tradingModel.buy.push(currency);
  }

  /**
   * Called when slider is changed
   * updates input
   * 
   * @param event Sliderevent
   * @param short Currency Short to identify input
   * @param list in which list the clickevent happend
   */
  updateSlider(from, short, list) {
    const input = $(this.getInputId(short, list));
    input.val(from);
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
    this.tradingModel.sell = [];
    this.tradingModel.buy = [];
  }

}
