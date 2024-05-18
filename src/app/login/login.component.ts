import { Component, OnInit,  } from '@angular/core';
import { Account } from '../models/account.model';
import { AccountsService } from '../accounts.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { ApiDataService } from '../api-data.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AccountsService, ApiDataService]
})
export class LoginComponent implements OnInit {

  accountId: string;
  accountToDisplay;
  exchanges: any[]=null;
  rate: string = "";
  rate2: string = "";
  result: number = 0;
  result2: number = 0;
  time: string = "";

  constructor(private accountsService: AccountsService, private apiDataService: ApiDataService, private route: ActivatedRoute) { }

  accounts: FirebaseListObservable<any[]>;
  assetsToDisplay: string[];

  ngOnInit() {
     this.accounts = this.accountsService.getAccounts();
     this.route.params.forEach((urlParameters) => {
      this.accountId = urlParameters['id'];
  });
  this.accountsService.getAccountById(this.accountId).subscribe(dataLastEmittedFromObserver => {
    this.accountToDisplay = dataLastEmittedFromObserver;

    })
  }

  triggerBuyRequest(accountToUpdate: string, destination: string, amount: string) {
    this.apiDataService.buyCurrencyExchangeRate(destination).subscribe(response => {
        this.exchanges = response.json();
        this.rate = this.exchanges["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
        this.result = (parseFloat(amount) * parseFloat(this.rate));
        if(this.result.toString() === 'NaN'){
          alert("Transaction error! Please try again. You won't be charged twice.");
        } else {
          this.accountsService.assetsUpdate(accountToUpdate, this.result, destination);
          this.accountsService.balanceUpdate(accountToUpdate, amount);
        }
    });
  }

  triggerBuyCryptoRequest(accountToUpdate: string, symbol: string, amount2: string) {
    this.apiDataService.buyCryptoExchangeRate(symbol).subscribe(response => {
        this.exchanges = response.json();
        this.time = this.exchanges[ "Meta Data"]["7. Last Refreshed"];
        this.rate2 = this.exchanges["Time Series (Digital Currency Intraday)"][this.time]["1b. price (USD)"];
        this.result2 = (parseFloat(amount2) / parseFloat(this.rate2));
        if(this.result2.toString() === 'NaN'){
          alert("Transaction error! Please try again. You won't be charged twice.");
        } else {
          this.accountsService.assetsUpdate(accountToUpdate, this.result2, symbol);
          this.accountsService.balanceUpdate(accountToUpdate, amount2);
        }
    });
  }

  // triggerBalanceUpdate(accountToUpdate: string, amount: number){
  //     this.accountsService.balanceUpdate(accountToUpdate, amount);
  // }

  // triggerAssetUpdate(accountToUpdate, result, destination){
  //     this.accountsService.assetsUpdate(accountToUpdate, result, destination);
  // }
}
