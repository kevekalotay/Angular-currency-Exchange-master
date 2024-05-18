import { Component } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css'],
  providers: [ ApiDataService ]
})
export class CurrencyComponent {


  exchanges: any[]=null;
  rate: string = "";
  result: number = 0;
    constructor(private apiDataService: ApiDataService) { }

    triggerExchangeRequest(source: string, destination: string, amount: string) {
      this.apiDataService.getCurrencyExchangeRate(source, destination).subscribe(response => {
          this.exchanges = response.json();
          this.rate = this.exchanges["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
          this.result = (parseFloat(amount) * parseFloat(this.rate));
      });

    }

}
