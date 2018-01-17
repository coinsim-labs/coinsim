import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit {

  private tradingModel = {
    sell : [],
    buy : []
  }

  constructor() { }

  ngOnInit() {
  }

  getInputSuffix(string) {
    return string + 'Input';
  }
  getSliderSuffix(string) {
    return string + 'Slider'
  }
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

  createSellObject(target) {
    const listElement = this.getListElement(target);
    listElement.className += ' selected';
    const mockData1 = {
      'NAME' : 'Bitcoin',
      'SHORT': 'BTC',
      'BALANCE' : 0.004
    };
    this.tradingModel.sell.push(mockData1)
  }

  createBuyObject(target) {
    const mockData = {
      'NAME' : 'Etherum',
      'SHORT': 'ETH',
      'BALANCE' : 0.04,
    };
    this.tradingModel.buy.push(mockData);
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
    const input = $('#' + short + this.getInputSuffix(list));
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
    const slider = $('#' + item.SHORT + this.getSliderSuffix(list));
    const sliderElement = slider.data('ionRangeSlider');

    if (item.BALANCE < newValue) {
      event.srcElement.value = item.BALANCE;
      newValue = item.BALANCE;
    }
    
    if (!sliderElement) {
      (slider as any).ionRangeSlider({
        type : 'single',
        step :  0.0001,
        min  :  0,
        from: newValue,
        max  :  item.BALANCE,
        onChange : (data) => {
          this.updateSlider(data.from, item.SHORT, list);
        }
        });
    } else {
      sliderElement.update({
        from: newValue,
      });
    }
  }

  reset() {
    this.tradingModel.sell = [];
    this.tradingModel.buy = [];
  }

}
