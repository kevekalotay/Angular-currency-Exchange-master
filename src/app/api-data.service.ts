import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { apikey } from './api-keys';

@Injectable()
export class ApiDataService {

  constructor(private http: Http) { }
  getCurrencyExchangeRate(source: string, destination: string) {
    return this.http.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${source}&to_currency=${destination}&apikey=${apikey}`)
  }

  getCryptoExchangeRate(symbol: string, market: string) {
    return this.http.get(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=${symbol}&market=${market}&apikey=${apikey}`)
  }

  buyCurrencyExchangeRate(destination: string) {
    return this.http.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=${destination}&apikey=${apikey}`)
  }

  buyCryptoExchangeRate(symbol: string) {
    return this.http.get(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=${symbol}&market=USD&apikey=${apikey}`)
  }

}
