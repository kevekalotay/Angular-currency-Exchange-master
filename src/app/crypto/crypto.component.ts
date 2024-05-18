import { Component } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css'],
  providers: [ ApiDataService ]
})
export class CryptoComponent {


  exchanges: any[]=null;
  rate: string = "";
  result: number = 0;
  time: string = "";
  constructor(private apiDataService: ApiDataService) { }

  triggerCryptoRequest(symbol: string, market: string, amount: string) {
    this.apiDataService.getCryptoExchangeRate(symbol, market).subscribe(response => {
      this.exchanges = response.json();

      this.time = this.exchanges[ "Meta Data"]["7. Last Refreshed"];
      if (market==="USD"){
        this.rate = this.exchanges["Time Series (Digital Currency Intraday)"][this.time]["1b. price (USD)"];
      }else{
        this.rate = this.exchanges["Time Series (Digital Currency Intraday)"][this.time]["1a. price (EUR)"];
      }

      console.log(this.rate, market);


    });

  }

}
